import { Client, LogLevel } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  fetch: (url, options) => {
    console.log('FETCH LOGS', { url, options });
    return fetch(url, options);
  },
  logLevel: LogLevel.DEBUG,
  logger: (level, message, extraInfo) => {
    console.log('LOGGER LOGS', { level, message, extraInfo });
  },
});

const n2m = new NotionToMarkdown({ notionClient: notion });

class Notion {
  async getPosts(database_id: string) {
    return await notion.databases.query({
      database_id,
      sorts: [
        {
          property: 'published',
          direction: 'descending',
        },
      ],
      filter: {
        property: 'active',
        checkbox: {
          equals: true,
        },
      },
    });
  }

  async getPageInfo(page_id: string) {
    return await notion.pages.retrieve({ page_id });
  }

  async getPageContent(block_id: string) {
    return await notion.blocks.children.list({
      block_id,
    });
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
        ],
      },
    });

    return posts;
  }
}

export default Notion;
