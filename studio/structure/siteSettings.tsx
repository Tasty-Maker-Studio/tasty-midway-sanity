import React from 'react';
import {MdSettingsApplications} from 'react-icons/md'
import S from '@sanity/desk-tool/structure-builder';

export const SiteSettingsMenu= S.listItem()
  .title('Settings')
  .icon(MdSettingsApplications)
  .child(
    S.editor()
      .id('siteSettings')
      .schemaType('siteSettings')
      .documentId('siteSettings'),
  );
