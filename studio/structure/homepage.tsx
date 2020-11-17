import React from 'react';
import { MdHome } from 'react-icons/md'
import S from '@sanity/desk-tool/structure-builder';


export const HomePageChild = S.listItem()
  .title('Homepage')
  .icon(MdHome)
  .child(
    S.editor()
      .id('homepage')
      .schemaType('homepage')
      .documentId('homepage'),
  );
