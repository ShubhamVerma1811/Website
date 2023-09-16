<script lang="ts">
  import type { Blog } from '../../../types/blogs.types';

  export let blog: Blog;

  const d = new Date(blog.date);
  const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short'
  });
</script>

<a
  href={blog?.publicationUrl ? blog?.publicationUrl : `/blog/${blog?.slug}`}
  class={`umami--click--blog-${blog.slug}`}>
  <div
    class="my-4 cursor-pointer rounded-md bg-skin-secondary-muted p-3 transition-all hover:scale-[1.02]">
    <div class="flex items-center">
      <p class="text-xl text-skin-secondary">{blog.title}</p>
    </div>

    <p class="my-1 text-skin-primary-muted">
      {date}
      {#if blog.views}
        <span class="mx-3">•</span>
        {formatter.format(blog.views)} views
      {/if}
      {#if blog.publicationUrl}
        <a href={blog.publicationUrl}>
          <span class="text-md text-skin-secondary">
            <span class="mx-3">•</span>
            Publication
          </span>
        </a>
      {/if}
      {#if blog.readTime}
        <span class="mx-3">•</span>
        {blog.readTime} min read
      {/if}
    </p>
    {#if blog.summary}
      <p class="text-md truncate rounded-md text-skin-primary-muted">
        {blog.summary}
      </p>
    {/if}
  </div>
</a>
