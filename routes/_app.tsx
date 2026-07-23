import Header from "../islands/Header.tsx";
import Footer from "../islands/Footer.tsx";
import { lang } from "../lib/i18n.ts";

export default function App({ Component }: { Component: any }) {
  // Set html lang on first render so SSR HTML is valid
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang.value;
  }
  return (
    <html lang={lang.value}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0a0a0b" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&family=Inter:wght@100..900&display=swap"
        />
        <link rel="stylesheet" href="/styles.css" />
        {/* Sync html lang as early as possible (runs before islands hydrate) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=localStorage.getItem("lang");if(l==="en"||l==="es"){document.documentElement.lang=l;}}catch(e){}})();`,
          }}
        />
        {/* Mark html as no-anime; the first island that hydrates removes the class so anime.js can take over and animate opacity:0 elements. If JS is broken, content stays visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("no-anime");window.addEventListener("DOMContentLoaded",function(){setTimeout(function(){document.documentElement.classList.remove("no-anime");},50);});`,
          }}
        />
      </head>
      <body class="bg-[#0a0a0b] text-zinc-200 antialiased">
        <a
          href="#top"
          class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[10000] focus:px-3 focus:py-1.5 focus:bg-emerald-500 focus:text-black focus:rounded focus:font-mono focus:text-xs"
        >
          Skip to content
        </a>
        <div class="scroll-progress" style="width: 100%; transform: scaleX(0);"></div>
        <div class="min-h-screen flex flex-col">
          <Header />
          <main class="flex-1" style="padding-top: var(--header-h);">
            <Component />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
