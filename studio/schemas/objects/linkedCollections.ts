export const linkedCollections = {
  name: 'linkedCollections',
  description: 'Synced from Shopify',
  type: 'array',
  options: {
    sortable: false,
  },
  readOnly: true,
  of: [
    {
      type: 'reference',
      to: [
        {
          type: 'shopifyCollection',
        },
      ],
    },
  ],
}
