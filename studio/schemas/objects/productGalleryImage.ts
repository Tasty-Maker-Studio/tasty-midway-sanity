//import { ImagePreview } from '../components/ImagePreview';

export const productGalleryImage = {
  title: 'Product Images',
  name: 'productGalleryImage',
  type: 'array',
  of: [
        {
          title: 'Product Image Preview',
          type: 'shopifyProductImage',
        },
      ],
  validation: (Rule) => Rule.unique(),
};
