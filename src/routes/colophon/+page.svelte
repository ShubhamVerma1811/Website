<script>
  import DiagonalArrow from '$lib/components/Icons/DiagonalArrow.svelte';
  import { TWITTER_URL } from '$lib/constants';

  const refs = [
    {
      site: 'Leerob.io',
      by: 'Lee',
      url: 'https://leerob.io',
      twitter: 'https://twitter.com/leeerob/'
    },
    {
      site: 'nikolovlazar.com',
      by: 'Lazar',
      url: 'https://nikolovlazar.com',
      twitter: 'https://twitter.com/nikolovlazar'
    },
    {
      site: 'dpnkr.in',
      by: 'Deepankar',
      url: 'https://dpnkr.in',
      twitter: 'https://twitter.com/DeepankarBhade'
    },
    {
      site: 'nirmalyaghosh.com',
      by: 'NirmalyaGhosh_',
      url: 'https://nirmalyaghosh.com',
      twitter: 'https://twitter.com/NirmalyaGhosh_'
    }
  ];
</script>

<p class="mb-6 font-secondary text-3xl font-extrabold text-skin-secondary">Colophon</p>
<p class="mb-4 text-lg text-skin-secondary">
  This website is developed by{' '}
  <a
    href={TWITTER_URL}
    target="_blank"
    rel="noopener noreferrer"
    class="inline text-skin-accent underline-offset-4 hover:underline">
    Shubham Verma
    <DiagonalArrow
      props={{
        class: 'inline-block'
      }} />
  </a>
</p>
<p class="text-lg text-skin-secondary">
  The tech stack is{' '}
  <a
    href="https://nextjs.com"
    class="text-skin-accent underline-offset-4 hover:underline"
    target="_blank"
    rel="noopener noreferrer">
    NextJS
  </a>{' '}
  (SSG for all and ISR for blogs),{' '}
  <a
    href="https://github.com/hashicorp/next-mdx-remote"
    class="text-skin-accent underline-offset-4 hover:underline"
    target="_blank"
    rel="noopener noreferrer">
    MDX(Next MDX Remote)
  </a>
  ,{' '}
  <a
    href="https://tailwindcss.com"
    class="text-skin-accent underline-offset-4 hover:underline"
    target="_blank"
    rel="noopener noreferrer">
    Tailwind CSS
  </a>
  , and{' '}
  <a
    href="https://sanity.io"
    class="text-skin-accent underline-offset-4 hover:underline"
    target="_blank"
    rel="noopener noreferrer">
    Sanity
  </a>{' '}
  as CMS, and it&apos;s hosted on{' '}
  <a
    class="text-skin-accent underline-offset-4 hover:underline"
    target="_blank"
    rel="noopener noreferrer"
    href="https://vercel.com">
    Vercel
  </a>
  .
</p>
<p class="my-4 text-lg text-skin-secondary">
  <a
    class="text-skin-accent underline-offset-4 hover:underline"
    target="_blank"
    rel="noopener noreferrer"
    href="https://umami.is">
    Umami
  </a>{' '}
  is used for analytics. It&apos;s a self hosted analytics platform.
</p>
<p class="my-4 text-lg text-skin-secondary">
  Everything is Open Source 💖
  <br /> The source code is available on{' '}
  <a
    class="text-skin-accent underline-offset-4 hover:underline"
    target="_blank"
    rel="noopener noreferrer"
    href="https://github.com/ShubhamVerma1811/Website">
    GitHub
  </a>
</p>

<p class="mb-1 text-skin-primary-muted">
  This website is built by talking the following sites as references. Do check them out.
</p>

<ul>
  {#each refs as { site, by, url, twitter }, index}
    <li class="text-lg text-skin-secondary">
      {site} <span class="text-skin-primary-muted">by</span>{' '}
      <a
        class="text-skin-accent underline-offset-4 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        href={twitter}>
        {by}
        <DiagonalArrow
          props={{
            class: 'inline-block'
          }} />
      </a>
    </li>
  {/each}
</ul>
