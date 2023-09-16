import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { join } from 'path';

const dir = join(process.cwd(), './src/lib/layouts');

const layout = join(dir, '/MDXLayout.svelte');

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool'
  },

  remarkPlugins: [],
  rehypePlugins: [],
  layout
});

export default config;
