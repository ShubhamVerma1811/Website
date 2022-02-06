import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

class Notion {
  async getPosts(database_id: string) {
    const post = await notion.databases.query({
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

    // this.posts = post

    // while(post.has_more) {
    //   const next = await notion.databases.query({
    //     database_id,
    //     start_cursor: post?.next_cursor,
    //   });
    // }

    return post;
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
