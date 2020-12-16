import {
  SanityClientConfig,
  SanityShopifyTabDocument,
  SanityPair,
} from './sanity';
import {
  ShopifySecrets,
  Product,
  Collection,
  ShopifyItem,
  TestSecretsResponse,
} from './shopify';
import { SyncMachineState } from './syncState';

export interface Secrets {
  sanity: SanityClientConfig;
  shopify: ShopifySecrets;
}

export interface SaneShopifyConfig {
  secrets: Secrets;
  onStateChange?: (state: SyncMachineState) => void;
}

export interface SyncUtils {
  initialize: () => void;
  initialState: SyncMachineState;
  /* Syncs all items */
  syncAll: (cbs?: SubscriptionCallbacks) => Promise<void>;
  /* Syncs all products */
  syncProducts: (cbs?: SubscriptionCallbacks) => Promise<void>;
  /* Syncs all collections */
  syncCollections: (cbs?: SubscriptionCallbacks) => Promise<void>;
  /* Syncs a collection or product by storefront id */
  syncItemByID: (id: string, cbs?: SubscriptionCallbacks) => Promise<void>;
  /* Manage Secrets */
  saveSecrets: (secrets: ShopifySecrets) => Promise<void>;
  clearSecrets: () => Promise<void>;
  testSecrets: (secrets: ShopifySecrets) => Promise<TestSecretsResponse>;
}

// export interface SyncOperation {
//   type: 'create' | 'update' | 'delete' | 'skip'
//   sanityDocument: SanityShopifyDocument
//   shopifySource: Product | Collection
// }

export interface SyncOperation {
  type: 'create' | 'update' | 'delete' | 'skip';
  sanityDocument: SanityShopifyTabDocument;
  shopifySource: Product | Collection;
}

// export interface OperationComplete {
//   type: 'complete';
//   sanityDocument: SanityShopifyDocument;
//   shopifySource: Product | Collection;
// }


export interface OperationComplete {
  type: 'complete';
  sanityDocument: SanityShopifyTabDocument;
  shopifySource: Product | Collection;
}



interface SyncResult<OperationType> {
  operation: OperationType;
  related: ShopifyItem[];
}

export type SyncOperationResult = SyncResult<SyncOperation>;

// export interface LinkOperation {
//   type: 'link';
//   sourceDoc: SanityShopifyDocument;
//   pairs: SanityPair[];
// }

export interface LinkOperation {
  type: 'link';
  sourceDoc: SanityShopifyTabDocument;
  pairs: SanityPair[];
}

export interface FetchOperation {
  type: 'fetched';
  shopifyDocuments: Array<Collection | Product>;
}

//
// export interface ArchiveOperation {
//   type: 'archive';
//   sourceDoc: SanityShopifyDocument;
// }

export interface ArchiveOperation {
  type: 'archive';
  sourceDoc: SanityShopifyTabDocument;
}

export type Operation =
  | SyncOperation
  | LinkOperation
  | FetchOperation
  | ArchiveOperation;

export interface SubscriptionCallbacks {
  onProgress?: (operation: Operation, message?: string) => void;
  onError?: (err: Error) => void;
  onComplete?: (ops: OperationComplete[], message?: string) => void;
}
