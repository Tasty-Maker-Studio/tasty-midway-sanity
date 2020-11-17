// import {getShopifyThumbnail} from "../utils";

export const productGalleryImage = {
  title: 'Product Gallery Image',
  name: 'productGalleryImage',
  type: 'object',
  fieldsets: [
    {
      name: 'sourceData',
      title: 'Product Main Content',
      options: {
        collapsible: true,
        collapsed: false
      }
    }
  ],
  fields: [

    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'rawImage'}],
      fieldset: 'sourceData'
    }
  ],
  preview: {
    select: {
      handle: 'shopifyProduct.sourceData'
    },
    prepare: ({ handle }) => {
      console.log('[productGalleryImage]  handle =', handle);
      return {
        handle: handle.title
      }
    },
  }
  // type: 'array',
  // of: [{ type: 'reference', to: { type: 'shopifyProduct' } }],
  // preview: {
  //   select: {
  //     images: 'shopifyProduct.sourceData.images'
  //   },
  //   prepare: ({ images }) => {
  //     console.log('[productGalleryImage]  imageUrl =', images);
  //     return {
  //       imageUrl: getShopifyThumbnail(images)
  //     }
  //   },
  // }
}
