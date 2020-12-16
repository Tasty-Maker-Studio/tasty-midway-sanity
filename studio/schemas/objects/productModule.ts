import { Rule } from '@sanity/validation';
import {
  getReferencedDocument,
} from '../utils';
import {getFieldConfig} from "../../plugins/dashboard-widget-shopify-sync/widget/utils";

export const productModule = {
  title: 'Product Content',
  name: 'productModule',
  type: 'object',
  // options: {
  //   collapsible: true,
  //   collapsed: true,
  // },
  // fieldsets: [
  //   {
  //     name: 'modules',
  //     title: 'Product Modules',
  //     options: {
  //       collapsible: true,
  //       collapsed: true,
  //     },
  //   },
  //   {
  //     name: 'main',
  //     title: 'Product Main Content',
  //     options: {
  //       collapsible: true,
  //       collapsed: true,
  //     },
  //   },
  // ],
  fields: [
    { title: 'Title', name: 'title', type: 'string', readOnly: true },
    { title: 'Custom Title', name: 'customTitle', type: 'string' },
    { title: 'Shopify Id', name: 'shopifyId', type: 'string', readOnly: true },
    { name: 'availableForSale', title: 'Available for Sale', type: 'boolean' },
    { name: 'createdAt', type: 'date', readOnly: true },
    { name: 'publishedAt', type: 'date', readOnly: true },
    { title: 'Max Variant', name: 'maxVariantPrice', type: 'number', readOnly: true },
    { title: 'Min Variant', name: 'minVariantPrice', type: 'number', readOnly: true },
    {
      name: 'priceRange',
      title: 'Price Range',
      hidden: true,
      type: 'shopifySourceProductPriceRange',
    },
    {
      name: 'presentmentPriceRanges',
      title: 'Presentment Price Ranges',
      hidden: true,
      type: 'shopifySourceProductPresentmentPriceRangeConnection',
    },
    {
      title: 'Product Images',
      name: 'images',
      type: 'productGalleryImage',
    },
    {
      name: 'productType',
      title: 'Product Type',
      type: 'string',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      hidden: true,
    },
    {
      title: 'Description (HTML)',
      name: 'descriptionHtml',
      type: 'blockContent',
    },
    {
      title: 'Vendor',
      name: 'vendor',
      type: 'string',
      hidden: true,
    },
    {
      title: 'ID',
      name: 'id',
      type: 'string',
      hidden: true,
    },
    {
      title: 'Options',
      name: 'options',
      type: 'array',
      of: [{ type: 'shopifyProductOption' }],
    },
    {
      title: 'Variants',
      name: 'variants',
      type: 'array',
      of: [{ type: 'shopifyProductVariant' }],
      sortable: true,
    },
    {
      title: 'Collections',
      name: 'collections',
      type: 'linkedCollections'
    },
    {
      name: 'sourceData',
      type: 'shopifySourceProduct',
      hidden: true
    },
        // {
        //   name: 'modules',
        //   title: 'Modules',
        //   type: 'moduleContent',
        //   fieldset: 'modules',
        // },
  ]
};
