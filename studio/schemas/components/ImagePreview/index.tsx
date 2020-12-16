import React, {ChangeEvent} from 'react';
import PatchEvent, {set, unset, setIfMissing}  from 'part:@sanity/form-builder/patch-event';
import { withDocument } from "part:@sanity/form-builder"
import FormField from 'part:@sanity/components/formfields/default';
import { FormBuilderInput } from 'part:@sanity/form-builder';
import FieldSet from "part:@sanity/components/fieldsets/default";// Update value in Sanity


const createPatchFrom = (value) =>{
    console.log('createPatchFrom -- value =', value)
  PatchEvent.from(set(value));
}



const ImagePreview = React.forwardRef((props: any, incomingRef: React.Ref<HTMLInputElement>)  => {
    const { type, value, markers, level , onChange,  focusPath, onFocus, onBlur } = props;
    console.log('[ImagePreview]  -- type =', type );
     console.log('[ImagePreview]  -- value =', value );
    console.log('[ImageValuePreview]  -- focusPath =', focusPath )
    // console.log('[ImageValuePreview]  -- markers =', markers )
    // console.log('[ImageValuePreview]  -- level =', level );
    // const element  = {incomingRef};
    // console.log('[ImageValuePreview]  -- incomingRef as element =', element )

    const handleRootFocus = React.useCallback((event) => {
        console.log('[ImageValuePreview]  -handleRootFocus- event =', event )
        //if (event.currentTarget.element === incomingRef)
        onFocus()
    }, [])

    // const handleFieldChange = (event:ChangeEvent<HTMLInputElement>) => {
    //     // const { type, onChange } = this.props;
    //     console.log('[ImageValuePreview]  -- value =', value )
    //      console.log('[ImageValuePreview]  -- event =', event )
    //     console.log('[ImageValuePreview]  -- event.target.value =', event.target.value )
    //     // console.log('[ImagePreview]  -- field.name =', field.name )
    //     // console.log('[ImagePreview]  -- type.name =', type.name )
    //     // console.log('[ImagePreview]  -- fieldPatchEvent =', fieldPatchEvent )
    //     // console.log('[ImagePreview]  --  fieldPatchEvent.patches[0].value =', fieldPatchEvent.patches[0].value
    //     // const updatedNode = Object.assign({},{...value.node, altText: event.target.value});
    //     // console.log('[ImageValuePreview]  -- updatedNode =', updatedNode )
    //     // const updatedType = Object.assign( {},{...value, node:updatedNode})
    //     // console.log('[ImageValuePreview]  -- updatedType =', updatedType )
    //     onChange(createPatchFrom(event.target.value));
    // }
    const handleFieldChange = React.useCallback((field, fieldPatchEvent) => {
        console.log('handleFieldChange -- field =', field);
        console.log('handleFieldChange -- fieldPatchEvent =', fieldPatchEvent);
        onChange(fieldPatchEvent.prefixAll(field.name).prepend(setIfMissing({_type: type.name})))
    }, []);

    const formFieldType = type.fields[0];
    console.log('[ImageValuePreview]  -- formFieldType =', formFieldType )
    return (
            <FieldSet
              level={level}
              legend={type.title}
              description={type.description}
            >
               <img key={'imagePoPout-'+value._key} src={value.node.w300} alt={value.node.altText? value.node.altText : ' '}/>
               <div style={{ marginBottom: '1.5rem' }} key={'altText-'+value._key}>
                    <FormBuilderInput
                        level={level + 1}
                        type={formFieldType.type}
                        value={value && value.node[formFieldType.name]}
                        onChange={patchEvent => handleFieldChange(formFieldType, patchEvent)}
                        path={[formFieldType.name]}
                        focusPath={focusPath}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        ref={incomingRef}
                    />
                   {/*<FormField label={formFieldType.title}  description={formFieldType.description}>*/}
                   {/*        <input*/}
                   {/*            onChange={(event) => handleFieldChange(event)}*/}
                   {/*            value={value.node.altText?value.node.altText: ' '}*/}
                   {/*        />*/}
                   {/*</FormField>*/}
               </div>
            </FieldSet>
    );
});

export default withDocument(ImagePreview);
