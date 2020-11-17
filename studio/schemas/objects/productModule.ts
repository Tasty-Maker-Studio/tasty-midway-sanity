import { Rule } from '@sanity/validation'


export const productModule  = {
  title: 'Product Content',
  name: 'productModule',
  type: 'object',
  fieldsets: [
    {
      name: 'modules',
      title: 'Product Modules',
      options: {
        collapsible: true,
        collapsed: true
      }
    },
    {
      name: 'main',
      title: 'Product Main Content',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      readOnly: true,
      description: 'This has to stay in sync with Shopify',
      options: {
        source: 'content.main.title',
        maxLength: 96
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'linkedSite',
      title: 'Linked Site Url',
      description: 'This is a fake product so link to the real site!',
      type: 'url'
    },
    {
      name: 'linkedSiteName',
      title: 'Linked Site Name',
      description: 'Linked Site Title',
      type: 'string'
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      },
      fieldset: 'main',
      validation: (Rule: Rule) => Rule.required()
    },
    // {
    //   name: 'productImages',
    //   title: 'Product Images',
    //   type: 'array',
    //   of: [ { type: 'productGalleryImage' } ],
    //   validation: Rule => Rule.custom(productImages => {
    //     return  productImages !== null
    //   }),
    // },

    {
      name: 'description',
      title: 'Product Description',
      type: 'blockContent',
    },
    {
      name: 'modules',
      title: 'Modules',
      type: 'moduleContent',
      fieldset: 'modules'
    }
  ]
}
