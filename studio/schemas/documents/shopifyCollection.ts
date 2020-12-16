import Tabs from 'sanity-plugin-tabs';
import { unwindEdges } from '@good-idea/unwind-edges';

export const shopifyCollection = {
  name: 'shopifyCollection',
  title: 'Shopify Collection',
  type: 'document',
  fields: [
    {
      name: 'content',
      type: 'collectionContent',
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
      imageUrl: 'content.main.sourceData.image',
    },
    prepare: (props) => {
      const { title, imageUrl } = props;
      // @ts-ignore
      const src = imageUrl.originalSrc;
      return {
        title,
        imageUrl: src,
      };
    },
  },
};
