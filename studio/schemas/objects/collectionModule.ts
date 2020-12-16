import { Rule } from '@sanity/validation';
import client from "part:@sanity/base/client";
import {
  getReferencedDocument,
} from '../utils';
import {getFieldConfig} from "../../plugins/dashboard-widget-shopify-sync/widget/utils";

export const collectionModule = {
  title: 'Collection Content',
  name: 'collectionModule',
  type: 'object',
  // options: {
  //   collapsible: true,
  //   collapsed: true,
  // },
  // fieldsets: [
  //   {
  //     name: 'modules',
  //     title: 'Product Modules',
  //     options: {
  //       collapsible: true,
  //       collapsed: true,
  //     },
  //   },
  //   {
  //     name: 'main',
  //     title: 'Product Main Content',
  //     options: {
  //       collapsible: true,
  //       collapsed: true,
  //     },
  //   },
  // ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      readOnly: true,
      type: 'string',
      // hidden: true,
    },
    {
      title: 'Page URI',
      name: 'handle',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
    {
      title: 'Shopify ID',
      name: 'shopifyId',
      type: 'string',
      hidden: true,
    },
    {
      title: 'Archived',
      name: 'archived',
      type: 'boolean',
    },
    {
      name: 'sourceData',
      readOnly: true,
      type: 'shopifySourceCollection',
    },
    {
      title: 'Products',
      name: 'products',
      type: 'linkedProducts',
      description: 'Synced from Shopify',
    },
    // {
    // {
    //   name: 'descriptionHtml',
    //   title: 'Product Description',
    //   type: 'blockContent',
    // },
    // {
    //   name: 'modules',
    //   title: 'Modules',
    //   type: 'moduleContent',
    //   fieldset: 'modules',
    // },
  ],
};
