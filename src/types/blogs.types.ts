export type Blogs = {
  id: string;
  title: string;
  description: string;
  slug: string;
  publishedAt: Date;
  publicationUrl?: string;
  canonicalUrl?: string;
  readTime: number;
  views: number;
  thumbnail?: string;
};

export type Blog = Blogs & {
  markdown: string;
};
