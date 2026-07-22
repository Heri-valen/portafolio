import { useEffect } from "preact/hooks";
import anime from "animejs";

export default function Hero() {
  useEffect(() => {
    const tl = anime.timeline({ easing: "easeOutExpo" });

    tl.add(".hero-name", {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
      })
      .add(
        ".hero-subtitle",
        {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        },
        "-=400"
      )
      .add(
        ".hero-cta",
        {
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 500,
        },
        "-=200"
      );
  }, []);

  return (
    <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-4 text-center relative z-10">
        <p class="hero-subtitle text-blue-400 font-medium mb-4 tracking-wider uppercase">
          Senior Full-Stack Developer
        </p>

        <h1 class="hero-name text-5xl md:text-7xl font-bold text-white mb-6">
          Heriberto
          <span class="gradient-text"> Valencia</span>
        </h1>

        <p class="hero-subtitle text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-8">
          Building scalable applications with modern technologies.
          10+ years crafting digital experiences.
        </p>

        <div class="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            class="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Get in Touch
          </a>
          <a
            href="/cv.pdf"
            class="px-8 py-3 border border-slate-600 hover:border-blue-500 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Download CV
          </a>
        </div>
      </div>

      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#skills" class="text-slate-400 hover:text-blue-500 transition-colors">
          ↓
        </a>
      </div>
    </section>
  );
}
