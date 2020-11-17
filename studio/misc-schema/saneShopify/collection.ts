
export const collection = {
  fields: [
    { name: 'sourceData', hidden: true },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image' }]
    }
  ],
}
