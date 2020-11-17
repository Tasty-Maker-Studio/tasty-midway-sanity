// First, we must import the schema creator
// import createSchema from 'part:@sanity/base/schema-creator';
// Then import schema types from any plugins that might expose them
// import schemaTypes from 'all:part:@sanity/base/schema-type';
// import { saneShopify } from '@sane-shopify/sanity-plugin';
// import { product } from './saneShopify/product';
// import { collection } from './saneShopify/collection';
//
// // We import object and document schemas
// import * as documents from './documents';
// import * as objects from './objects';
// import * as modules from './modules';
//
//
// const saneShopifySchema = saneShopify({
//   product,
//   collection,
//   productVariant: {},
//   productOption: {},
//   productOptionValue: {}
//
// })
//
// // Then we give our schema to the builder and provide the result to Sanity
// export default createSchema({
//   // We name our schema
//   name: 'default',
//   // Then proceed to concatenate our our document type
//   // to the ones provided by any plugins that are installed
//   types: schemaTypes.concat([
//     ...Object.values(modules),
//     ...Object.values(objects),
//     ...Object.values(documents),
//     ...saneShopifySchema
//   ]),
// });

// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'
import videoSelector from 'part:@sanity/form-builder/input/video-embed/schema'
// import { product } from './saneShopify/product'
// import { collection } from './saneShopify/collection'
import { saneShopify } from '@sane-shopify/sanity-plugin'

// const saneShopifySchema = saneShopify({
//   product,
//   collection,
// })

/**
 * Types
 */

import * as objects from './objects'
import * as documents from './documents'
import * as modules from './modules';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    ...Object.values(modules),
    ...Object.values(objects),
    ...Object.values(documents),
    /* Your types here! */
    videoSelector,
  ]),
})
