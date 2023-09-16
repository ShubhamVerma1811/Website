<script lang="ts">
  import Card from './Card.svelte';

  export let blogs: any;
</script>

<section class="my-12 scroll-m-20" id="top-blogs">
  <a href="#top-blogs">
    <p class="mb-3 font-secondary text-2xl font-bold text-skin-secondary">Top Blogs</p>
  </a>
  {#each blogs as blog}
    <Card {blog} />
  {/each}
  <a href="/blog" class="cursor-pointer pb-1 font-bold text-skin-secondary hover:border-b">
    Read all posts
    <!-- <RightArrow class='ml-2 inline-block' /> -->
  </a>
</section>
