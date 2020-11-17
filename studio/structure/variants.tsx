import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import Emoji from 'a11y-react-emoji';

const VariantIcon = () => <Emoji style={{ fontSize: '2rem' }} symbol="🥘" />;

export const ProductVariantParent = S.listItem()
  .title('Product Variants')
  .icon(VariantIcon)
  .child(
    S.documentTypeList('shopifyProduct')
      .title('By Product')
      .menuItems(S.documentTypeList('shopifyProduct').getMenuItems())
      .filter('_type == $type && !defined(parents) && subscription != true')
      .params({ type: 'shopifyProduct' })
      .child((id) =>
        S.documentList()
          .title('Variants')
          .menuItems(S.documentTypeList('productVariant').getMenuItems())
          .filter('_type == $type && content.shopify.productId == id')
          .params({ type: 'productVariant', id: Number(id) }),
      ),
  );
