export const linkedProducts = {
  name: 'linkedProducts',
  title: 'Linked Products',
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
          type: 'shopifyProduct',
        },
      ],
    },
  ],
}
