export const siteGlobal = {
  name: 'siteGlobal',
  _id: 'siteGlobal',
  title: 'Global',
  type: 'document',
  description: 'Handles general global settings',
  fields: [
    {
      name: 'shopifyProduct',
      type: 'globalContent',
    },
  ],
  preview: {
    select: {},
    prepare() {
      return Object.assign(
        {},
        {
          title: 'Global Settings',
        },
      );
    },
  },
};
