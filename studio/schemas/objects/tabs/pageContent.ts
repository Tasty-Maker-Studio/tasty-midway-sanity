import Tabs from 'sanity-plugin-tabs';

export const pageContent =  {
  name: "pageContent",
  type: "object",
  title: "Page Content",
  inputComponent: Tabs,
  fieldsets: [
    { name: "main", title: "Main" },
    { name: "defaultMeta", title: "Meta" }
  ],
  fields: [
    {
      type: "pageModule",
      name: "main",
      fieldset: "main"
    },
    {
      type: "metaCard",
      name: "meta",
      fieldset: "defaultMeta"
    }
  ]
}
