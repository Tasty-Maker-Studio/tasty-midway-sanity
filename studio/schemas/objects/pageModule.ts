export const pageModule = {
  title: 'Page Content',
  name: 'pageModule',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'sourcedata.title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'modules',
      title: 'Modules',
      type: 'moduleContent',
    },
  ],
};
