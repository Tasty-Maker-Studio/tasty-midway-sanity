import { APIGatewayEvent } from 'aws-lambda';
import sanityClient from '@sanity/client';
import { statusReturn } from './requestConfig';
import * as crypto from 'crypto';
import { stringHtmlToBlocks } from './helper/sanityBlockCreate';

import fetch from 'node-fetch';
require('dotenv').config();

const {
  SANITY_API_TOKEN,
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  SHOPIFY_SECRET,
} = process.env;

const client = sanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_API_TOKEN,
  useCdn: false,
});

const updateEverything = async (data: {
  images: any[];
  body_html: string;
  image: null;
  id: number;
  title: string;
  variants: any[];
  handle: string;
}) => {
  const product = {
    _type: 'product',
    _id: data.id.toString(),
  };

  /*
  /    Because of the nested structure of the products (with tabs)
  /    we need select the fields we want to update specifically in Shopify
  /    Syncs to prevent erasing other modular/custom data
  */
  // console.log('[    Set up content Main data = ', data);

  const productObject = {
    'content.shopify.productId': data.id,
    'content.shopify.title': data.title,
    'content.shopify.description': stringHtmlToBlocks(data.body_html),
    'content.shopify.productImages': data.images,
    'content.shopify.defaultPrice': data.variants[0].price,
    'content.shopify.defaultVariant.title': data.variants[0].title,
    'content.shopify.defaultVariant.price': data.variants[0].price,
    'content.shopify.defaultVariant.sku': data.variants[0].sku,
    'content.shopify.defaultVariant.variantId': data.variants[0].id,
    'content.shopify.defaultVariant.taxable': data.variants[0].taxable,
    'content.shopify.defaultVariant.inventoryQuantity':
      data.variants[0].inventory_quantity,
    'content.shopify.defaultVariant.inventoryPolicy':
      data.variants[0].inventory_policy,
    'content.shopify.defaultVariant.barcode': data.variants[0].barcode,
    'content.main.title': data.title,
    'content.main.slug.current': data.handle,
    'content.main.description': stringHtmlToBlocks(data.body_html),
    'content.main.productImages': data.images,
  };

  try {
    let tx = client.transaction();

    //
    // === Patch Product ===
    //

    tx = tx.createIfNotExists(product);
    tx = tx.patch(data.id.toString(), (patch) => patch.set(productObject));
    console.log(`Successfully updated/patched Product ${data.id} in Sanity`);

    //
    // === Patch Product Image
    //

    // @ts-ignore
    const shopifyImage = data?.image && data.image?.src ? data.image.src : null;

    try {
      // console.log(
      //   "|||||||||||||web/lambda -shopify-sync updateEverything  shopifyImage = ",
      //   shopifyImage
      // );
      if (shopifyImage) {
        await fetch(shopifyImage)
          .then((res) => res.buffer())
          .then((buffer) => client.assets.upload('image', buffer))
          .then((assetDocument) => {
            // console.log(
            //   "|||||||||||||web/lambda -shopify-sync assetDocument = ",
            //   assetDocument
            // );
            const productImageObject = {
              'content.shopify.image': {
                _type: 'image',
                asset: {
                  _ref: assetDocument._id,
                  _type: 'reference',
                },
              },
              'content.main.mainImage': {
                _type: 'image',
                asset: {
                  _ref: assetDocument._id,
                  _type: 'reference',
                },
              },
            };
            tx = tx.patch(data.id.toString(), (patch) =>
              patch.set(productImageObject),
            );

            console.log(`patching image ${data.id} in Sanity`);
          });
      }
    } catch (e) {
      console.log(e);
    }

    //
    // === Patch Variants ===
    //

    const productVariants = data.variants.map((variant) => ({
      _type: 'productVariant',
      _id: variant.id.toString(),
    }));

    const productVariantSchema = data.variants.map((variant) => ({
      'content.main.title': data.title,
      'content.shopify.productId': data.id,
      'content.shopify.variantId': variant.id,
      'content.shopify.title': data.title,
      'content.shopify.variantTitle': variant.title,
      'content.shopify.sku': variant.sku,
      'content.shopify.price': variant.price,
      'content.shopify.position': variant.position,
      'content.shopify.image_id': variant.image_id,
      // "content.shopify.option1": variant.option1,
      // "content.shopify.option2": variant.option2,
      // "content.shopify.option3": variant.option3,
      // "content.shopify.taxable": variant.taxable,
      // "content.shopify.barcode": variant.barcode,
      // "content.shopify.inventory_item_id": variant.inventory_item_id,
      // "content.shopify.inventory_quantity": variant.inventory_quantity,
      // "content.shopify.old_inventory_quantity": variant.old_inventory_quantity,
      // "content.shopify.requires_shipping": variant.requires_shipping,
      // "content.shopify.grams": variant.grams,
      // "content.shopify.weight": variant.weight,
      // "content.shopify.weight_unit": variant.weight_unit,
    }));

    // Create Variant
    productVariants.forEach((variant, i) => {
      tx = tx.createIfNotExists(variant);
      tx = tx.patch(variant._id, (p) => p.set(productVariantSchema[i]));
    });

    console.log(
      `Updating/patching Variants ${data.variants
        .map((v) => v.id)
        .join(', ')} in Sanity`,
    );

    //
    // === Include variants on product document ===
    //

    tx = tx.patch(data.id.toString(), (p) =>
      p.set({
        'content.shopify.variants': data.variants.map((variant) => ({
          _type: 'reference',
          _ref: variant.id.toString(),
          _key: variant.id.toString(),
        })),
      }),
    );

    console.log(`Adding variant references to ${data.id} in Sanity`);

    const result = await tx.commit();

    return statusReturn(200, { body: JSON.stringify(result) });
  } catch (error) {
    console.log('this is an error', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'An internal server error has occured',
      }),
    };
  }
};

