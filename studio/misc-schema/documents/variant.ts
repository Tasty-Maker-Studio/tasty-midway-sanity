import {getShopifyThumbnail} from "../utils";

export const variant = {
  name: 'productVariant',
  title: 'Variant',
  type: 'document',
  __experimental_actions: ['update', 'publish', 'delete'],
  fields: [
    {
      name: "shopifyProduct",
      type: "variantContent"
    }
  ],
  preview: {
    select: {
      title: 'shopifyProduct.title',
      imageUrl: 'shopifyProduct.sourceData',
    },
    prepare({ title, imageUrl }) {
      return {
        title: title,
        imageUrl: getShopifyThumbnail(imageUrl),
      };
    },
  }
}
