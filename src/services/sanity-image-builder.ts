import createImageUrlBuilder from '@sanity/image-url';
import { sanityConfig } from './sanity-config';

const config = {
  ...sanityConfig
};

export const imageBuilder = createImageUrlBuilder(config);

// @ts-ignore
export const urlForImage = (source) =>
  imageBuilder.image(source).auto('format').fit('max');
