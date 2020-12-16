export const page = {
  name: 'page',
  title: 'Page',
  type: 'document',
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: 'shopifyProduct',
      type: 'pageContent',
    },
  ],
  preview: {
    select: {
      title: 'shopifyProduct.title',
      subtitle: 'heroText',
      media: 'mainImage',
    },
  },
};
