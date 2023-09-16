<script lang="ts">
  import Card from '$lib/components/Blog/Card.svelte';
  export let data;
  export let { blogs } = data;
</script>

<p class="mb-6 font-secondary text-3xl font-extrabold text-skin-secondary">Blogs</p>
{#if blogs.length}
  {#each blogs as blog}
    <Card {blog} />
  {/each}
{:else}
  <div class="my-4 text-lg text-skin-primary dark:text-skin-primary-muted">No blogs found.</div>
{/if}
