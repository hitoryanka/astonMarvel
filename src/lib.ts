import { useEffect } from 'react';

export const getTheme = (): 'light' | 'dark' => {
  return (
    (localStorage.getItem('theme') as 'light' | 'dark' | null) ??
    'light'
  );
};
export const updateTheme = (theme: 'light' | 'dark'): void => {
  localStorage.setItem('theme', theme);
};

export function useThemeUpdate(theme: 'light' | 'dark'): void {
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    updateTheme(theme);
  }, [theme]);
}
