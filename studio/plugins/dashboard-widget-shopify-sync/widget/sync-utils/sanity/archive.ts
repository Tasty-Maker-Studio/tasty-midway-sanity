import { SanityClient } from '@sanity/client';
import {
  SanityShopifyTabDocument,
} from '../../types';
import {
  isSanityTabProduct,
  isSanityTabCollection,
} from '../typeGuards';

const getRelationshipsToRemove = (
  sourceDoc: SanityShopifyTabDocument,
  relatedDoc: SanityShopifyTabDocument,
) => {
  if (isSanityTabProduct(relatedDoc)) {
    console.log('archive.ts/isSanityTabProduct relatedDoc = ', relatedDoc)
    const related = relatedDoc.content.main?.collections.find(
      (reference) => reference._ref === sourceDoc._id,
    );
    if (!related) {
      return;
    }
    const relationshipsToRemove = [`collections[_key=="${related._key}"]`];
    return relationshipsToRemove;
  } else if (isSanityTabCollection(relatedDoc)) {
    console.log('archive.ts/isSanityTabCollection relatedDoc = ', relatedDoc)
    const related = relatedDoc.content.main?.products.find(
      (reference) => reference._ref === sourceDoc._id,
    );
    if (!related) return;
    const relationshipsToRemove = [`products[_key=="${related._key}"]`];
    return relationshipsToRemove;
  }
  throw new Error('Could not get relationships for this document');
};

export const createArchiveSanityDocument = (client: SanityClient) => async (
  doc: SanityShopifyTabDocument,
): Promise<SanityShopifyTabDocument> => {
  const relationshipsKey =
    doc.content.shopify.__typename === 'Collection' ? 'products' : 'collections';

  const removeRelationships = async (relatedDoc: SanityShopifyTabDocument) => {
    const relationshipsToRemove = getRelationshipsToRemove(doc, relatedDoc);
    if (!relationshipsToRemove) return;
    await client
      .patch(relatedDoc._id)
      .unset(relationshipsToRemove)
      .commit();
  };

  const relationships = isSanityTabProduct(doc)
    ? doc.content.main?.collections
    : isSanityTabCollection(doc)
    ? doc.content.main?.products
    : undefined;

  if (relationships) {
    // @ts-ignore
    await Promise.all(relationships.map((r) => removeRelationships(r)));
  }
  try {
    await client.delete(doc._id);
  } catch (err) {
    await client
      .patch(doc._id)
      .set({ archived: true, shopifyId: null, [relationshipsKey]: [] })
      .commit();
  }
  return doc;
};
