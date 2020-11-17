import gql from 'graphql-tag';
import { ShopifyClient, Product, Collection } from '../../../types/src';
import { ShopifyCache } from './shopifyUtils';
import { productFragment, collectionFragment } from './queryFragments';
import { fetchAllCollectionProducts } from './fetchShopifyCollection';
import { fetchAllProductCollections } from './fetchShopifyProduct';

export const NODE_QUERY = gql`
  query NodeQuery($id: ID!) {
    node(id: $id) {
      ... on Product {
        ...ProductFragment
        collections(first: 20) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
              handle
            }
          }
        }
      }
      ... on Collection {
        ...CollectionFragment
        products(first: 50) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            cursor
            node {
              id
              handle
            }
          }
        }
      }
    }
  }
  ${productFragment}
  ${collectionFragment}
`;

interface NodeResult {
  data?: {
    node?: Product | Collection;
  };
  errors?: Array<{
    message: string;
  }>;
}

export const createFetchItemById = (
  query: ShopifyClient['query'],
  cache: ShopifyCache,
) => async (
  id: string,
  fetchRelated: boolean,
): Promise<Product | Collection | null> => {
  console.log( '[sync-utils/shopify/ fetItemById.ts ]  id = ', id);
  const cached = cache.getCollectionById(id) || cache.getProductById(id);
  console.log( '[sync-utils/shopify/ fetItemById.ts ]  cached = ', cached);
  if (cached) return cached;
  console.log( '[sync-utils/shopify/ fetItemById.ts ]  query = ', query);
  const result = await query<NodeResult>(NODE_QUERY, { id });
  console.log( '[sync-utils/shopify/ fetItemById.ts ]  result = ', result);
  const item = result?.data?.node;
  console.log( '[sync-utils/shopify/ fetItemById.ts ]  item = ', item);
  if (result.errors) {
    console.log( '[sync-utils/shopify/ fetItemById ]  result.errors = ', result.errors);
    const messages = result.errors.map(({ message }) => message).join(' | ');
    throw new Error(messages);
  }
  if (!item) return null;
  if (!fetchRelated) return item;
  if (item.__typename === 'Product') {
    return fetchAllProductCollections(query, item);
  }
  if (item.__typename === 'Collection') {
    return fetchAllCollectionProducts(query, item);
  }
  // @ts-ignore
  throw new Error(`Cannot fetch item with typename ${item.__typename}`);
};
