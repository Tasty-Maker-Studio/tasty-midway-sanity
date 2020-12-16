import React from 'react';
// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import blockContent from './blockContent';
import blockText from './blockText';
import siteSettings from './siteSettings';

import * as objects from './objects';
import * as documents from './documents';
import * as modules from './modules';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    siteSettings,
    blockContent,
    blockText,

    ...Object.values(objects),
    ...Object.values(modules),
    ...Object.values(documents),
    /* Your types here! */
  ]),
});
