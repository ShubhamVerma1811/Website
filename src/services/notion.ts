import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import { remark } from 'remark';
import html from 'remark-html';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

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

  async getNotionToMarkdown(page_id) {
    const mdblocks = await n2m.pageToMarkdown(page_id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return this.markdownToHtml(mdString);
  }

  async markdownToHtml(markdown) {
    const result = await remark().use(html).process(markdown);
    return result.toString();
  }
}

export default Notion;
