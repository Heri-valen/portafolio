import { useEffect } from "preact/hooks";
import anime from "animejs";

export default function Hero() {
  useEffect(() => {
    // Hero entrance timeline
    const tl = anime.timeline({ easing: "easeOutExpo" });

    tl.add({
      targets: ".hero-tag",
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 600,
    })
      .add({
        targets: ".hero-name-line",
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 800,
        delay: anime.stagger(100),
      }, "-=300")
      .add({
        targets: ".hero-meta",
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 500,
        delay: anime.stagger(80),
      }, "-=400")
      .add({
        targets: ".hero-cta",
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 500,
      }, "-=200")
      .add({
        targets: ".hero-scroll",
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 400,
      }, "-=100");

    // Floating shapes
    anime({
      targets: ".shape",
      translateY: () => anime.random(-15, 15),
      translateX: () => anime.random(-15, 15),
      duration: () => anime.random(3000, 5000),
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
    });
  }, []);

  const tech = [
    "TYPESCRIPT", "PYTHON", "VUEJS", "SVELTE", "ANGULAR",
    "KOTLIN", "SWIFT", "PHP", "C#", "JAVA", "AWS", "DOCKER",
  ];

  return (
    <section class="scanlines relative min-h-screen flex flex-col items-center justify-center grid-bg overflow-hidden noise">
      {/* Floating geometric shapes */}
      <div class="shape shape-ring" style="top: 15%; left: 8%; width: 80px; height: 80px;"></div>
      <div class="shape shape-square" style="top: 70%; left: 12%; width: 30px; height: 30px;"></div>
      <div class="shape shape-cross" style="top: 25%; right: 10%; width: 8px; height: 8px;"></div>
      <div class="shape shape-ring" style="bottom: 20%; right: 8%; width: 100px; height: 100px;"></div>
      <div class="shape shape-square" style="top: 45%; right: 25%; width: 20px; height: 20px; transform: rotate(45deg);"></div>

      {/* Gradient orbs */}
      <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]"></div>

      <div class="container mx-auto px-4 relative z-10 text-center pt-20">
        {/* Editor chrome */}
        <div class="flex items-center justify-center gap-2 mb-8 opacity-60">
          <div class="flex gap-1.5">
            <span class="w-3 h-3 rounded-full bg-coral/60"></span>
            <span class="w-3 h-3 rounded-full bg-amber/60"></span>
            <span class="w-3 h-3 rounded-full bg-mint/60"></span>
          </div>
          <span class="font-mono text-xs text-zinc-500 ml-4">~/portafolio/heriberto.valencia</span>
        </div>

        {/* Status tag */}
        <div class="hero-tag inline-flex items-center gap-2 px-3 py-1 mb-6 border border-emerald-500/30 rounded-full bg-emerald-500/5">
          <span class="status-dot"></span>
          <span class="font-mono text-xs text-emerald-400 uppercase tracking-widest">
            Available for new projects · 2026
          </span>
        </div>

        {/* Main name — split into lines */}
        <h1 class="font-display font-bold text-white text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
          <span class="hero-name-line block text-zinc-400 text-3xl md:text-5xl lg:text-6xl mb-2">
            Heriberto
          </span>
          <span class="hero-name-line block gradient-text">
            Valencia<span class="text-mint cursor"></span>
          </span>
        </h1>

        {/* Meta information */}
        <div class="hero-meta flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10 font-mono text-sm text-zinc-400">
          <span class="flex items-center gap-2">
            <span class="text-amber">▶</span> Senior Full-Stack Engineer
          </span>
          <span class="text-zinc-700">·</span>
          <span class="flex items-center gap-2">
            <span class="text-amber">▶</span> 10+ years shipping production
          </span>
          <span class="text-zinc-700">·</span>
          <span class="flex items-center gap-2">
            <span class="text-amber">▶</span> Mexico City
          </span>
        </div>

        {/* CTAs */}
        <div class="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <a href="#projects" class="btn-terminal">
            <span>view_work</span>
            <span class="text-xs">→</span>
          </a>
          <a href="#contact" class="btn-ghost">
            <span>init_contact</span>
          </a>
        </div>
      </div>

      {/* Tech marquee at bottom */}
      <div class="hero-scroll relative w-full overflow-hidden border-y border-zinc-900 py-4 bg-black/40">
        <div class="marquee gap-12 font-mono text-sm uppercase tracking-widest">
          {[...tech, ...tech, ...tech].map((t, i) => (
            <span key={i} class="flex items-center gap-12 text-zinc-500 hover:text-mint transition-colors">
              <span>{t}</span>
              <span class="text-emerald-500/40">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}