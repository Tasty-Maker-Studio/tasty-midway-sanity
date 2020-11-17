import { unwindEdges } from "@good-idea/unwind-edges";


export const shopifyProduct =  {
  name: 'shopifyProduct',
  title: 'ShopifyProduct',
  type: 'document',
  fields: [
  {
    title: 'Title',
    name: 'title',
    type: 'string',
    readOnly: true,
  },
  {
    name: 'productType',
    title: 'Product Type',
    type: 'string',
  },
  {
    title: 'Page URI (handle)',
    name: 'handle',
    type: 'string',
    readOnly: true,
  },
  {
    name: 'tags',
    title: 'Tags',
    type: 'array',
    of: [{ type: 'string' }],
  },
  {
    title: 'Vendor',
    name: 'vendor',
    type: 'string',
    readOnly: true,
  },
  {
    title: 'Shopify ID',
    name: 'shopifyId',
    type: 'string',
    readOnly: true,
  },
  // {
  //   name: 'priceRange',
  //   title: 'Price Range',
  //   type: 'shopifySourceProductPriceRange',
  // },
  {
    title: 'Min Variant Price',
    name: 'minVariantPrice',
    type: 'number',
    readOnly: true,
  },
  {
    title: 'Max Variant Price',
    name: 'maxVariantPrice',
    type: 'number',
    readOnly: true,
  },
  {
    title: 'Archived',
    name: 'archived',
    type: 'boolean',
  },
  {
    title: 'Collections',
    name: 'collections',
    type: 'linkedCollections',
    readOnly: true,
  },
  {
    title: 'Shopify Data',
    name: 'sourceData',
    type: 'shopifySourceProduct',
    //hidden: true,
    readOnly: true,
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
  },
],
  preview: {
    select: {
      title: 'title',
      imageUrl: 'sourceData.images',
    },
    prepare: (props) => {
      const {title, imageUrl} = props
      const [images] = unwindEdges(imageUrl)
      // @ts-ignore
      const src = images[0]?.w100;
      return {
        title,
        imageUrl: src
      }
    },
  }
}
