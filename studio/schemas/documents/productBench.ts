
export default {
  name: 'productBench',
  title: 'Product Bench',
  type: 'document',
  fields: [
    {
      name: 'shopifyProduct',
      type: 'reference',
      to: [{ type: 'shopifyProduct' }],
    },
    {
      name: "shopifyProduct",
      type: "productContent"
    }
  ],
  preview: {
    select: {
      title: 'title',
      sourceData: 'shopifyProduct.sourceData',
      archived: 'archived',
    },
    prepare: (props) => {
      const { title, archived, sourceData } = props;
      const itemTitle = sourceData ? title || sourceData.title : title;
      const src = sourceData?.image?.w100;
      const subtitle = archived ? '📁 Archived' : undefined;
      return {
        imageUrl: src,
        subtitle,
        title: itemTitle,
      };
    },
  },
};
