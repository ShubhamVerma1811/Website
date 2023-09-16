<script>
  import { GITHUB_URL, LINKEDIN_URL, TWITTER_URL } from '$lib/constants';
  import GitHub from './Icons/GitHub.svelte';
  import Linkedin from './Icons/Linkedin.svelte';
  import Moon from './Icons/Moon.svelte';
  import Sun from './Icons/Sun.svelte';
  import Twitter from './Icons/Twitter.svelte';

  // import {
  //   DiagonalArrow,GitHub
  // } from "$lib/components/Icons";

  const headerLinks = [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'Blog',
      href: '/blog'
    },
    {
      name: 'Work',
      href: '/work'
    }
  ];
</script>

<header class="my-4 mb-12 rounded-md bg-skin-primary" id="header">
  <nav class="flex items-center">
    <div>
      {#each headerLinks as link}
        <a
          href={link.href}
          class={`text-md mr-2 cursor-pointer rounded-md bg-skin-primary p-2 text-skin-secondary transition-all hover:bg-skin-secondary-muted md:text-xl  umami--click--header-${link.name} `}>
          {link.name}
        </a>
      {/each}
    </div>
    <div class="ml-auto">
      <div class="flex flex-wrap items-center">
        <a
          target="_blank"
          href={TWITTER_URL}
          class=" umami--click--hero-twitter mr-1 w-max rounded-md p-2 text-lg text-[#1DA1F2] hover:bg-skin-secondary-muted"
          rel="noopener noreferrer">
          <Twitter />
        </a>
        <a
          target="_blank"
          href={GITHUB_URL}
          class="umami--click--hero-github mr-1 w-max rounded-md p-2 text-lg text-skin-secondary hover:bg-skin-secondary-muted"
          rel="noopener noreferrer">
          <GitHub />
        </a>
        <a
          target="_blank"
          href={LINKEDIN_URL}
          class="umami--click--hero-linkedin w-max rounded-md p-2 text-lg text-[#0a66c2] hover:bg-skin-secondary-muted dark:text-[#ffffffe6]"
          rel="noopener noreferrer">
          <Linkedin />
        </a>
        <button
          aria-label="Toggle dark mode"
          class="ml-1 rounded-md p-2 hover:bg-skin-secondary-muted"
          on:click={() => {
            document.body.classList.toggle('dark');
            // isDark.subscribe((v) => !v);
          }}>
          <!-- {isDark ? <Moon /> : <Sun />} -->

          <Moon />
          <!-- {#if isDark}
            {:else}
            <Sun />
          {/if} -->
        </button>
      </div>
    </div>
  </nav>
</header>
