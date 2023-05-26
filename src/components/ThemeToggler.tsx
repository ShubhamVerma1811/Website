'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { isDarkModeAtom } from 'store/atoms/theme';
import { Moon, Sun } from './Icons';

const ThemeToggler = () => {
  const [isDarkMode, setIsDarkMode] = useAtom(isDarkModeAtom);

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
    <button
      role='button'
      aria-label='Toggle dark mode'
      className='ml-1 rounded-md p-2 hover:bg-skin-secondary-muted'
      onClick={() => {
        alert('HEt');
        // setIsDarkMode((prev) => {
        //   console.log(prev);
        //   return !prev;
        // });
      }}>
      {isDarkMode ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeToggler;
