import Schema from '@sanity/schema';
import blockTools from '@sanity/block-tools';
import { JSDOM } from 'jsdom';
import { BlockText } from '../../types/sanityTypes';

const postSchema = {
  type: 'object',
  name: 'productDescription',
  fields: [
    {
      title: 'Body',
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};

const stringHtmlToBlocks = (html: string): BlockText[] => {
  // Start with compiling a schema we can work against
  const rootSchema = Schema.compile({
    name: 'shopifyProductDescription',
    types: [postSchema],
  });

  // The compiled schema type for the content type that holds the block array
  const blockContentType = rootSchema
    .get('productDescription')
    .fields.find((field: any) => field.name === 'body').type;

  return blockTools.htmlToBlocks(html, blockContentType, {
    parseHtml: (html) => new JSDOM(html).window.document,
  });
};

export { stringHtmlToBlocks };
