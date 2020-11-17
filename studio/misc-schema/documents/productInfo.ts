export const productInfo = {

title: 'Product Page Settings',
  type: 'document',
  name: 'productInfo',
  description: 'description',
  fields: [
  {
    name: 'relatedProducts',
    type: 'array',
    of: [
      {
        type: 'reference',
        to: { type: 'shopifyProduct' },
        options: {
          filter: 'archived != true',
        },
      },
    ],
  },
],
  preview: {
  select: {},
  prepare: () => ({
    title: 'Product Info Blocks',
  }),
},
}
