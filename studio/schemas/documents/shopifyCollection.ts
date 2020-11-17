import Tabs from 'sanity-plugin-tabs'
import {unwindEdges} from "@good-idea/unwind-edges";

export const shopifyCollection = {
  name: 'shopifyCollection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Page URI',
      name: 'handle',
      type: 'string',
    },
    {
      title: 'Shopify ID',
      name: 'shopifyId',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'title',
      imageUrl: 'sourceData.image',
    },
    prepare: (props) => {
      const {title, imageUrl} = props
      // @ts-ignore
      const src = imageUrl?.w100;
      return {
        title,
        imageUrl: src
      }
    },
  }
}
