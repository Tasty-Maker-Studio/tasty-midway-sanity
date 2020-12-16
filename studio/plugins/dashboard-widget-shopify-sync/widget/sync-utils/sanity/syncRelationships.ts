import PQueue from 'p-queue';
import { SanityClient} from "@sanity/client";
import {
  SanityUtils,
  LinkOperation,
  SanityReference,
  SanityPair,
  SanityShopifyTabDocument,
} from '../../types'
import { isSanityTabProduct, isSanityTabCollection } from '../typeGuards'

const arrayify = <T>(i: T | T[]) => (Array.isArray(i) ? i : [i])

const removeDraftId = (doc: SanityShopifyTabDocument): SanityShopifyTabDocument => ({
  ...doc,
  _id: doc._id.replace(/^drafts\./, ''),
})

export const createRemoveRelationships = (
  client: SanityClient
): SanityUtils['removeRelationships'] => async (
  from: SanityShopifyTabDocument,
  toRemove: SanityShopifyTabDocument | SanityShopifyTabDocument[]
): Promise<null> => {
  const related: SanityReference[] | undefined = isSanityTabProduct(from)
    ? from.content.main.collectionKeys
    : isSanityTabCollection(from)
    ? from.content.main.productKeys
    : []

  if (!related) throw new Error('No related docs were provided')
  const relationshipsToRemove = arrayify(toRemove)
    .map((itemToRemove) =>
      related.find((reference) => reference._ref === itemToRemove._id)
    )
    .map((reference) =>
      reference && isSanityTabProduct(from)
        ? `content.main.collections[_key=="${reference._key}"]`
        : reference && isSanityTabCollection(from)
        ? `content.main.products[_key=="${reference._key}"]`
        : ''
    )
    .filter(Boolean)

  await client.patch(from._id).unset(relationshipsToRemove).commit()
  return null
}

export const createSyncRelationships = (
  client: SanityClient
): SanityUtils['syncRelationships'] => async (
  from: SanityShopifyTabDocument,
  to: SanityShopifyTabDocument | SanityShopifyTabDocument[]
): Promise<LinkOperation> => {
  const toDocs = arrayify(to).map(removeDraftId)
  const existingRelationships: SanityShopifyTabDocument[] = isSanityTabProduct(from)
    ? from?.content?.main?.sourceData?.collections?.edges || []
    : isSanityTabCollection(from)
    ? from?.content?.main?.sourceData?.products?.edges  || []
    : []

  // determine if the FROM doc already has the
  // links in place. If so, skip the patch.
  const alreadyLinked =
    toDocs.length === existingRelationships.length &&
    toDocs.every((toDoc, index) =>
      Boolean(
        // @ts-ignore
        existingRelationships[index] &&
          existingRelationships[index].shopifyId === toDoc.shopifyId
      )
    )

  if (alreadyLinked) {
    return {
      type: 'link',
      sourceDoc: from,
      pairs: toDocs.map((toDoc) => ({ from, to: toDoc })),
    }
  }

  const newLinks = toDocs.filter(
    (toDoc) =>
      !Boolean(
        // @ts-ignore
        existingRelationships.find((er) => toDoc.shopifyId === er.shopifyId)
      )
  )

  const aToBRelationships = toDocs.map((toDoc) => {
    return {
      _type: 'reference',
      _ref: toDoc._id,
      _key: `${toDoc._rev}-${toDoc._id}`,
      // title: toDoc.content.main.title,
      // handle: toDoc.content.main.handle,
      // images: isSanityTabProduct(toDoc)? toDoc.content.main.images.edges[0].node.w300 : toDoc.content.main.image.w300,
    }
  });



  const aToBPatchKey =
    from._type === 'shopifyProduct' ? 'content.main.collections' : 'content.main.products'

  await client
    .patch(from._id)
    .set({ [aToBPatchKey]: aToBRelationships })
    .commit()

  const relationshipsToRemove = existingRelationships.reduce<
    SanityShopifyTabDocument[]
  >((acc, item) => {
    if (item?.content?.main?.archived === true || item?.shopifyId === null) {
      return [...acc, item]
    }
    if (acc.find((i) => i._id === item._id)) {
      return [...acc, item]
    }
    return acc
  }, [])

  if (relationshipsToRemove.length) {
    const removeRelationships = createRemoveRelationships(client)
    await removeRelationships(from, relationshipsToRemove)
  }

  const bToAKey = from._type === 'shopifyProduct' ? 'content.main.products' : 'content.main.collections'

  // Set all reverse relationships
  const rQueue = new PQueue({ concurrency: 1 })

  const pairs: SanityPair[] = await rQueue.addAll(
    newLinks
      .reduce<SanityShopifyTabDocument[]>((acc, toDoc) => {
        if (acc.find((t) => t === toDoc)) return acc
        return [...acc, toDoc]
      }, [])
      .map((toDoc) => async () => {
        const pair = {
          from: from,
          to: toDoc,
        }

        client
          .patch(toDoc._id)
          .setIfMissing({ [bToAKey]: [] })
          .append(bToAKey, [
            {
              _type: 'reference',
              _ref: from._id,
              key: `${from._id}-${from._rev}`,
            },
          ])
        return pair
      })
  )

  const linkOperation: LinkOperation = {
    type: 'link' as 'link',
    sourceDoc: from,
    pairs,
  }

  return linkOperation
}
