import * as React from 'react';
import { FormBuilderInput } from 'part:@sanity/form-builder';
import {setIfMissing}  from 'part:@sanity/form-builder/patch-event';
import FieldSet from 'part:@sanity/components/fieldsets/default';

const ProductImagePreview = React.forwardRef(
  (props: any, inputComponent: React.Ref<HTMLInputElement>) => {
    const { type, value, level , onChange,  focusPath, onFocus, onBlur } = props;

    const handleFieldChange = React.useCallback((field, fieldPatchEvent) => {
      onChange(
        fieldPatchEvent
          .prefixAll(field.name)
          .prepend(setIfMissing({ _type: type.name })),
      );
    }, []);

    return (
      <FieldSet level={level} >
        <img
          key={'imageReview-' + value._key}
          src={value.w300}
          alt={value.altText ? value.altText : ' '}
        />
        {type.fields.map((field, index) => {
          if (!field.type.hidden) {
            return (
                <div style={{marginBottom: '1.5rem'}} key={'altText-' + index + value._key}>
                      <FormBuilderInput
                          key={index+field.name}
                          type={field.type}
                          value={value && value[field.name]}
                          onChange={(patchEvent) =>
                              handleFieldChange(field, patchEvent)
                          }
                          path={[field.name]}
                          focusPath={focusPath}
                          onFocus={onFocus}
                          onBlur={onBlur}
                          ref={ inputComponent }
                        />
                </div>
            )
          }
        })
        }
      </FieldSet>
    );
  }
);

export const shopifyProductImage = {
  name: 'shopifyProductImage',
  type: 'object',
  fields: [
    {
      name: 'cursor',
      type: 'string',
      hidden: true,
    },
    {
      title: 'altText',
      name: 'altText',
      type: 'string',
      description: 'Edit the Image\'s altText',
    },
    {
      title: 'id',
      name: 'id',
      type: 'string',
      hidden: true,
    },
    {
      title: 'originalSrc',
      name: 'originalSrc',
      type: 'string',
      hidden: true,
    },
    {
      title: 'w100',
      name: 'w100',
      type: 'string',
      hidden: true,
    },
    {
      title: 'w300',
      name: 'w300',
      type: 'string',
      hidden: true,
    },
    {
      title: 'w800',
      name: 'w800',
      type: 'string',
      hidden: true,
    },
    {
      title: 'w1200',
      name: 'w1200',
      type: 'string',
      hidden: true,
    },
    {
      title: 'w1600',
      name: 'w1600',
      type: 'string',
      hidden: true,
    },
  ],
  inputComponent: ProductImagePreview,
  preview: {
    select: {
      altText: 'altText',
      w300: 'w300',
      id:'id'
    },
    prepare: (props) => {
     //  console.log('[shopifyProductImage.tsx] -- props = ', props);
      return {
        key: props.id,
        title: props.altText !== undefined ? props.altText : '',
        imageUrl: props.w300,
      };
    },
  },
};
