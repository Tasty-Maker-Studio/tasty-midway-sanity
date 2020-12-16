import { SanityClient } from '@sanity/client';
import {
  SanityShopifyTabDocument,
  SanityFetchParams,
} from '../../types'
import { SanityCache } from './sanityUtils'

const defaultParams = {
  types: ['shopifyCollection', 'shopifyProduct'],
}

export const createFetchAll = (
  client: SanityClient,
  cache: SanityCache
) => async (params?: SanityFetchParams): Promise<SanityShopifyTabDocument[]> => {
// ) => async (params?: SanityFetchParams): Promise<SanityShopifyDocument[]> => {
  // const p = params ?? defaultParams
  // const types = p.types ?? defaultParams.types
  const types = params && params.types ? params.types : defaultParams.types
  const typesFilter = types.map((type) => `_type == '${type}'`).join(' || ')

  const allDocs = await client.fetch<SanityShopifyTabDocument[]>(`
  *[
    shopifyId != null &&
    (${typesFilter})
   ]{
      collections[]->,
      products[]->,
      "collectionKeys": collections[]{
        ...
      },
      "productKeys": products[]{
        ...
      },
     ...,
    }
  `)
  allDocs.forEach((doc) => cache.set(doc))
  return allDocs
}
