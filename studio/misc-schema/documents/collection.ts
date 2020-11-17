import Tabs from 'sanity-plugin-tabs'

export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: "collection",
      type: "pageContent",
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'heroText',
      media: 'mainImage'
    }
  }
}
