import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import Hero from "../islands/Hero.tsx";
import Skills from "../islands/Skills.tsx";
import Experience from "../islands/Experience.tsx";
import Projects from "../islands/Projects.tsx";
import Contact from "../islands/Contact.tsx";

export default define.page(function Home() {
  return (
    <>
      <Head>
        <title>Heriberto Valencia | Senior Full-Stack Developer</title>
        <meta
          name="description"
          content="Senior Full-Stack Developer with 10+ years building scalable web applications. Expert in Python, JavaScript, TypeScript, VueJS, Angular, and cloud technologies."
        />
      </Head>

      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </>
  );
});
