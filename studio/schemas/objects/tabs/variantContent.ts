import Tabs from 'sanity-plugin-tabs';

export const variantContent = {
  name: 'variantContent',
  type: 'object',
  inputComponent: Tabs,
  fieldsets: [
    { name: 'main', title: 'Main' },
    { name: 'shopify', title: 'Shopify' },
  ],
  fields: [
    {
      type: 'variantModule',
      name: 'variants',
      fieldset: 'main',
    },
    {
      type: 'shopifyVariantModule',
      name: 'sourceData',
      fieldset: 'shopify',
    },
  ],
};
