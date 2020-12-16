/**
 * Sanity Config
 */

export interface SanityField {
  title: string
  name: string
  type: string
  fields?: [SanityField]
}

export interface SanityDocumentConfig {
  fields?: SanityField[]
  [key: string]: any
}
