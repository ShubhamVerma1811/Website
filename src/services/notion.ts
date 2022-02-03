import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

class Notion {
  async getPosts(database_id: string) {
    return await notion.databases.query({
      database_id,
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
}

export default Notion;
