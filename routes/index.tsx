import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { lang, t } from "../lib/i18n.ts";
import Hero from "../islands/Hero.tsx";
import MobileShowcase from "../islands/MobileShowcase.tsx";
import Skills from "../islands/Skills.tsx";
import AISection from "../islands/AISection.tsx";
import Experience from "../islands/Experience.tsx";
import Projects from "../islands/Projects.tsx";
import Contact from "../islands/Contact.tsx";

export default define.page(function Home() {
  const d = t();
  return (
    <>
      <Head>
        <title>{d.meta.title}</title>
        <meta name="description" content={d.meta.description} />
        <meta property="og:title" content={d.meta.title} />
        <meta property="og:description" content={d.meta.description} />
        <meta property="og:locale" content={lang.value === "es" ? "es_CO" : "en_US"} />
      </Head>

      <Hero />
      <MobileShowcase />
      <Skills />
      <AISection />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
});