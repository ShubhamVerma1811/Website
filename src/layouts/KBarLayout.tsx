import {
  GithubIcon,
  LinkedInIcon,
  SpotifyIcon,
  TwitterIcon
} from 'components/Icons';
import {
  createAction,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches
} from 'kbar';
import router from 'next/router';

const actions = [
  createAction({
    name: 'Home',
    shortcut: ['h'],
    keywords: 'home',
    perform: () => router.push('/')
  }),
  createAction({
    name: 'Blog',
    shortcut: ['g', 'b'],
    keywords: 'writing words',
    perform: () => router.push('/blog')
  }),
  createAction({
    name: 'Colophon',
    shortcut: ['g', 'c'],
    perform: () => router.push('/colophon')
  }),
  createAction({
    name: 'Uses',
    shortcut: ['g', 'u'],
    keywords: 'gear',
    perform: () => router.push('/uses')
  }),
  createAction({
    name: 'Books',
    shortcut: ['g', 'r'],
    keywords: 'books',
    perform: () => router.push('/books')
  }),
  createAction({
    name: 'RSS',
    keywords: 'feed, rss',
    perform: () => router.push('/rss.xml')
  }),
  createAction({
    name: 'Sitemap',
    keywords: 'sitemap',
    perform: () => router.push('/sitemap.xml')
  }),
  createAction({
    icon: <TwitterIcon />,
    name: 'Twitter',
    shortcut: ['g', 't'],
    perform: () =>
      window.open(
        'https://twitter.com/verma__shubham',
        '_blank',
        'noopener noreferrer'
      ),
    section: 'Socials'
  }),
  createAction({
    icon: <GithubIcon />,
    name: 'GitHub',
    keywords: 'github',
    shortcut: ['g', 'h'],
    perform: () =>
      window.open(
        'https://github.com/ShubhamVerma1811',
        '_blank',
        'noopener noreferrer'
      ),
    section: 'Socials'
  }),
  createAction({
    icon: <LinkedInIcon />,
    name: 'LinkedIn',
    keywords: 'linkedin',
    shortcut: ['g', 'l'],
    perform: () =>
      window.open(
        'https://linkedin.com/in/ShubhamVerma1811',
        '_blank',
        'noopener noreferrer'
      ),
    section: 'Socials'
  }),
  createAction({
    icon: <SpotifyIcon />,
    name: 'Spotify',
    keywords: 'music',
    shortcut: ['g', 's'],
    perform: () =>
      window.open(
        'https://open.spotify.com/user/shubhamverma1811',
        '_blank',
        'noopener noreferrer'
      ),
    section: 'Socials'
  }),
  createAction({
    icon: <SpotifyIcon />,
    name: 'Spotify Stats',
    keywords: 'music',
    perform: () =>
      window.open(
        'https://spotify-top.com/user/shubhamverma1811',
        '_blank',
        'noopener noreferrer'
      ),
    section: 'Socials'
  }),
  createAction({
    name: 'Toggle theme',
    shortcut: ['t'],
    keywords: 'theme',
    perform: () => {
      const body = document.querySelector('body');
      body?.classList.toggle('dark');
      localStorage.setItem(
        'theme',
        body?.classList.contains('dark') ? 'dark' : 'light'
      );
    }
  })
];

export const KBarLayout: React.FC = (props) => {
  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className='w-[900px]'>
          <KBarAnimator className='w-3/4 overflow-hidden rounded-xl md:w-1/2'>
            <KBarSearch className='w-full py-4 px-4 shadow-2xl ring-1 ring-black/5' />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {props.children}
    </KBarProvider>
  );
};

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div key={item} className='space-x-1 bg-white px-4 py-2'>
            {item}
          </div>
        ) : (
          <div
            key={item.id}
            className={`${
              active ? 'bg-indigo-500 text-white' : 'bg-indigo-100'
            } space-x-1 px-4 py-2 text-lg`}>
            <div className={`flex items-center`}>
              <span className='m-1 text-sm'>{item?.icon}</span>
              <span className='font-medium'>{item?.name}</span>
              <span className='mr-0 ml-auto'>
                {item?.shortcut?.map((shortcut, idx) => {
                  return (
                    <kbd
                      key={idx}
                      className='m-0.5 rounded bg-gray-300 p-1 font-medium text-black'>
                      {shortcut}
                    </kbd>
                  );
                })}
              </span>
            </div>
            <p className='mx-0 text-base'>{item?.subtitle}</p>
          </div>
        )
      }
    />
  );
}
