export type Blogs = {
  id: string;
  title: string;
  description: string;
  slug: string;
  publishedAt: Date;
  publicationUrl?: string;
  canonicalUrl?: string;
  readTime: number;
};

export type Blog = Blogs & {
  markdown: string;
  views: number;
};
