import { type PageProps } from "fresh";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-slate-50 text-slate-900 antialiased">
        <div class="min-h-screen flex flex-col">
          <Header />
          <main class="flex-1 pt-16">
            <Component />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
