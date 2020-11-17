import { Rule } from '@sanity/validation'

export const productGrid = {
  title: 'Product Grid',
  name: 'productGrid',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title (Optional)',
      type: 'string'
    },
    {
      name: 'shortDescription',
      title: 'Short Description (Optional)',
      type: 'string'
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'shopifyProduct' } }],
      validation: (Rule: Rule) => Rule.min(1).max(40),
    }
  ]
}
