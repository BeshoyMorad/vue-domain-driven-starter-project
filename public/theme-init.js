(() => {
  // DON'T FORGET TO UPDATE THIS KEY IN src/shared/constants/theme.ts
  const theme = localStorage.getItem('vue-starter-theme');
  if (theme === 'dark' || theme === 'light') {
    document.documentElement.setAttribute('data-theme', theme);
  }
})();
