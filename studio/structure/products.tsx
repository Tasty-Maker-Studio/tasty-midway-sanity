import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import Emoji from 'a11y-react-emoji'

import { Views } from './views/preview'

const Icon = () => <Emoji style={{ fontSize: '2rem' }} symbol='🛍️' />



export const ProductMenuItem = S.listItem()
  .title('Products')
  .icon(Icon)
  .child(
    S.documentTypeList('shopifyProduct')
      .title('List of Products')
      .menuItems(S.documentTypeList('shopifyProduct').getMenuItems())
      .filter('_type == $type && subscription != true')
      .params({ type: 'shopifyProduct' })
      .child((documentId:string) =>{
        return ( S.document()
            .documentId(documentId)
            .views(Views({type: 'page'}))
        )
      })
  );
