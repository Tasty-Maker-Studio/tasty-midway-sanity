declare module '@sanity/desk-tool/structure-builder';
declare module 'part:@sanity/base/schema-creator';
declare module 'part:@sanity/base/client';
declare module 'part:@sanity/form-builder';
declare module 'part:@sanity/form-builder/input/video-embed/schema';
declare module 'part:sanity-plugin-media/asset-source';
declare module 'all:part:@sanity/base/schema-type';
declare module 'part:@sanity/components/buttons/default';
declare module 'part:@sanity/components/lists/sortable';
declare module '*.css';
declare module '*.svg';

declare module '@sanity/validation' {
  class Rule {
    _typeDef: Rule;
    required(): Rule;
    max(arg: number): Rule;
    min(arg: number): Rule;
    custom(
      arg: (
        arg: any,
        context: any,
      ) => boolean | string | Promise<boolean | string>,
    ): Rule;
  }
}
