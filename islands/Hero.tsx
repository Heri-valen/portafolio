import { useEffect, useRef, useState } from "preact/hooks";
import anime from "animejs";
import { t } from "../lib/i18n.ts";
import ProfileModal from "./ProfileModal.tsx";

export default function Hero() {
  const d = t();
  const [profileOpen, setProfileOpen] = useState(false);
  const yearRef = useRef<HTMLSpanElement>(null);
  const projectCountRef = useRef<HTMLSpanElement>(null);
  const techCountRef = useRef<HTMLSpanElement>(null);
  const ctaRefs = useRef<Record<string, HTMLElement | null>>({});

  // Entrance timeline + counters
  useEffect(() => {
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
        targets: ".hero-stats",
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 600,
        delay: anime.stagger(80),
      }, "-=300");

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

    // Counters
    const countTo = (el: HTMLElement | null, target: number, suffix = "+") => {
      if (!el) return;
      const obj = { v: 0 };
      anime({
        targets: obj,
        v: target,
        round: 1,
        duration: 1800,
        easing: "easeOutExpo",
        delay: 800,
        update: () => { el.textContent = `${obj.v}${suffix}`; },
      });
    };
    countTo(yearRef.current, 10);
    countTo(projectCountRef.current, 40);
    countTo(techCountRef.current, 12);
  }, []);

  // Magnetic buttons
  useEffect(() => {
    const buttons = Object.values(ctaRefs.current).filter(Boolean) as HTMLElement[];
    const cleanups: Array<() => void> = [];
    buttons.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        anime({ targets: btn, translateX: x * 0.25, translateY: y * 0.25, duration: 400, easing: "easeOutCubic" });
      };
      const onLeave = () => {
        anime({ targets: btn, translateX: 0, translateY: 0, duration: 600, easing: "easeOutElastic(1, .6)" });
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const tech = [
    "TYPESCRIPT", "PYTHON", "VUEJS", "SVELTE", "ANGULAR",
    "KOTLIN", "SWIFT", "PHP", "C#", "JAVA", "AWS", "DOCKER",
  ];

  function openProfile() {
    anime({
      targets: ".btn-profile",
      scale: [1, 0.94, 1],
      duration: 280,
      easing: "easeOutQuad",
    });
    setTimeout(() => setProfileOpen(true), 120);
  }

  return (
    <section id="top" class="scanlines relative min-h-screen flex flex-col items-center justify-center grid-bg overflow-hidden noise">
      <div class="shape shape-ring" style="top: 15%; left: 8%; width: 80px; height: 80px;"></div>
      <div class="shape shape-square" style="top: 70%; left: 12%; width: 30px; height: 30px;"></div>
      <div class="shape shape-cross" style="top: 25%; right: 10%; width: 8px; height: 8px;"></div>
      <div class="shape shape-ring" style="bottom: 20%; right: 8%; width: 100px; height: 100px;"></div>
      <div class="shape shape-square" style="top: 45%; right: 25%; width: 20px; height: 20px; transform: rotate(45deg);"></div>

      <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]"></div>

      <div class="container mx-auto px-4 relative z-10 text-center pt-12 md:pt-20">
        <div class="flex items-center justify-center gap-2 mb-6 md:mb-8 opacity-60">
          <div class="flex gap-1.5">
            <span class="w-3 h-3 rounded-full bg-coral/60"></span>
            <span class="w-3 h-3 rounded-full bg-amber/60"></span>
            <span class="w-3 h-3 rounded-full bg-mint/60"></span>
          </div>
          <span class="font-mono text-xs text-zinc-500 ml-4">{d.hero.terminalPath}</span>
        </div>

        <div class="hero-tag inline-flex items-center gap-2 px-3 py-1 mb-6 border border-emerald-500/30 rounded-full bg-emerald-500/5">
          <span class="status-dot"></span>
          <span class="font-mono text-xs text-emerald-400 uppercase tracking-widest">
            {d.hero.tag}
          </span>
        </div>

        <h1 class="font-display font-bold text-white text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
          <span class="hero-name-line block text-zinc-400 text-3xl md:text-5xl lg:text-6xl mb-2">
            {d.hero.name}
          </span>
          <span class="hero-name-line block gradient-text">
            Valencia<span class="cursor"></span>
          </span>
        </h1>

        <div class="hero-meta flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10 font-mono text-sm text-zinc-400">
          <span class="flex items-center gap-2">
            <span class="text-amber">▶</span> {d.hero.role}
          </span>
          <span class="text-zinc-700">·</span>
          <span class="flex items-center gap-2">
            <span class="text-amber">▶</span>
            <span ref={yearRef}>0+</span> {d.hero.years.replace(/^\d+\+\s*/, "")}
          </span>
          <span class="text-zinc-700">·</span>
          <span class="flex items-center gap-2">
            <span class="text-amber">▶</span> {d.hero.location}
          </span>
        </div>

        <div class="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <a
            href="#projects"
            ref={(el) => { ctaRefs.current.view = el; }}
            class="btn-magnetic"
          >
            <span>{d.hero.viewWork}</span>
            <span class="text-xs">→</span>
          </a>
          <button
            type="button"
            ref={(el) => { ctaRefs.current.profile = el; }}
            onClick={openProfile}
            class="btn-magnetic btn-profile"
            style="--btn-accent: var(--accent-amber); border-color: var(--btn-accent); color: var(--btn-accent);"
          >
            <span>{d.hero.initProfile}</span>
            <span class="text-xs">★</span>
          </button>
          <a
            href="#contact"
            ref={(el) => { ctaRefs.current.contact = el; }}
            class="btn-ghost"
          >
            <span>{d.hero.initContact}</span>
          </a>
        </div>

        <div class="hero-stats flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs">
          <div class="flex items-center gap-2 text-zinc-500">
            <span class="text-mint">$</span>
            <span class="text-zinc-600">projects:</span>
            <span ref={projectCountRef} class="text-amber font-bold">0+</span>
          </div>
          <div class="flex items-center gap-2 text-zinc-500">
            <span class="text-mint">$</span>
            <span class="text-zinc-600">techs:</span>
            <span ref={techCountRef} class="text-amber font-bold">0+</span>
          </div>
          <div class="flex items-center gap-2 text-zinc-500">
            <span class="status-dot"></span>
            <span class="text-emerald-400">{d.status}</span>
          </div>
        </div>
      </div>

      <div class="relative w-full overflow-hidden border-y border-zinc-900 py-4 bg-black/40 mt-12 md:mt-20">
        <div class="marquee gap-12 font-mono text-sm uppercase tracking-widest">
          {[...tech, ...tech].map((t, i) => (
            <span key={i} class="flex items-center gap-12 text-zinc-500 hover:text-mint transition-colors">
              <span>{t}</span>
              <span class="text-emerald-500/40">●</span>
            </span>
          ))}
        </div>
      </div>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </section>
  );
}
