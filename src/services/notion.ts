import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { Blog, Blogs } from 'types';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

class Notion {
  async getPosts(): Promise<Array<Blogs>> {
    const posts = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_DATABASE_ID as string,
      sorts: [
        {
          property: 'published',
          direction: 'descending',
        },
      ],
      filter: {
        and: [
          {
            property: 'active',
            checkbox: {
              equals: true,
            },
          },
          {
            property: 'environment',
            multi_select: {
              contains: process.env.NOTION_ENVIRONMENT as string,
            },
          },
        ],
      },
    });

    // @ts-ignore
    const blogs: Array<Blogs> = posts.results?.map((post: any) => {
      return {
        id: post.id,
        title: post?.properties?.name?.title?.[0].plain_text,
        description: post?.properties?.subtitle?.rich_text[0]?.plain_text || '',
        slug: post?.properties?.slug?.rich_text[0]?.plain_text,
        publishedAt: post?.properties?.published?.date?.start ?? '2020-09-14',
        readTime: 2,
        isPublication: Math.random() > 0.5,
      };
    });

    return blogs;
  }

  // / Get a Notion database page info by ID
  async getPageInfo(page_id: string): Promise<Blog> {
    // @ts-ignore
    const page: any = await notion.pages.retrieve({ page_id });

    const blog: Blog = {
      id: page.id,
      title: page?.properties?.name?.title?.[0].plain_text,
      description: page?.properties?.subtitle?.rich_text[0]?.plain_text || '',
      slug: page?.properties?.slug?.rich_text[0]?.plain_text,
      publishedAt: page?.properties?.published?.date?.start ?? '2020-09-14',
      readTime: 2,
      views: page?.properties?.views?.number,
      markdown: await this.getMakrkdown(page.id),
    };

    return blog;
  }

  async getPageContent(block_id: string) {
    const baseQuery = {
      block_id: block_id,
      page_size: 100,
    };
    let results = [];
    let postContent = await notion.blocks.children.list(baseQuery);

    results = [...postContent.results];

    while (postContent.has_more && postContent.next_cursor) {
      postContent = await notion.blocks.children.list({
        ...baseQuery,
        start_cursor: postContent.next_cursor,
      });
      results = [...results, ...postContent.results];
    }

    return results;
  }

  async getMakrkdown(page_id: string) {
    const mdblocks = await n2m.pageToMarkdown(page_id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return mdString;
  }

  async getPostsByTagName(tagName: string) {
    const posts = await notion.databases.query({
      database_id: '914232ab-7e40-448b-bfc4-ddade4d4ccde',
      filter: {
        and: [
          {
            property: 'tags',
            multi_select: {
              contains: tagName,
            },
          },
          {
            property: 'environment',
            multi_select: {
              contains: process.env.NOTION_ENVIRONMENT as string,
            },
          },
        ],
      },
    });

    return posts;
  }

  async updateViews(page_id: string) {
    const view =
      // @ts-ignore

      (await this.getPageInfo(page_id))?.properties?.views?.number ?? 0;

    const page = await notion.pages.update({
      page_id,
      properties: {
        views: {
          number: view + 1,
        },
      },
    });

    // @ts-ignore
    return page?.properties?.views?.number;
  }
}

export default Notion;
