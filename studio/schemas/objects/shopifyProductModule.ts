import { Rule } from '@sanity/validation';

export const shopifyProductModule = {
  title: 'Shopify Product Content',
  name: 'shopifyProductModule',
  type: 'object',
  // fieldsets: [
  //   {
  //     name: 'shopifySourceProduct',
  //     options: {
  //       collapsible: true,
  //       collapsed: true,
  //     },
  //   },
  // ],
  fields: [

    { title: 'Title', name: 'title', type: 'string' },
    { title: 'Shopify Id', name: 'id', type: 'string', readOnly: true },
    { name: 'availableForSale', title: 'Available for Sale', type: 'boolean' },
    { name: 'createdAt', type: 'date', readOnly: true },
    { name: 'publishedAt', type: 'date', readOnly: true },
    { title: 'Max Variant', name: 'maxVariantPrice', type: 'number', readOnly: true },
    { title: 'Min Variant', name: 'minVariantPrice', type: 'number', readOnly: true },
    // {
    //   name: 'title',
    //   title: 'Title',
    //   type: 'string',
    //   readOnly: true,
    // },
    // {
    //   name: 'id',
    //   title: 'ID',
    //   type: 'string',
    //   description: 'This comes from Shopify and cannot be changed',
    //   readOnly: true,
    // },
    // {
    //   name: 'deleted',
    //   title: 'Deleted',
    //   type: 'boolean',
    //   description: 'This can be a flag set if the item is deleted from Shopify',
    //   readOnly: true,
    // },
    // {
    //   name: 'image',
    //   type: 'image',
    //   title: 'Shopify Image',
    //   readOnly: true,
    // },
    // {
    //   name: 'productId',
    //   title: 'Product ID',
    //   type: 'number',
    //   description: 'This comes from Shopify and cannot be changed',
    //   readOnly: true,
    // },
    {
      title: 'Product Images',
      name: 'images',
      type: 'shopifySourceImages',
      description: 'This comes from Shopify and cannot be changed',
    },
    {
      name: 'defaultPrice',
      title: 'Default Price',
      type: 'string',
      description: 'This comes from Shopify and cannot be changed',
      readOnly: true,
    },
    {
      name: 'description',
      title: 'Product Description',
      type: 'blockContent',
      readOnly: true,
    },
    //
    // {
    //   name: 'variants',
    //   title: 'Variants',
    //   type: 'array',
    //   of: [{ type: 'reference', to: { type: 'productVariant' } }],
    //   readOnly: true,
    // },
    // {
    //   name: 'defaultVariant',
    //   type: 'defaultVariant',
    // },
  ],
};
