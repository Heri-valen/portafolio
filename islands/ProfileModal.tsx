import { useEffect, useRef, useState } from "preact/hooks";
import anime from "animejs";
import { lang } from "../lib/i18n.ts";
import { getProfile } from "../lib/profile.ts";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ProfileModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(false);

  // Re-read profile reactively on language change
  const p = getProfile(lang.value);

  // Lock scroll on open + ESC handler
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Run entrance + content animations when modal opens
  useEffect(() => {
    if (!open) return;
    setTyped(false);

    const overlay = overlayRef.current;
    const win = windowRef.current;
    if (!overlay || !win) return;

    // Reset
    anime.set(win, { opacity: 0, scale: 0.92, translateY: 30 });
    anime.set(overlay, { opacity: 0 });

    // 1. Overlay fade-in
    anime({
      targets: overlay,
      opacity: [0, 1],
      duration: 250,
      easing: "easeOutQuad",
    });

    // 2. Window entrance — slides up, scale, blur reveal
    anime({
      targets: win,
      opacity: [0, 1],
      scale: [0.92, 1],
      translateY: [30, 0],
      duration: 600,
      easing: "easeOutExpo",
    });

    // 3. Chrome dots pop-in
    anime({
      targets: ".pf-dot",
      scale: [0, 1],
      duration: 400,
      delay: anime.stagger(60, { start: 200 }),
      easing: "easeOutBack",
    });

    // 4. Title typing — split text into characters and reveal them
    const titleEl = win.querySelector(".pf-headline");
    if (titleEl && titleEl.textContent) {
      const text = titleEl.textContent;
      titleEl.textContent = "";
      titleEl.classList.remove("opacity-0");
      let i = 0;
      const typeNext = () => {
        if (i <= text.length) {
          titleEl.textContent = text.slice(0, i++);
          if (i <= text.length) {
            setTimeout(typeNext, 22);
          } else {
            setTyped(true);
          }
        }
      };
      setTimeout(typeNext, 600);
    }

    // 5. Body reveal — stagger
    anime({
      targets: ".pf-block",
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 500,
      delay: anime.stagger(80, { start: 1000 }),
      easing: "easeOutExpo",
    });

    // 6. Section underlines draw-in
    anime({
      targets: ".pf-underline",
      scaleX: [0, 1],
      duration: 700,
      delay: anime.stagger(120, { start: 1200 }),
      easing: "easeOutExpo",
    });

    // 7. Pain/solution boxes — slide from opposite sides
    anime({
      targets: ".pf-pain",
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 500,
      delay: anime.stagger(150, { start: 1400 }),
      easing: "easeOutCubic",
    });
    anime({
      targets: ".pf-solution",
      opacity: [0, 1],
      translateX: [20, 0],
      duration: 500,
      delay: anime.stagger(150, { start: 1500 }),
      easing: "easeOutCubic",
    });

    // 8. Metrics — bar fills with bounce
    anime({
      targets: ".pf-metric-bar",
      width: (el: any) => el.dataset.w + "%",
      duration: 1000,
      delay: anime.stagger(60, { start: 1700 }),
      easing: "easeOutElastic(1, .8)",
    });

    // 9. Metric value counter (visual scale-in)
    anime({
      targets: ".pf-metric-val",
      opacity: [0, 1],
      scale: [0.6, 1],
      duration: 500,
      delay: anime.stagger(60, { start: 1700 }),
      easing: "easeOutBack",
    });

    // 10. Pulsing cursor on the typing line
    anime({
      targets: ".pf-cursor",
      opacity: [1, 0],
      duration: 700,
      direction: "alternate",
      loop: true,
      easing: "steps(2)",
    });

    // 11. Quote marks fade
    anime({
      targets: ".pf-quote-mark",
      opacity: [0, 0.4],
      scale: [0, 1.4],
      duration: 700,
      delay: 2200,
      easing: "easeOutBack",
    });

    // 12. Subtle floating animation on terminal window
    anime({
      targets: win,
      translateY: [-3, 3],
      duration: 4000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
      delay: 1500,
    });
  }, [open, lang.value]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style="background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px);"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        ref={windowRef}
        class="relative w-full max-w-4xl max-h-[88vh] flex flex-col bg-[#0a0a0b] border border-zinc-800 rounded-lg overflow-hidden shadow-2xl"
        style="box-shadow: 0 0 80px rgba(74, 222, 128, 0.15), 0 30px 80px rgba(0, 0, 0, 0.8);"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Window chrome */}
        <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-[#0d0d0f] shrink-0">
          <div class="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              class="pf-dot w-3 h-3 rounded-full bg-coral hover:opacity-80 transition-opacity"
              aria-label="Close"
            ></button>
            <span class="pf-dot w-3 h-3 rounded-full bg-amber opacity-80"></span>
            <span class="pf-dot w-3 h-3 rounded-full bg-mint opacity-80"></span>
            <span class="font-mono text-xs text-zinc-500 ml-3 truncate">
              {p.windowTitle}
            </span>
          </div>
          <div class="flex items-center gap-3 font-mono text-[10px] text-zinc-600">
            <span class="hidden md:inline">{p.scrollHint}</span>
            <span class="flex items-center gap-1.5">
              <span class="status-dot"></span>
              <span class="text-emerald-500">live</span>
            </span>
          </div>
        </div>

        {/* Body */}
        <div
          ref={bodyRef}
          class="overflow-y-auto px-5 md:px-10 py-8 md:py-10 space-y-10 scrollbar-thin"
          style="scrollbar-width: thin; scrollbar-color: #2a2a32 transparent;"
        >
          {/* Headline */}
          <header class="space-y-3">
            <div class="font-mono text-xs text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <span class="status-dot"></span>
              <span>{p.badge}</span>
              <span class="text-zinc-700">·</span>
              <span class="text-zinc-500">{p.headlineSubtitle}</span>
            </div>
            <h2 class="pf-headline opacity-0 font-display text-2xl md:text-4xl font-bold text-white leading-tight">
              {p.headline}
            </h2>
            <div class="pf-underline origin-left h-px bg-gradient-to-r from-emerald-500 via-amber/40 to-transparent"></div>
          </header>

          {/* Executive summary */}
          <section class="pf-block opacity-0 space-y-3">
            <h3 class="font-mono text-sm text-amber uppercase tracking-widest">
              {p.summaryTitle}
            </h3>
            <p class="font-body text-zinc-300 leading-relaxed text-[15px] md:text-base">
              {p.summary}
            </p>
          </section>

          {/* Solutions title */}
          <section class="pf-block opacity-0 space-y-6">
            <div>
              <h3 class="font-mono text-sm text-amber uppercase tracking-widest mb-1">
                {p.solutionsTitle}
              </h3>
              <p class="font-mono text-xs text-zinc-500">
                <span class="text-emerald-500">$</span> {p.solutionsSubtitle}
              </p>
            </div>

            <div class="space-y-8">
              {p.sections.map((s) => (
                <article key={s.id} class="space-y-4 border-l border-zinc-900 pl-5 md:pl-7 relative">
                  {/* Left rail accent */}
                  <div class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/60 via-zinc-800 to-transparent"></div>

                  {/* Section header */}
                  <div class="space-y-2">
                    <div class="font-mono text-[10px] text-emerald-500/70 flex items-center gap-2">
                      <span>{s.command}</span>
                    </div>
                    <h4 class="font-display text-lg md:text-xl font-bold text-white leading-tight">
                      {s.title}
                    </h4>
                  </div>

                  {/* Pain */}
                  <div class="pf-pain opacity-0 bg-coral/5 border border-coral/20 rounded-lg p-4">
                    <div class="font-mono text-[10px] text-coral uppercase tracking-widest mb-1.5">
                      {s.painTitle}
                    </div>
                    <p class="text-zinc-300 text-sm leading-relaxed">{s.pain}</p>
                  </div>

                  {/* Solution */}
                  <div class="pf-solution opacity-0 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                    <div class="font-mono text-[10px] text-mint uppercase tracking-widest mb-1.5">
                      {s.solutionTitle}
                    </div>
                    <p class="text-zinc-300 text-sm leading-relaxed">{s.solution}</p>
                  </div>

                  {/* Metrics */}
                  {s.metrics && (
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                      {s.metrics.map((m) => (
                        <div
                          key={m.label}
                          class="bg-[#0d0d0f] border border-zinc-900 rounded p-3"
                        >
                          <div class="font-mono text-[9px] text-zinc-600 uppercase tracking-wider mb-1">
                            {m.label}
                          </div>
                          <div class="font-display text-lg font-bold text-emerald-400 pf-metric-val opacity-0">
                            {m.value}
                          </div>
                          <div class="mt-2 h-1 bg-zinc-900 rounded-sm overflow-hidden">
                            <div
                              class="pf-metric-bar h-full bg-gradient-to-r from-emerald-500 to-amber-500"
                              data-w="100"
                              style="width: 0%"
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Philosophy */}
          <section class="pf-block opacity-0 relative bg-gradient-to-br from-emerald-500/5 via-amber/5 to-violet/5 border border-emerald-500/20 rounded-lg p-6 md:p-8">
            <span class="pf-quote-mark opacity-0 absolute top-2 left-3 font-display text-6xl text-emerald-500 leading-none">
              "
            </span>
            <span class="pf-quote-mark opacity-0 absolute bottom-0 right-3 font-display text-6xl text-amber leading-none">
              "
            </span>
            <h3 class="font-mono text-sm text-amber uppercase tracking-widest mb-4">
              {p.philosophyTitle}
            </h3>
            <blockquote class="font-display text-lg md:text-xl text-white leading-relaxed italic">
              {p.philosophy}
            </blockquote>
          </section>

          {/* Footer cmd */}
          <div class="pf-block opacity-0 pt-4 border-t border-zinc-900 flex items-center justify-between font-mono text-xs">
            <span class="text-zinc-500">
              <span class="text-emerald-500">$</span>{" "}
              <span class="text-zinc-600">~/profile</span>{" "}
              <span class="text-zinc-700">·</span>{" "}
              <span class="text-zinc-600">exit 0</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              class="btn-ghost text-xs"
            >
              <span>{p.closeCmd}</span>
              <span class="text-[10px]">×</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}