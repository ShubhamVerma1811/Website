import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
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
}

export default Notion;
