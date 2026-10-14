// Sets `data-theme` on <html> synchronously, before hydration or any paint,
// so CSS never has a themeless flash. Inlined in <head> by
// app/[locale]/layout.jsx and app/global-not-found.jsx (plain string, so it
// is importable from server components without pulling in client code).
export const themeInit = `
(function(){
  try {
    var stored = localStorage.getItem('kimox-theme');
    var prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var theme = stored || prefers;
    document.documentElement.setAttribute('data-theme', theme);
  } catch(e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;
