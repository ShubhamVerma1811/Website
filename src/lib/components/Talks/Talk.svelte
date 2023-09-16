<script lang="ts">
  import Card from './Card.svelte';
  import type { Talk } from '../../../types/talks.types';

  export let talks: Array<Talk>;
</script>

<section class="my-12 scroll-m-20" id="top-blogs">
  <a href="#top-blogs">
    <p class="mb-3 font-secondary text-2xl font-bold text-skin-secondary">Talks</p>
  </a>
  {#each talks as talk}
    <Card {talk} />
  {/each}
</section>
