import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import Emoji from 'a11y-react-emoji'
import {Views} from "./views/preview";

const Icon = () => <Emoji style={{ fontSize: '2rem' }} symbol='🖼️' />

export const CollectionMenuItem = S.listItem()
  .title('Collections')
  .icon(Icon)
  .schemaType("shopifyProduct")
  .child(
    S.documentTypeList('shopifyCollection')
      .title('List of Collections')
      .menuItems(S.documentTypeList('shopifyCollection').getMenuItems())
      .filter('_type == $type && archive != false')
      .params({ type: 'shopifyCollection' })
      .child((documentId:string) =>{
        return ( S.document()
            .documentId(documentId)
            .views(Views({type: 'page'}))
        )
      })
  );
