import {getShopifyThumbnail} from "../utils";

export const rawImage  = {
  name: 'rawImage',
  title: 'Product Images',
  type: 'image',
  fields: [
    {
      name: 'position',
      title: 'Position',
      type: 'number',
    },


  ],
  preview: {
    select: {
      imageUrl: 'sourceData',
      title: 'position'
    },
    prepare: ({ imageUrl }) => {
      console.log('[productGalleryImage]  imageUrl =', imageUrl);
      return {
        imageUrl: getShopifyThumbnail(imageUrl)
      }
    },
  }
}
