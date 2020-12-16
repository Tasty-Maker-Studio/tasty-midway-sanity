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

export const linkedCollections = {
  name: 'linkedCollections',
  title: 'Linked Collections',
  type: 'array',
  options: {
    sortable: false,
  },
  of: [
      {
      type: 'reference',
      to: [
        {
          type: 'shopifyCollection',
        }
      ],
    },
  ],
};
