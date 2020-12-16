import { SanityClient } from '@sanity/client';
import {
  Collection,
  Product,
  SyncOperation,
  SanityShopifyTabDocument,
  SanityShopifyTabDocumentPartial,
  SanityShopifyTabCollectionDocumentPartial,
  SanityShopifyTabProductDocumentPartial,
  SanityShopifyProductOptionValue,
} from '../../types';
import deepMerge from 'ts-deepmerge';
import { omit } from 'lodash';
import { definitely } from '../utils';
import { prepareDocument, sleep, isMatch, uniqueObjects } from './utils';
import { SanityCache } from './sanityUtils';
import { isSanityTabProduct, isSanityTabCollection } from '../typeGuards';

const mergeExistingFields = (
  docInfo: SanityShopifyTabDocumentPartial,
  existingDoc: SanityShopifyTabDocumentPartial,
): SanityShopifyTabDocumentPartial => {
  if (isSanityTabCollection(docInfo) && isSanityTabCollection(existingDoc)) {
    const merged = deepMerge(existingDoc, docInfo);

    const sourceData = {
      ...docInfo.content.main.sourceData,
      products: {
        ...docInfo.content.main.sourceData.products,
        edges: uniqueObjects(definitely(docInfo.content.main.sourceData.products.edges)),
      },
    };
    merged.content.main.sourceData = sourceData;
    merged.content.shopify = sourceData;
    const doc: SanityShopifyTabCollectionDocumentPartial = {
      ...merged,
    };
    return doc;
  }
  if (isSanityTabProduct(docInfo) && isSanityTabProduct(existingDoc)) {
    const merged = deepMerge(existingDoc, docInfo);
    const variants = docInfo.content.main.variants || [];
    const options = docInfo.content.main.options || [];
    const sourceData = {
      ...docInfo.content.main.sourceData,
      collections: {
        ...docInfo.content.main.sourceData.collections,
        edges: uniqueObjects(
          definitely(docInfo.content.main.sourceData.collections.edges),
        ),
      },
      images: {
        ...docInfo.content.main.sourceData.images,
        edges: uniqueObjects(definitely(docInfo.content.main.sourceData.images.edges)),
      },
    };
    merged.content.shopify = sourceData;
    merged.content.main.sourceData = sourceData;
    merged.content.main.shopifyId = existingDoc.shopifyId;
    merged.content.main.handle = existingDoc.content.main.handle;
    merged.content.main.description = existingDoc.content.main.description;
    merged.content.main.descriptionHtml =existingDoc.content.main.descriptionHtml;
    merged.content.main.tags = existingDoc.content.main.tags;
    merged.content.main.productType = existingDoc.content.main.productType;
    merged.content.main.options = options.map((updatedOption) => {
      const existingOption = existingDoc.content.main.options
        ? existingDoc.content.main.options.find(
            (o) => o._key === updatedOption._key,
          )
        : undefined;

      const existingOptionValues = existingOption ? existingOption.values : [];
      const updatedOptionValues = updatedOption ? updatedOption.values : [];

      const values = [...existingOptionValues, ...updatedOptionValues].reduce<
        SanityShopifyProductOptionValue[]
      >((acc, value) => {
        const existsIndex = acc.findIndex((v) => v._key === value._key);

        if (existsIndex > -1) {
          const mergedValue = {
            ...acc[existsIndex],
            ...value,
          };
          return [
            ...acc.slice(0, existsIndex),
            mergedValue,
            ...acc.slice(existsIndex + 1),
          ];
        } else {
          return [...acc, value];
        }
      }, []);

      return {
        ...existingOption,
        ...updatedOption,
        values,
      };
    });

    merged.content.main.variants = variants.map((variant) => {
      const existingVariant = existingDoc.content.main.variants
        ? existingDoc.content.main.variants.find(
            (v) => v.shopifyVariantID === variant.shopifyVariantID,
          ) || {}
        : {};

      return {
        ...existingVariant,
        ...variant,
      };
    });

    const doc: SanityShopifyTabProductDocumentPartial = {
      ...merged,
    };
    return doc;
  }
  throw new Error(
    `The document with the shopifyId "${existingDoc.shopifyId}" could not be merged. Be sure that the document includes a _type property`,
  );
};

export const createSyncSanityDocument = (
  client: SanityClient,
  cache: SanityCache,
) => async (item: Product | Collection): Promise<SyncOperation> => {
  const getSanityDocByShopifyId = async (
    shopifyId: string,
  ): Promise<SanityShopifyTabDocument | void> => {
    const cached = cache.getByShopifyId(shopifyId);
    if (cached) return cached;

    const doc = await client.fetch<SanityShopifyTabDocument>(
      `
      *[shopifyId == $shopifyId]{
        products[]->,
        collections[]->,
        "collectionKeys": collections[]{
          ...
        },
        "productKeys": products[]{
          ...
        },
        ...
      }[0]`,
      {
        shopifyId,
      },
    );
    if (doc) cache.set(doc);
    return doc;
  };

  const syncItem = async (
    item: Product | Collection,
  ): Promise<SyncOperation> => {
    const docInfo = prepareDocument(item);
    const existingDoc = await getSanityDocByShopifyId(item.id);

    /* If the document exists and is up to date, skip */
    if (
      existingDoc &&
      isMatch(docInfo, existingDoc, {
        keys: [
          '_type',
          'shopifyId',
          'content.main.title',
          'content.main.handle',
          'content.main.minVariantPrice',
          'content.main.maxVariantPrice',
          'content.main.sourceData',
          'content.shopify',
          'content.main.options',
          'content.main.variants',
          'content.main.tags',
          'content.main.productType',
        ],
      })
    ) {
      return {
        type: 'skip' as 'skip',
        sanityDocument: existingDoc,
        shopifySource: item,
      };
    }

    /* Rate limit */
    await sleep(201);

    /* Create a new document if none exists */
    if (!existingDoc) {
      const newDoc = await client.create<SanityShopifyTabDocumentPartial>(
        docInfo,
      );
      const refetchedDoc = await getSanityDocByShopifyId(newDoc.shopifyId);
      if (!refetchedDoc) {
        throw new Error(
          `Could not fetch updated document with shopifyId ${newDoc.shopifyId}`,
        );
      }

      cache.set(refetchedDoc);
      return {
        type: 'create' as 'create',
        // @ts-ignore
        sanityDocument: newDoc,
        shopifySource: item,
      };
    }

    /* Otherwise, update the existing doc */

    const patchData = omit(mergeExistingFields(docInfo, existingDoc), [
      'products',
      'collections',
      'productKeys',
      'collectionKeys',
    ]);

    const updatedDoc = await client
      .patch(existingDoc._id)
      .set(patchData)
      .commit();

    const refetchedDoc = await getSanityDocByShopifyId(updatedDoc.shopifyId);
    if (!refetchedDoc) {
      throw new Error(
        `Could not fetch updated document with shopifyId ${updatedDoc.shopifyId}`,
      );
    }

    cache.set(refetchedDoc);

    return {
      type: 'update' as 'update',
      sanityDocument: refetchedDoc,
      shopifySource: item,
    };
  };

  return syncItem(item);
};
