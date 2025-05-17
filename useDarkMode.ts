import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useDarkMode = (): [boolean, () => void] => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check for user preference in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    // Check for system preference if no saved preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial state based on saved preference or system preference
    setIsDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark));
    
    // Apply theme to document
    applyTheme(savedTheme === 'dark' || (!savedTheme && prefersDark));
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      applyTheme(newMode);
      return newMode;
    });
  };

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return [isDarkMode, toggleDarkMode];
};
