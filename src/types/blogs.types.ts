export type Blog = {
  id: string;
  title: string;
  summary: string;
  slug: string;
  date: Date;
  publicationUrl?: string;
  canonicalUrl?: string;
  readTime: number;
  views: number;
  cover?: string;
  body: string;
};
