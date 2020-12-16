

export const linkedCollections = {
  name: 'linkedCollections',
  description: 'Synced from Shopify',
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
        },
      ],
      // options: {
      //   filter: ({document}) => {
      //     // Always make sure to check for document properties
      //     // before attempting to use them
      //     console.log('---document =', document);
      //     console.log('---document.collections[0]._ref =', document.collections[0]._ref);
      //     const filterResult = `_type == shopifyCollection && _id ==  ${document.collections[0]._ref}`;
      //
      //     console.log('---filterResult =', filterResult);
      //
      //     return filterResult;
      //
      //   }
      // }
    },
  ],
};
