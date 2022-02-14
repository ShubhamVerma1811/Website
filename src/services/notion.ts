import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

class Notion {
  async getPosts() {
    return await notion.databases.query({
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
  }

  // / Get a Notion database page info by ID
  async getPageInfo(page_id: string) {
    return await notion.pages.retrieve({ page_id });
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

  async updateViews(page_id: string, views: number) {
    const page = await notion.pages.update({
      page_id,
      properties: {
        views: {
          number: views + 1,
        },
      },
    });

    // @ts-ignore
    return page?.properties?.views?.number;
  }
}

export default Notion;
