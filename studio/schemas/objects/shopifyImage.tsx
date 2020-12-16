import * as React from 'react';
import { Paginated } from '@good-idea/unwind-edges';
import { ShopifyImage } from '../../plugins/dashboard-widget-shopify-sync/widget/types';
import { definitely } from '../../plugins/dashboard-widget-shopify-sync/widget/sync-utils';
import FieldSet from 'part:@sanity/components/fieldsets/default';
import { FormBuilderInput, PatchEvent } from 'part:@sanity/form-builder';
import {
  setIfMissing,
  set,
  unset,
} from 'part:@sanity/form-builder/patch-event';

export interface ImagesPreviewProps {
  value: Paginated<ShopifyImage>;
}

const ImagesPreview = (props: ImagesPreviewProps) => {
  // console.log('ImagesView props =', props)
 // definitely(props.value.edges).map((edge, index) => console.log('edge[index] =',edge._key));
  return (
    <>
      {definitely(props.value.edges).map((edge, index) => (
           <img
             key={edge?._key || 'some-key'}
             src={edge?.node?.w100}
             alt={edge?.node?.altText}
           />
         )
      )}
    </>
  );
};

const ImagePreview = (props: ShopifyImage) => {
  console.log('Image-preview --- props =', props)
  return <img src={props.w300} alt={props.altText || undefined} />;
};


const ImagePopupPreview = React.forwardRef((props: any, ref: React.Ref<HTMLImageElement>)  => {
  return <img
      ref={ref} src={props.value.w300} alt={props.value.altText || undefined} />;
});

const ImageValuePreview = React.forwardRef((props: ShopifyImage, incomingRef: React.Ref<HTMLImageElement>)  => {
  const { type, value, markers, level , focusPath, onFocus, onBlur } = props;
  console.log('[ImageValuePreview]  -- type =', type )
  console.log('[ImageValuePreview]  -- value =', value )
  // console.log('[ImageValuePreview]  -- markers =', markers )
  // console.log('[ImageValuePreview]  -- level =', level );


  const handleFieldChange = async (field, fieldPatchEvent) => {
    const { type, onChange } = this.props;
    console.log('[ImageValuePreview]  -- handleFieldChange  field =', field)
    console.log('[ImageValuePreview]  -- handleFieldChange  type =', type)
     console.log('[ImageValuePreview]  -- handleFieldChange  onChange =', onChange)
  }

  const focus= () => {
    console.log(' focuse fired');
  }

  return (
      <FieldSet
          legend={type.image}
          escription={type.altText}
          markers={markers}
          level={level}
      >
             <img src={value.w300} alt={value.altText? value.altText : ' '} />
              {type.fields.map((field, index) => {
                console.log('--- field -', field);
                if(!field.hidden){
                  return (
                      <div style={{ marginBottom: '1.5rem' }} key={field.name}>
                        <FormBuilderInput
                            level={level + 1}
                            type={field.type}
                            value={value && value[field.name]}
                            onChange={patchEvent => handleFieldChange(field, patchEvent)
                            }
                            path={[field.name]}
                            focusPath={focusPath}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            ref={incomingRef}
                        />
                      </div>
                  );
                }
              })}
      </FieldSet>
  );
});

export const imageEdge = {
  title: 'Image Edge',
  name: 'shopifySourceImageEdge',
  type: 'object',
  fields: [
    { type: 'string', name: 'key', title: 'Key' },
    { type: 'string', name: 'cursor', title: 'Key' },
    { type: 'shopifySourceImage', name: 'node', title: 'Node' },
  ],
};

export const shopifyImages = {
  title: 'Images',
  name: 'shopifySourceImages',
  type: 'object',
  inputComponent: ImagesPreview,
  fields: [
    {
      title: 'edges',
      name: 'edges',
      sortable: true,
      type: 'array',
      of: [
        {
          type: 'shopifySourceImageEdge',
        },
      ],
    },
  ],
};

export const shopifyEdgeNode ={
  title: 'Pro Image',
  name: 'shopifyEdgeNode',
  type: 'object',
  fields: [
    {
      name: 'node',
      type: 'shopifySourceImage',
    }
   ],
  inputComponent: ImagePreview,
}


export const shopifyImage = {
  title: 'Image',
  name: 'shopifySourceImage',
  type: 'object',
  inputComponent: ImagePreview,
  fields: [
    {
      name: 'cursor',
      type: 'string',
      hidden: true,
    },
    {
      title: 'Position',
      name: 'position',
      type: 'number',
    },
    {
      title: 'altText',
      name: 'altText',
      type: 'string',
    },
    {
      title: 'id',
      name: 'id',
      type: 'string',
    },
    {
      title: 'originalSrc',
      name: 'originalSrc',
      type: 'string',
    },
    {
      title: 'w100',
      name: 'w100',
      type: 'string',
    },
    {
      title: 'w300',
      name: 'w300',
      type: 'string',
    },
    {
      title: 'w800',
      name: 'w800',
      type: 'string',
    },
    {
      title: 'w1200',
      name: 'w1200',
      type: 'string',
    },
    {
      title: 'w1600',
      name: 'w1600',
      type: 'string',
    },
  ]
};

export const imageSourceEdge = {
  title: 'Image Edge',
  name: 'shopifyImageSourceEdge',
  type: 'object',
  fields: [
    { type: 'string', name: 'key', title: 'Key' },
    { type: 'string', name: 'cursor', title: 'Key' },
    { type: 'shopifyValueSourceImage', name: 'node', title: 'Node' },
  ],
  preview: {
    select: {
      node: 'node',
    },
    prepare: ({ node }) => {
      return {
        title: node.altText !== undefined ? node.altText : '',
        imageUrl: node.w300,
      };
    },
  },
  validation: (Rule) => Rule.unique(),
};

export const shopifyValueImage = {
  name: 'shopifyValueSourceImage',
  type: 'object',
  fields: [
    {
      name: 'cursor',
      type: 'string',
      hidden: true,
    },
    {
      title: 'Position',
      name: 'position',
      type: 'number',
    },
    {
      title: 'altText',
      name: 'altText',
      type: 'string',
    },
    {
      title: 'id',
      name: 'id',
      type: 'string',
    },
    {
      title: 'originalSrc',
      name: 'originalSrc',
      type: 'string',
    },
    {
      title: 'w100',
      name: 'w100',
      type: 'string',
    },
    {
      title: 'w300',
      name: 'w300',
      type: 'string',
    },
    {
      title: 'w800',
      name: 'w800',
      type: 'string',
    },
    {
      title: 'w1200',
      name: 'w1200',
      type: 'string',
    },
    {
      title: 'w1600',
      name: 'w1600',
      type: 'string',
    },
  ],
};
