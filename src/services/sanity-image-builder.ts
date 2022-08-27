import createImageUrlBuilder from '@sanity/image-url';
import { sanityConfig } from './sanity-config';

export const imageBuilder = createImageUrlBuilder({
  ...sanityConfig,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
});

// @ts-ignore
export const urlForImage = (source) =>
  imageBuilder.image(source).auto('format').fit('max');
