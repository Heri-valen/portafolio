import Header from "../islands/Header.tsx";
import Footer from "../islands/Footer.tsx";

export default function App({ Component }: { Component: any }) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0a0a0b" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&family=Geist:wght@100..900&display=swap"
        />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-[#0a0a0b] text-zinc-200 antialiased" style="font-family: 'Geist', sans-serif;">
        <div class="min-h-screen flex flex-col">
          <Header />
          <main class="flex-1 pt-14">
            <Component />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}