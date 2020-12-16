import {unwindEdges} from "@good-idea/unwind-edges";

export const product = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: "shopifyProduct",
      type: "productContent"
    }
  ],
  preview: {
    select: {
      title: 'title',
      imageUrl: 'images',
    },
    prepare: (props) => {
      console.log(' document Product prepare  props =', props)
      const {title, imageUrl} = props;
      // @ts-ignore
      const src = imageUrl[0]?.w100;
      return {
        title,
        imageUrl: src,
      };
    }
  }
}
