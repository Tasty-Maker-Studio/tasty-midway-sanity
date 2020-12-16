import { unwindEdges } from '@good-idea/unwind-edges';

export const doc = {
  name: 'doc',
  title: 'Doc',
  type: 'document',
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: "shopifyProduct",
      type: "pageContent",
    }
  ],
  preview: {
    select: {
      title: 'shopifyProduct.title',
      subtitle: 'heroText',
      imageUrl: 'sourceData.images',
    },
    prepare: (props) => {
      const { title, subtitle, imageUrl } = props;
      const [images] = unwindEdges(imageUrl);
      // @ts-ignore
      const src = images[0]?.w100;
      return {
        title,
        subtitle,
        imageUrl: src,
      };
    },
  }
}
