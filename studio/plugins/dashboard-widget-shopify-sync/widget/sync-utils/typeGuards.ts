import {
  SanityShopifyTabDocument,
  SanityShopifyProductTabDocument,
  SanityShopifyCollectionTabDocument,
  Product,
  Collection,
} from '../types';

export const isSanityTabProduct = (
  doc: Partial<SanityShopifyTabDocument>
): doc is SanityShopifyProductTabDocument => doc._type === 'shopifyProduct'


export const isSanityTabCollection = (
  doc: Partial<SanityShopifyTabDocument>
): doc is SanityShopifyCollectionTabDocument => doc._type === 'shopifyCollection'


export const isShopifyProduct = (doc: Product | Collection): doc is Product =>
  doc.__typename === 'Product'

export const isShopifyCollection = (
  doc: Product | Collection
): doc is Collection => doc.__typename === 'Collection'
