import { useEffect, useRef, useState } from "preact/hooks";
import anime from "animejs";
import { lang, t } from "../lib/i18n.ts";
import { getProfile } from "../lib/profile.ts";

interface Props {
  open: boolean;
  onClose: () => void;
}

const TYPING_SPEED = 14; // ms per char
const PROMPT_DELAY = 320; // ms before prompt appears after content reveals

export default function ProfileModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const [step, setStep] = useState(0);
  // step states: 0 = headline typing, 1..4 = solutions, 5 = philosophy, 6 = eof

  // Reactive i18n
  const i18n = t();
  const p = getProfile(lang.value);

  // Reset when opening
  useEffect(() => {
    if (open) setStep(0);
  }, [open, lang.value]);

  // ESC + scroll lock
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

  // ENTER to advance — captures keyboard regardless of focus
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea (none in this modal, but safe)
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        advance();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, step]);

  // Pulsing cursor loop
  useEffect(() => {
    if (!open || !cursorRef.current) return;
    const anim = anime({
      targets: cursorRef.current,
      opacity: [1, 0],
      duration: 700,
      direction: "alternate",
      loop: true,
      easing: "steps(2)",
    });
    return () => anim.pause();
  }, [open]);

  // Floating loop on window
  useEffect(() => {
    if (!open || !windowRef.current) return;
    const anim = anime({
      targets: windowRef.current,
      translateY: [-3, 3],
      duration: 4000,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
      delay: 1500,
    });
    return () => anim.pause();
  }, [open]);

  // ─── ENTRANCE (only on first step) ─────────────────────────────
  useEffect(() => {
    if (!open || step !== 0) return;
    const overlay = overlayRef.current;
    const win = windowRef.current;
    if (!overlay || !win) return;

    anime.set(win, { opacity: 0, scale: 0.92, translateY: 30 });
    anime.set(overlay, { opacity: 0 });

    anime({ targets: overlay, opacity: [0, 1], duration: 250, easing: "easeOutQuad" });
    anime({
      targets: win,
      opacity: [0, 1],
      scale: [0.92, 1],
      translateY: [30, 0],
      duration: 600,
      easing: "easeOutExpo",
    });
    anime({
      targets: ".pf-dot",
      scale: [0, 1],
      duration: 400,
      delay: anime.stagger(60, { start: 200 }),
      easing: "easeOutBack",
    });
    anime({
      targets: ".pf-headline",
      opacity: [0, 1],
      duration: 400,
      delay: 500,
    });
    // Typing on headline
    const titleEl = win.querySelector(".pf-headline .pf-headline-text") as HTMLElement | null;
    if (titleEl && titleEl.textContent) {
      const text = titleEl.textContent;
      titleEl.textContent = "";
      let i = 0;
      const tick = () => {
        if (i <= text.length) {
          titleEl.textContent = text.slice(0, i++);
          if (i <= text.length) setTimeout(tick, TYPING_SPEED);
        }
      };
      setTimeout(tick, 700);
    }
    anime({
      targets: ".pf-prompt-0",
      opacity: [0, 1],
      duration: 400,
      delay: 2200,
    });
  }, [open, step === 0]);

  // ─── ADVANCE FUNCTION ──────────────────────────────────────────
  function advance() {
    const next = step + 1;
    if (next > 6) return;
    setStep(next);

    // Wait for next render then animate
    requestAnimationFrame(() => {
      if (next === 1) {
        // Summary block
        const el = bodyRef.current?.querySelector(".pf-summary");
        if (el) animateBlock(el, 0);
      } else if (next >= 2 && next <= 5) {
        // Each section
        const idx = next - 2;
        const el = bodyRef.current?.querySelector(`[data-section="${idx}"]`);
        if (el) animateSection(el as HTMLElement, idx);
      } else if (next === 6) {
        // Philosophy
        const el = bodyRef.current?.querySelector(".pf-philosophy");
        if (el) animatePhilosophy(el);
        const eofEl = bodyRef.current?.querySelector(".pf-eof");
        if (eofEl) {
          setTimeout(() => {
            anime({
              targets: eofEl,
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 500,
              easing: "easeOutExpo",
            });
          }, 600);
        }
      }

      // Auto-scroll to the new content
      setTimeout(() => {
        if (bodyRef.current) {
          bodyRef.current.scrollTo({
            top: bodyRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 80);
    });
  }

  function animateBlock(el: Element, delay = 0) {
    anime({
      targets: el,
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 500,
      delay,
      easing: "easeOutExpo",
    });
    anime({
      targets: el.querySelectorAll(".pf-underline"),
      scaleX: [0, 1],
      duration: 700,
      delay: delay + 100,
      easing: "easeOutExpo",
    });
    anime({
      targets: el.querySelectorAll(".pf-prompt"),
      opacity: [0, 1],
      duration: 400,
      delay: delay + PROMPT_DELAY + 400,
    });
  }

  function animateSection(el: HTMLElement, idx: number) {
    anime({
      targets: el,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      easing: "easeOutExpo",
    });
    // Title underlines
    anime({
      targets: el.querySelectorAll(".pf-underline"),
      scaleX: [0, 1],
      duration: 700,
      delay: 200,
      easing: "easeOutExpo",
    });
    // Pain/solution boxes staggered
    anime({
      targets: el.querySelectorAll(".pf-pain"),
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 500,
      delay: anime.stagger(120, { start: 350 }),
      easing: "easeOutCubic",
    });
    anime({
      targets: el.querySelectorAll(".pf-solution"),
      opacity: [0, 1],
      translateX: [20, 0],
      duration: 500,
      delay: anime.stagger(120, { start: 500 }),
      easing: "easeOutCubic",
    });
    // Metrics: bars + values
    anime({
      targets: el.querySelectorAll(".pf-metric-bar"),
      width: (target: any) => target.dataset.w + "%",
      duration: 1000,
      delay: anime.stagger(60, { start: 700 }),
      easing: "easeOutElastic(1, .8)",
    });
    anime({
      targets: el.querySelectorAll(".pf-metric-val"),
      opacity: [0, 1],
      scale: [0.6, 1],
      duration: 500,
      delay: anime.stagger(60, { start: 700 }),
      easing: "easeOutBack",
    });
    // Prompt
    setTimeout(() => {
      anime({
        targets: el.querySelectorAll(".pf-prompt"),
        opacity: [0, 1],
        duration: 400,
      });
    }, 1200);
  }

  function animatePhilosophy(el: Element) {
    anime({
      targets: el,
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.97, 1],
      duration: 700,
      easing: "easeOutExpo",
    });
    anime({
      targets: el.querySelectorAll(".pf-quote-mark"),
      opacity: [0, 0.4],
      scale: [0, 1.4],
      duration: 700,
      delay: 300,
      easing: "easeOutBack",
    });
  }

  if (!open) return null;

  // Number of total steps for the progress indicator
  const totalSteps = 7; // 0 headline, 1 summary, 2-5 sections, 6 philosophy
  const progressPct = (step / (totalSteps - 1)) * 100;

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
            <span class="hidden md:flex items-center gap-1.5 text-zinc-500">
              <kbd class="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded text-[9px] text-zinc-400">
                {i18n.hero.enterHint}
              </kbd>
              <span>{i18n.modal.continueHint}</span>
            </span>
            <span class="text-zinc-700">·</span>
            <span class="flex items-center gap-1.5">
              <span class="status-dot"></span>
              <span class="text-emerald-500">{i18n.modal.live}</span>
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div class="h-px bg-zinc-900 relative shrink-0">
          <div
            class="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-700"
            style={`width: ${progressPct}%;`}
          ></div>
        </div>

        {/* Body */}
        <div
          ref={bodyRef}
          class="overflow-y-auto px-5 md:px-10 py-8 md:py-10 space-y-10 scrollbar-thin"
          style="scrollbar-width: thin; scrollbar-color: #2a2a32 transparent;"
        >
          {/* ── STEP 0: Headline ── */}
          <header class="space-y-3">
            <div class="font-mono text-xs text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <span class="status-dot"></span>
              <span>{p.badge}</span>
              <span class="text-zinc-700">·</span>
              <span class="text-zinc-500">{p.headlineSubtitle}</span>
            </div>
            <h2 class="pf-headline opacity-0 font-display text-2xl md:text-4xl font-bold text-white leading-tight flex items-center gap-2">
              <span class="pf-headline-text">{p.headline}</span>
              <span ref={cursorRef} class="pf-cursor text-emerald-500 inline-block w-2 h-7 md:h-9 bg-emerald-500 ml-1"></span>
            </h2>
            <div class="pf-underline origin-left h-px bg-gradient-to-r from-emerald-500 via-amber/40 to-transparent"></div>
            {/* Prompt — only visible at step 0 */}
            <button
              type="button"
              onClick={advance}
              class="pf-prompt pf-prompt-0 opacity-0 font-mono text-xs text-emerald-500 hover:text-emerald-300 transition-colors flex items-center gap-2 mt-4 group"
            >
              <span class="opacity-60">[</span>
              <span>{i18n.hero.enterToContinue}</span>
              <kbd class="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-[10px] text-emerald-400 group-hover:bg-emerald-500/20">
                {i18n.hero.enterHint}
              </kbd>
              <span class="opacity-60">]</span>
            </button>
          </header>

          {/* ── STEP 1: Executive summary ── */}
          <section class="pf-summary opacity-0 space-y-3">
            <h3 class="font-mono text-sm text-amber uppercase tracking-widest">
              {p.summaryTitle}
            </h3>
            <p class="font-body text-zinc-300 leading-relaxed text-[15px] md:text-base">
              {p.summary}
            </p>
            <div class="pf-underline origin-left h-px bg-gradient-to-r from-amber/40 via-zinc-800 to-transparent mt-3"></div>
            <Prompt onClick={advance} label={i18n.hero.enterToContinue} kbd={i18n.hero.enterHint} />
          </section>

          {/* ── STEP 2: Solutions header ── */}
          {step >= 2 && (
            <section class="space-y-6">
              <div>
                <h3 class="font-mono text-sm text-amber uppercase tracking-widest mb-1">
                  {p.solutionsTitle}
                </h3>
                <p class="font-mono text-xs text-zinc-500">
                  <span class="text-emerald-500">$</span> {p.solutionsSubtitle}
                </p>
              </div>
            </section>
          )}

          {/* ── STEPS 2-5: Each section ── */}
          {p.sections.map((s, idx) => {
            const sectionStep = idx + 2;
            if (step < sectionStep) return null;
            return (
              <article
                key={s.id}
                data-section={idx}
                class="pf-section opacity-0 space-y-4 border-l border-zinc-900 pl-5 md:pl-7 relative"
              >
                <div class="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/60 via-zinc-800 to-transparent"></div>

                <div class="space-y-2">
                  <div class="font-mono text-[10px] text-emerald-500/70 flex items-center gap-2">
                    <span>{s.command}</span>
                  </div>
                  <h4 class="font-display text-lg md:text-xl font-bold text-white leading-tight">
                    {s.title}
                  </h4>
                </div>

                <div class="pf-pain opacity-0 bg-coral/5 border border-coral/20 rounded-lg p-4">
                  <div class="font-mono text-[10px] text-coral uppercase tracking-widest mb-1.5">
                    {s.painTitle}
                  </div>
                  <p class="text-zinc-300 text-sm leading-relaxed">{s.pain}</p>
                </div>

                <div class="pf-solution opacity-0 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                  <div class="font-mono text-[10px] text-mint uppercase tracking-widest mb-1.5">
                    {s.solutionTitle}
                  </div>
                  <p class="text-zinc-300 text-sm leading-relaxed">{s.solution}</p>
                </div>

                {s.metrics && (
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                    {s.metrics.map((m) => (
                      <div key={m.label} class="bg-[#0d0d0f] border border-zinc-900 rounded p-3">
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

                <div class="pf-underline origin-left h-px bg-gradient-to-r from-zinc-800 via-zinc-800 to-transparent mt-2"></div>

                {idx < p.sections.length - 1 ? (
                  <Prompt onClick={advance} label={i18n.hero.enterToContinue} kbd={i18n.hero.enterHint} />
                ) : (
                  <Prompt onClick={advance} label={i18n.hero.enterToContinue} kbd={i18n.hero.enterHint} lastLabel={i18n.modal.last} />
                )}
              </article>
            );
          })}

          {/* ── STEP 6: Philosophy ── */}
          {step >= 6 && (
            <>
              <section class="pf-philosophy opacity-0 relative bg-gradient-to-br from-emerald-500/5 via-amber/5 to-violet/5 border border-emerald-500/20 rounded-lg p-6 md:p-8">
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

              {/* ── EOF ── */}
              <div class="pf-eof opacity-0 pt-4 border-t border-zinc-900 space-y-3">
                <div class="font-mono text-xs text-zinc-500 flex items-center gap-2">
                  <span class="text-emerald-500">$</span>
                  <span>{i18n.hero.endOfFile}</span>
                </div>
                <div class="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(0);
                      if (bodyRef.current) bodyRef.current.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    class="btn-ghost"
                  >
                    <span>{i18n.hero.runAgain}</span>
                    <span class="text-xs">↻</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    class="btn-terminal"
                  >
                    <span>{p.closeCmd}</span>
                    <span class="text-xs">×</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROMPT — Press ENTER to continue
   ───────────────────────────────────────────────────────────── */
function Prompt({ onClick, label, kbd, lastLabel }: { onClick: () => void; label: string; kbd: string; lastLabel?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      class="pf-prompt opacity-0 font-mono text-xs text-emerald-500 hover:text-emerald-300 transition-colors flex items-center gap-2 mt-2 group"
    >
      <span class="opacity-60">[</span>
      <span>{label}</span>
      <kbd class="px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-[10px] text-emerald-400 group-hover:bg-emerald-500/20">
        {kbd}
      </kbd>
      <span class="opacity-60">]</span>
      {lastLabel && <span class="text-zinc-600 ml-2">· {lastLabel}</span>}
    </button>
  );
}