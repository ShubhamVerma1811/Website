<script lang="ts">
  import type { Talk } from '../../../types/talks.types';

  export let talk: Talk;
</script>

<a
  href={talk.url}
  target="_blank"
  rel="noopener noreferrer"
  class={`umami--click--talk-${talk.title.split(' ').join('-')}`}>
  <div
    class="my-4 cursor-pointer rounded-md bg-skin-secondary-muted p-3 transition-all hover:scale-[1.02]">
    <div class="flex items-center justify-between">
      <p class="text-xl text-skin-secondary">{talk.title}</p>
      {#if talk.time}
        <p class="ml-2 text-xl text-skin-secondary">{talk.time}</p>
      {/if}
    </div>
    {#if talk.description}
      <p class="my-1 text-skin-primary-muted">{talk.description}</p>
    {/if}
  </div>
</a>
