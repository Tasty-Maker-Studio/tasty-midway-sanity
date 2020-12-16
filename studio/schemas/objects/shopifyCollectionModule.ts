import { Rule } from '@sanity/validation';

export const shopifyCollectionModule = {
  title: 'Shopify Collection Content',
  name: 'shopifyCollectionModule',
  type: 'object',
  fieldsets: [
    {
      name: 'default',
      title: 'Default Variant',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    { title: 'Title', name: 'title', type: 'string' },
    {
      title: 'Handle',
      name: 'handle',
      type: 'string',
      hidden: true,
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      rows: 3,
    },
    {
      title: 'Description (HTML)',
      name: 'descriptionHtml',
      type: 'text',
      rows: 3,
      hidden: true,
    },
    {
      title: 'ID',
      name: 'id',
      type: 'string',
      hidden: true,
    },
    {
      title: 'Image',
      name: 'image',
      type: 'shopifySourceImage',
      hidden: true,
    },
    {
      title: 'Products',
      name: 'products',
      type: 'shopifySourceProductsConnection',
      hidden: true,
    },
  ],
};
