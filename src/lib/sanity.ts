import { NODE_ENV, SANITY_API_TOKEN, SANITY_DATASET, SANITY_PROJECT_ID } from '$env/static/private';
import { createClient } from '@sanity/client';

export const sanityConfig = {
  dataset: SANITY_DATASET || 'dev',
  projectId: SANITY_PROJECT_ID,
  useCdn: NODE_ENV === 'production',
  apiVersion: '2021-03-25',
  token: SANITY_API_TOKEN
};

export const sanityClient = createClient(sanityConfig);
