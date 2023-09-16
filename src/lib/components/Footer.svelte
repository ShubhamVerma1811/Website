<script>
  import { GITHUB_URL, INSTAGRAM_URL, LINKEDIN_URL, TWITTER_URL } from '$lib/constants';

  const footerLinks = {
    site: [
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
      },
      {
        name: 'Craft',
        href: '/craft'
      },
      {
        name: 'Colophon',
        href: '/colophon'
      },
      {
        name: 'Socials',
        href: '/socials'
      }
    ],
    social: [
      {
        name: 'GitHub',
        href: GITHUB_URL
      },
      {
        name: 'Twitter',
        href: TWITTER_URL
      },
      {
        name: 'LinkedIn',
        href: LINKEDIN_URL
      },
      {
        name: 'Instagram',
        href: INSTAGRAM_URL
      }
    ],
    misc: [
      {
        name: 'Uses',
        href: '/uses'
      },
      {
        name: 'RSS',
        href: '/rss.xml',
        csr: true
      },
      {
        name: 'Sitemap',
        href: '/sitemap.xml',
        csr: true
      }
    ]
  };
</script>

<footer class="body-font mt-4 bg-skin-primary">
  <hr class="my-4 border-skin-primary-muted" />

  <!-- <NowPlaying /> -->

  <hr class="my-4 border-skin-primary-muted" />

  <div class="flex flex-col md:flex-row md:justify-between">
    <div>
      <ul>
        {#each footerLinks.site as link, index}
          <li
            class={`my-2 w-max cursor-pointer list-none text-skin-secondary hover:underline hover:underline-offset-4 umami--click--footer-${link.name}`}>
            <a href={link.href}>
              {link.name}
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <div>
      <ul>
        <!-- get socials from footerLinks -->

        {#each footerLinks.social as link, index}
          <li
            class={`my-2 w-max cursor-pointer list-none text-skin-secondary hover:underline hover:underline-offset-4 umami--click--footer-${link.name}`}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <div>
      <ul>
        {#each footerLinks.misc as link, index}
          <li
            class={`my-2 w-max cursor-pointer list-none text-skin-secondary hover:underline hover:underline-offset-4 umami--click--footer-${link.name}`}>
            {#if link.csr}
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.name}
              </a>
            {:else}
              <a href={link.href}>
                {link.name}
              </a>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</footer>
