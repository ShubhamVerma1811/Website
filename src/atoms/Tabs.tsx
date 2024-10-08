'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  {
    title: 'About',
    href: '/about'
  },
  {
    title: 'Projects',
    href: '/'
  },
  {
    title: 'Blogs',
    href: '/blog'
  },
  {
    title: 'Crafts',
    href: '/craft'
  },
  {
    title: 'Talks',
    href: '/talks'
  }
  // {
  //   title: 'Socials',
  //   href: '/socials'
  // }
];

export const Tabs = () => {
  const path = usePathname();

  return (
    <div className='my-6 border-b py-2 flex flex-row gap-6 overflow-auto'>
      {tabs.map((tab, idx) => (
        <Link
          key={tab.href}
          href={tab.href}
          data-umami-event={`tab-${tab.title.toLowerCase()}`}
          className={`text-xl hover:text-skin-secondary ${
            path === tab.href
              ? 'text-skin-secondary'
              : 'text-skin-primary-muted'
          }`}>
          {tab.title}
        </Link>
      ))}
    </div>
  );
};
