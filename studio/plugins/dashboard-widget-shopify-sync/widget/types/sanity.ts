import {
  Product,
  Collection,
  MoneyV2,
  SelectedOption,
  ShopifyImage,
  ShopifyItem,
  Variant,
  ShopifySecrets,
} from './shopify';
import { LinkOperation, SyncOperation } from './main';
import { Paginated } from '@good-idea/unwind-edges';

export interface SanityPair {
  from: SanityShopifyTabDocument;
  to: SanityShopifyTabDocument;
}

/**
 * Types that are shared between the plugin, the hooks server, and the syncing client.
 *
 * Types for the Sanity Desk Tool should go in the sanity-plugin directory.
 */
export interface SanityClientConfig {
  projectId: string;
  dataset: string;
  authToken?: string;
}

export interface SanityDocument {
  _id: string;
  _type: string;
  [key: string]: any;
}

export type SanityArray<T> = Array<T & { _key: string }>;

export interface SanityReference {
  _key: string;
  _ref: string;
  _type: 'reference';
}

// returned by prepareDpcument()
export type SanityShopifyTabDocumentPartial =
  | SanityShopifyTabProductDocumentPartial
  | SanityShopifyTabCollectionDocumentPartial;


export type SanityShopifyTabProductDocumentPartial = Omit<
  SanityShopifyProductTabDocument,
  '_id'|'collections'
  >;

export type SanityShopifyTabCollectionDocumentPartial = Omit<
  SanityShopifyCollectionTabDocument,
  '_id'| 'products'
  >;

export interface SanityShopifyProductOptionValue {
  _key: string;
  value: string;
}

export interface SanityShopifyProductOption {
  shopifyOptionId: string;
  name: string;
  values: SanityArray<SanityShopifyProductOptionValue>;
}

export interface SanityBlockTextChild {
  _type: 'span';
  marks: [];
  text: string;
}
export interface BlockTextChild {
  _type: 'span';
  marks: [];
  text: string;
}
export interface BlockText {
  _type: 'block';
  style: 'normal';
  children: BlockTextChild[];
  markDefs: [];
}



export interface SanityShopifyProductVariant {
  _type?: string;
  _key?: string;
  id: string;
  shopifyVariantID: string;
  availableForSale?: boolean;
  title: string;
  image?: ShopifyImage;
  listPosition?: number;
  selectedOptions?: SelectedOption[];
  sourceData: Variant;
  price?: string;
  priceV2?: MoneyV2;
  compareAtPriceV2?: MoneyV2;
  weight?: number;
  weightUnit?: string;
}

export interface MainProductSanity {
  shopifyId: string;
  title: string;
  customTitle: string;
  handle: string;
  archived?: boolean;
  minVariantPrice?: number;
  maxVariantPrice?: number;
  description: string;
  descriptionHtml: BlockText[];
  tags: string[];
  productType?: string;
  sourceData: Product;
  images: SanityArray<ShopifyImage>;
  collections: SanityShopifyCollectionTabDocument[];
  collectionKeys?: SanityReference[];
  options?: SanityArray<SanityShopifyProductOption>;
  variants?: SanityArray<SanityShopifyProductVariant>;
}

export type SanityShopifyTabs = {
  main: MainProductSanity ;
  shopify: Product;
}
export type SanityShopifyTabsSansCollections = {
  main: Omit<MainProductSanity, 'collections'>;
  shopify: Product;
}

export interface SanityShopifyProductTabDocument {
  _id: string;
  _rev?: string;
  _type: string;
  _ref?: string;
  _key?: string;
  shopifyId: string;
  content: | SanityShopifyTabsSansCollections |  SanityShopifyTabs;
}

export interface MainCollectionSanity {
  shopifyId: string;
  title: string;
  customTitle: string;
  handle: string;
  archived?: boolean;
  image?: ShopifyImage;
  sourceData: Collection;
  products: SanityShopifyProductTabDocument[];
  productKeys?: SanityReference[];
}

export type SanityShopifyCollectionTabs ={
  main: MainCollectionSanity;
  shopify: Collection;
}
export type SanityShopifyCollectionTabsSansProducts ={
  main: Omit<MainCollectionSanity, 'products'>;
  shopify: Collection;
}
export interface SanityShopifyCollectionTabDocument {
  _id: string;
  _rev?: string;
  _type: string;
  _ref?: string;
  _key?: string;
  shopifyId: string;
  content: SanityShopifyCollectionTabs | SanityShopifyCollectionTabsSansProducts;
}

// SanityShopifyDocument
export type SanityShopifyTabDocument =
  | SanityShopifyProductTabDocument
  | SanityShopifyCollectionTabDocument;

export interface SanityFetchParams {
  types?: string[];
}

export interface SanityUtils {
  syncSanityDocument: (item: Product | Collection) => Promise<SyncOperation>;
  syncRelationships: (
    from: SanityShopifyTabDocument,
    to: SanityShopifyTabDocument | SanityShopifyTabDocument[],
  ) => Promise<LinkOperation>;
  removeRelationships: (
    from: SanityShopifyTabDocument,
    toRemove: SanityShopifyTabDocument | SanityShopifyTabDocument[],
  ) => Promise<null>;
  fetchRelatedDocs: (related: ShopifyItem[]) => Promise<RelatedPairPartial[]>;
  fetchAllSanityDocuments: (
    params?: SanityFetchParams,
  ) => Promise<SanityShopifyTabDocument[]>;
  documentByShopifyId: (shopifyId: string) => Promise<SanityShopifyTabDocument>;
  documentByHandle: (
    handle: string,
    type: string,
  ) => Promise<SanityShopifyTabDocument>;
  archiveSanityDocument: (
    doc: SanityShopifyTabDocument,
  ) => Promise<SanityShopifyTabDocument>;
  saveSecrets: (secrets: ShopifySecrets) => Promise<void>;
  clearSecrets: () => Promise<void>;
  fetchSecrets: () => Promise<ShopifySecrets>;
}
// TODO: This kept coming up as undefined in the test store..
// export enum OperationType {
//   Create = 'create',
//   Update = 'update',
//   Delete = 'delete',
//   Skip = 'skip',
//   Link = 'link'
// }

export interface RelatedPair {
  shopifyNode: ShopifyItem;
  sanityDocument: SanityShopifyTabDocument;
}

export interface RelatedPairPartial {
  shopifyNode: ShopifyItem | null;
  sanityDocument: SanityShopifyTabDocument | null;
}
