export const productVariant = {
  name: 'productVariant',
  title: 'Variant',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'delete'],
  fields: [
    {
      name: 'shopifyProduct',
      type: 'variantContent',
    },
  ],
  preview: {
    select: {
      title: 'shopifyProduct.title',
      media: 'mainImage',
    },
  },
};
