// // import React from 'react'
// import S from '@sanity/desk-tool/structure-builder';
// //import { SiteSettingsMenu} from "./structure/siteSettings";
// import { ConfigMenu } from './structure/config';
// import { ProductMenuItem } from './structure/products';
// import { ProductVariantParent } from './structure/variants';
// import { CollectionMenuItem } from './structure/collections';
// import { PageMenuItem } from './structure/pages';
// import { DocMenuItem } from './structure/docs';
// import { RedirectMenuItem } from './structure/redirects';
// import { SubscriptionMenuItem } from './structure/subscriptions';
// import { HomePageChild } from './structure/homepage';
//
// //
// // === Structure ===
// //
//
// export default () =>
//   S.list()
//     .title('Content')
//     .items([
//       ConfigMenu,
//       HomePageChild,
//       PageMenuItem,
//       CollectionMenuItem,
//       ProductMenuItem,
//       ProductVariantParent,
//       SubscriptionMenuItem,
//       RedirectMenuItem,
//       DocMenuItem,
//     ]);


import S from '@sanity/desk-tool/structure-builder'
import { MdSettings, MdHome } from 'react-icons/md'
import { TiDevicePhone, TiThSmallOutline, TiDocument } from 'react-icons/ti'
import { FaShoppingBag } from 'react-icons/fa'

export default () =>
  S.list()
    .title('Site')
    .items([
      // Products
      S.listItem()
        .id('products')
        .title('Products')
        .icon(TiDevicePhone)
        .child(S.documentTypeList('shopifyProduct')),

      // Collections
      S.listItem()
        .id('collections')
        .title('Collections')
        .icon(TiThSmallOutline)
        .child(S.documentTypeList('shopifyCollection')),

      // Shop Page
      // S.listItem()
      //   .title('Shop')
      //   .icon(FaShoppingBag)
      //   .child(S.editor().id('shop').schemaType('shop').documentId('shop')),

      // Pages
      // S.listItem()
      //   .id('pages')
      //   .title('Pages')
      //   .icon(TiDocument)
      //   .child(S.documentTypeList('page')),

      S.listItem()
        .title('Site Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('config')
            .schemaType('siteSettings')
            .documentId('site-settings'),
        ),

      // // Static pages: About, Contact
      // S.listItem()
      // 	.title('Other Pages')
      // 	.child(S.documentTypeList('staticPage').title('Pages')),
    ])
