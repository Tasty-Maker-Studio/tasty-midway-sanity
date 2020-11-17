export const product = {
  fields: [
    { name: 'sourceData', hidden: true },
    {
      name:'sourceData',
      hidden:false
    },
    {
      title: 'Banner',
      name: 'hero',
      type: 'hero',
    },
    {
      title: 'Related Products Carousels',
      description:
        'The title will default to "Related Products" if left empty.',
      name: 'related',
      type: 'carousel',
    },
    // {
    //   title: 'Klaviyo Form ID',
    //   name: 'handle',
    //   type: 'string',
    //   description: 'Just the id within class="..." i.e. klaviyo-form-ABC123',
    // },
    {
      title: 'Related',
      type: 'array',
      name: 'related',
      description: 'Link to a Page, Product, Collection, or URL',
      of: [
        {
          type: 'pageLink',
          options: {
            collections: false,
          },
        },
      ],
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'SEO',
    },
  ],
}
