export const pageInfo = {
  name: 'pageInfo',
  type: 'object',
  fields: [
    {
      name: 'hasNextPage',
      type: 'boolean',
    },
    {
      name: 'hasPreviousPage',
      type: 'boolean',
    },
  ],
};

export const shopifySourceProductOption = {
  name: 'shopifySourceProductOption',
  type: 'object',
  fields: [
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'values',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};

export const shopifyMoneyV2 = {
  name: 'shopifyMoneyV2',
  type: 'object',
  fields: [
    {
      name: 'amount',
      type: 'string',
    },
    {
      name: 'currencyCode',
      type: 'string',
    },
  ],
};

export const shopifySourceProductPriceRange = {
  name: 'shopifySourceProductPriceRange',
  type: 'object',
  fields: [
    {
      name: 'minVariantPrice',
      type: 'shopifyMoneyV2',
    },
    {
      name: 'maxVariantPrice',
      type: 'shopifyMoneyV2',
    },
  ],
};

export const shopifySourceProductVariantEdge = {
  name: 'shopifySourceProductVariantEdge',
  type: 'object',
  fields: [
    { name: 'cursor', type: 'string' },
    { name: 'node', type: 'shopifySourceProductVariant' },
  ],
};

export const shopifySourceProductVariantEdges = {
  name: 'shopifySourceProductVariantEdges',
  type: 'array',
  of: [{ type: 'shopifySourceProductVariantEdge' }],
};

export const shopifySourceProductVariantsConnection = {
  name: 'shopifySourceProductVariantsConnection',
  type: 'object',
  fields: [
    {
      name: 'pageInfo',
      type: 'pageInfo',
    },
    {
      name: 'edges',
      type: 'shopifySourceProductVariantEdges',
    },
  ],
};

export const shopifySourceCollectionNode = {
  name: 'shopifySourceCollectionNode',
  type: 'object',
  fields: [
    {
      name: 'handle',
      type: 'string',
    },
    {
      name: 'id',
      type: 'string',
    },
  ],
};

export const shopifySourceCollectionEdge = {
  name: 'shopifySourceCollectionEdge',
  type: 'object',
  fields: [
    {
      name: 'cursor',
      type: 'string',
      title: 'Cursor',
    },
    {
      name: 'node',
      type: 'shopifySourceCollectionNode',
    },
  ],
};

export const shopifySourceCollectionsConnection = {
  name: 'shopifySourceCollectionsConnection',
  type: 'object',
  fields: [
    {
      name: 'pageInfo',
      type: 'pageInfo',
    },
    {
      name: 'edges',
      type: 'array',
      of: [{ type: 'shopifySourceCollectionEdge' }],
    },
  ],
};

export const selectedOptions = {
  name: 'shopifySourceSelectedOption',
  type: 'object',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'value', type: 'string' },
  ],
};

export const shopifySourceProductVariant = {
  title: 'Shopify Product Data',
  name: 'shopifySourceProductVariant',
  readOnly: true,
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    { name: 'availableForSale', title: 'Available for Sale', type: 'boolean' },
    { name: 'id', title: 'ID', type: 'string' },
    // TODO: this will return as NULL from shopify if it does not exist.
    //       The sync plugin needs to figure out how to deal with this.
    { name: 'image', type: 'shopifySourceImage' },
    { name: 'priceV2', type: 'shopifyMoneyV2' },
    { name: 'compareAtPriceV2', type: 'shopifyMoneyV2' },
    {
      name: 'selectedOptions',
      type: 'array',
      of: [{ type: 'shopifySourceSelectedOption' }],
    },
    { name: 'requiresShipping', type: 'boolean' },
    { name: 'sku', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'weight', type: 'number' },
    { name: 'weightUnit', type: 'string' },
  ],
  preview: {
    select: { title: 'title' },
  },
};

export const shopifyProductOption = {
  title: 'Product Option',
  name: 'shopifyProductOption',
  type: 'object',
  fields: [
    {
      name: 'shopifyOptionId',
      title: 'Option ID',
      readOnly: true,
      type: 'string',
    },
    {
      name: 'name',
      title: 'Name',
      readOnly: true,
      type: 'string',
    },
    {
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [{ type: 'shopifyProductOptionValue' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
};



export const shopifyProductVariant = {
  title: 'Product Variant',
  name: 'shopifyProductVariant',
  type: 'object',
  fields: [
    {
      name: 'shopifyVariantID',
      title: 'Variant ID',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'title',
      title: 'Variant Title',
      type: 'string',
      readOnly: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  }
}

export const shopifyProductOptionValue = {
  title: 'Option Value',
  name: 'shopifyProductOptionValue',
  type: 'object',
  fields: [
    {
      name: 'value',
      title: 'Value',
      type: 'string',
    }
  ],
  preview: {
    select: {
      title: 'value',
    },
  }
}

export const shopifySourceProduct = {
  title: 'Shopify Product Data',
  name: 'shopifySourceProduct',
  readOnly: true,
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    { title: 'Title', name: 'title', type: 'string' },
    { name: 'availableForSale', title: 'Available for Sale', type: 'boolean' },
    {
      name: 'priceRange',
      title: 'Price Range',
      hidden: true,
      type: 'shopifySourceProductPriceRange',
    },
    {
      name: 'productType',
      title: 'Product Type',
      type: 'string',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
      rows: 3,
    },
    {
      title: 'Description (HTML)',
      name: 'descriptionHtml',
      type: 'text',
      rows: 3,
      hidden: true,
    },
    {
      title: 'Vendor',
      name: 'vendor',
      type: 'string',
      hidden: true,
    },
    {
      title: 'ID',
      name: 'id',
      type: 'string',
      hidden: true,
    },
    {
      title: 'Images',
      name: 'images',
      type: 'shopifySourceImages',
      hidden: true,
    },
    {
      title: 'Options',
      name: 'options',
      type: 'array',
      hidden: true,
      of: [{ type: 'shopifySourceProductOption' }],
    },
    {
      title: 'Variants',
      name: 'variants',
      type: 'shopifySourceProductVariantsConnection',
      hidden: true,
    },
    {
      title: 'Collections',
      name: 'collections',
      type: 'shopifySourceCollectionsConnection',
      hidden: true,
    },
  ],
}
