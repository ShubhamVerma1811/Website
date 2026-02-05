export const sanityConfig = {
  dataset: process.env.SANITY_DATASET || 'dev',
  projectId: process.env.SANITY_PROJECT_ID!,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-03-25',
  token: process.env.SANITY_API_TOKEN
};
