<script>
  import Blog from '$lib/components/Blog/Blog.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Talk from '$lib/components/Talks/Talk.svelte';
  export let data;
  const { blogs, talks } = data;
</script>

<Hero />
<Blog {blogs} />
<Talk {talks} />
