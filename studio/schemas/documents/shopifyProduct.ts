import { unwindEdges } from '@good-idea/unwind-edges';

export const shopifyProduct = {
  name: 'shopifyProduct',
  title: 'Shopify Product',
  type: 'document',
  fields: [
    {
      name: 'content',
      type: 'productContent',
    },
    {
      name: "shopifyId",
      type: "string",
      hidden: true,
    }
  ],
  preview: {
    select: {
      title: 'content.main.title',
      imageUrl: 'content.main.images',
    },
    prepare: (props) => {
      // console.log('document shopifyProduct props =', props)
      const { title, imageUrl } = props;
      return {
        title,
        imageUrl:  imageUrl[0]?.w100,
      };
    },
  },
};
