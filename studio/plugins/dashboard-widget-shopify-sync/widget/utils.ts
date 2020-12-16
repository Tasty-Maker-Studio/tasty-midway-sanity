import { SanityDocumentConfig, SanityField } from './types'

interface Fields {
  additionalFields: SanityField[]
  namedFields: {
    [key: string]: Partial<SanityField>
  }
}

export const getFieldConfig = (
  fields: SanityDocumentConfig['fields'] = [],
  fieldNames: string[] = []
): Fields => {
  const namedFields = fieldNames.reduce((acc, name) => {
    const fieldConfig = fields.find((f) => f.name === name) || {}
    return {
      ...acc,
      [name]: fieldConfig,
    }
  }, {})
  const additionalFields = fields.filter(
    (field) => !fieldNames.includes(field.name)
  )
  return { namedFields, additionalFields }
}


type Primitive =
| string
| Function
| number
| boolean
| Symbol
| undefined
| null;

type DeepOmitArray<T extends any[], K> = {
  [P in keyof T]: DeepOmit<T[P], K>;
};

export type DeepOmit<T, K> = T extends Primitive
  ? T
  : {
    [P in Exclude<keyof T, K>]: T[P] extends infer TP
      ? TP extends Primitive
        ? TP // leave primitives and functions alone
        : TP extends any[]
          ? DeepOmitArray<TP, K> // Array special handling
          : DeepOmit<TP, K>
      : never;
  };
