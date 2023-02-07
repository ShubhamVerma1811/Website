import { useAtom } from 'jotai';
import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { isDarkModeAtom } from 'store/atoms/theme';
import { trpc } from 'utils/trpc';
import '../styles/global.css';
import '../styles/tailwind.css';

function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);

  useEffect(() => {
    const body = document.querySelector('body');
    const isDark = body?.classList.contains('dark') ?? false;
    setIsDarkMode(isDark);
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    if (isDarkMode !== undefined) {
      if (isDarkMode) {
        body?.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        body?.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }, [isDarkMode]);

  return (
    <React.Fragment>
      {/* @ts-ignore */}
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default trpc.withTRPC(App);
