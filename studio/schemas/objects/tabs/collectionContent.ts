import Tabs from 'sanity-plugin-tabs';

export const collectionContent = {
  name: 'collectionContent',
  type: 'object',
  inputComponent: Tabs,
  fieldsets: [
    { name: 'main', title: 'Main' },
    { name: 'shopify', title: 'Shopify' },
    { name: 'defaultMeta', title: 'Meta' },
  ],
  fields: [
    {
      type: 'collectionModule',
      name: 'main',
      fieldset: 'main',
    },
    {
      type: 'shopifyCollectionModule',
      name: 'shopify',
      fieldset: 'shopify',
    },
    {
      type: 'metaCard',
      name: 'meta',
      fieldset: 'defaultMeta',
    },
  ],
};