export const handler = async (event: APIGatewayEvent): Promise<any> => {
  if (event.httpMethod !== 'POST' || !event.body) {
    return statusReturn(400, '');
  }

  let data;
  const hmac = event.headers['x-shopify-hmac-sha256'];

  try {
    data = JSON.parse(event.body);
    const generatedHash = crypto
      .createHmac('sha256', SHOPIFY_SECRET)
      .update(event.body)
      .digest('base64');
    if (generatedHash !== hmac) {
      return statusReturn(400, { error: 'Invalid Webhook' });
    }
  } catch (error) {
    console.error('JSON parsing error:', error);
    return statusReturn(400, { error: 'Bad request body' });
  }

  // console.log('7777777777/shopify-sync.ts  data =', data);
  // Shopify sends both Product Updates/Creations AND deletions as POST requests
  // Product Updates & Creations contain the entire product body, including titles, tags, images, handle, etc.
  // Product Deletions only contain a singular 'id'
  // eslint-disable-next-line no-prototype-builtins
  if (data.hasOwnProperty('title') && data.hasOwnProperty('handle')) {
    // Build our initial product

    try {
      return client
        .fetch(
          `*[_type == "product" && _id == "${data.id.toString()}"][0] {
        ...,
        content {
          ...,
          shopify {
            ...,
            variants[]->
          }
        }
      }`,
        )
        .then((res) => {
          //  console.log("****** -----  lambada/shopify-sync.ts  res =", res);

          if (!res.content) {
            return updateEverything(data);
          }

          // Check if product updates have happened that matter
          const {
            title,
            slug: { current },
          } = res.content.main;
          const { defaultVariant, variants, image } = res.content.shopify;

          // Check Top Level Changes occured and rebuild
          if (
            !image ||
            title !== data.title ||
            current !== data.handle ||
            defaultVariant.price !== data.variants[0].price
          ) {
            return updateEverything(data);
          } else {
            // Check if more variants then currently stored and rebuild
            if (variants.length === data.variants.length) {
              // Check if nested variant information has changed
              let triggerRebuild = false;
              variants.forEach((v, i) => {
                const {
                  productId,
                  variantTitle,
                  variantId,
                } = v.content.shopify;
                // tslint:disable-next-line:no-shadowed-variable
                const { id, title, product_id } = data.variants[i];
                if (
                  productId !== product_id ||
                  variantId !== id ||
                  variantTitle !== title
                ) {
                  console.log(
                    `variant ${variantId} of ${variantTitle} has changed`,
                  );
                  triggerRebuild = true;
                }
              });
              if (triggerRebuild) {
                return updateEverything(data);
              } else {
                return statusReturn(200, { body: 'nothing important changed' });
              }
            } else {
              return updateEverything(data);
            }
          }
        })
        .catch((error) => {
          console.error(`Sanity error:`, error);
          return statusReturn(500, { error: error[0].message });
        });
    } catch (err) {
      return statusReturn(400, { error: 'Bad request body' });
    }

    // move all of this inside of the fetch request to block builds when not necessary
  } else if (
    data.hasOwnProperty('id') &&
    !data.hasOwnProperty('title') &&
    !data.hasOwnProperty('handle')
  ) {
    // this is triggered if Shopify sends a Product Deletion webhook that does NOT contain anything besides an ID

    // sets the "deleted" boolean to true
    // you could likely use this value in Gatsby to decide whether to render the item or not

    // tread carefully:
    return client
      .patch(data.id.toString())
      .set({ 'content.shopify.deleted': true })
      .commit()
      .then((deletedObject) => {
        console.log(`successfully marked ${data.id} as 'deleted'`);
      })
      .catch((error) => {
        console.error(`Sanity error:`, error);
        return statusReturn(500, { error: error[0].message });
      });
  }
};
