import './globals.css';

export const metadata = {
  title: 'Kimox Studio — Software con alma propia',
  description: 'Estudio de software. Aplicaciones web y móviles a medida.',
  icons: { icon: '/logos/icon.svg' },
};

const themeInit = `
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

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="cursor-ring" />
        <div id="cursor" />
        <div id="cursor-trail" />
        {children}
      </body>
    </html>
  );
}
