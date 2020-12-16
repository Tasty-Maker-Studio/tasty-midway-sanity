export const internalLink = {
  title: 'Internal Link',
  name: 'internalLink',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'title',
      title: 'Link CTA',
      type: 'string',
    },
    {
      name: 'link',
      type: 'reference',
      to: [{ type: 'shopifyProduct' }]
    },
  ],
};
