import { useEffect, useRef } from "preact/hooks";
import anime from "animejs";
import { getExperiences } from "../content/experience.ts";
import { t } from "../lib/i18n.ts";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const d = t();
  const experiences = getExperiences();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Draw the center timeline line
          if (lineRef.current) {
            anime({
              targets: lineRef.current,
              scaleY: [0, 1],
              duration: 1400,
              easing: "easeOutExpo",
            });
          }
          anime({
            targets: ".exp-item",
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            easing: "easeOutCubic",
            delay: anime.stagger(120),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  // Dot pulse on card hover
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>(".exp-card");
    const cleanups: Array<() => void> = [];
    cards?.forEach((card) => {
      const onEnter = () => {
        const dot = card.parentElement?.querySelector(".exp-dot") as HTMLElement | null;
        if (dot) anime({ targets: dot, scale: 1.5, duration: 400, easing: "easeOutCubic" });
      };
      const onLeave = () => {
        const dot = card.parentElement?.querySelector(".exp-dot") as HTMLElement | null;
        if (dot) anime({ targets: dot, scale: 1, duration: 400, easing: "easeOutCubic" });
      };
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section id="experience" ref={sectionRef} class="relative py-24 bg-[#0d0d0e] grid-bg-dense">
      <div class="container mx-auto px-4">
        <div class="mb-16">
          <div class="section-marker mb-4">{d.experience.marker}</div>
          <h2 class="section-title">
            {d.experience.titleA} <span class="accent">{d.experience.titleB}</span>
          </h2>
          <p class="section-cmd">
            <span class="text-emerald-500">$</span> {d.experience.cmd}
          </p>
        </div>

        <div class="relative max-w-5xl mx-auto">
          <div
            ref={lineRef}
            class="hidden md:block absolute left-1/2 top-0 bottom-0 w-px origin-top"
            style="background: linear-gradient(to bottom, transparent 0%, var(--accent-mint) 8%, var(--accent-mint) 92%, transparent 100%); transform: scaleY(0);"
          ></div>

          <div class="space-y-12 md:space-y-16">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={exp.id}
                  class={`exp-item opacity-0 grid md:grid-cols-2 gap-8 items-start relative`}
                >
                  <div class={`${isLeft ? "md:text-right md:pr-12" : "md:order-2 md:pl-12"}`}>
                    <div class="font-mono text-xs text-amber uppercase tracking-widest mb-2">
                      {exp.period.start}
                    </div>
                    <div class="font-mono text-xs text-zinc-600">
                      → {exp.period.end ?? d.experience.inProgress}
                    </div>
                    <div class="mt-2 font-mono text-xs text-zinc-700">
                      {exp.period.end
                        ? `~${calculateYears(exp.period.start, exp.period.end)} ${d.experience.yearsShort}`
                        : d.experience.inProgress}
                    </div>
                  </div>

                  <div class="hidden md:block absolute left-1/2 top-2 -translate-x-1/2">
                    <div class="w-3 h-3 bg-emerald-500 rounded-full ring-4 ring-[#0d0d0e] shadow-[0_0_12px_rgba(74,222,128,0.6)]"></div>
                  </div>

                  <div class={`${isLeft ? "md:pl-12" : "md:order-1 md:pr-12 md:text-right"}`}>
                    <div class="card-hover bg-[#111113] border border-zinc-900 rounded-lg p-6 relative group">
                      <div class={`flex items-center gap-2 mb-3 font-mono text-xs ${isLeft ? "" : "md:justify-end"}`}>
                        <span class="text-zinc-600">{d.experience.commitLabel}</span>
                        <span class="text-amber">{exp.id.slice(0, 7)}</span>
                      </div>

                      <h3 class="font-display text-xl font-semibold text-white mb-1">
                        {exp.role}
                      </h3>
                      <div class={`flex items-center gap-2 mb-4 ${isLeft ? "" : "md:justify-end"}`}>
                        <span class="text-emerald-400 font-mono text-sm">@</span>
                        <span class="text-zinc-400 font-mono text-sm">{exp.company}</span>
                      </div>

                      <p class="text-zinc-500 text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      <ul class={`space-y-1.5 mb-4 text-sm text-zinc-400 ${isLeft ? "" : "md:text-right"}`}>
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} class={`flex items-start gap-2 ${isLeft ? "" : "md:flex-row-reverse md:gap-2"}`}>
                            <span class="text-emerald-500 mt-0.5">▹</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      <div class={`flex flex-wrap gap-1.5 ${isLeft ? "" : "md:justify-end"}`}>
                        {exp.tech.map((tech) => (
                          <span
                            key={tech}
                            class="font-mono text-xs px-2 py-1 border border-zinc-800 rounded text-zinc-400 hover:border-amber/50 hover:text-amber transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div class="mt-16 max-w-5xl mx-auto font-mono text-sm">
          <span class="text-emerald-500">$</span>
          <span class="text-zinc-500 ml-2">{d.experience.countLine}</span>
          <span class="text-amber ml-2">{experiences.length}</span>
        </div>
      </div>
    </section>
  );
}

function calculateYears(start: string, end: string): number {
  const startYear = new Date(start).getFullYear();
  const endYear = new Date(end).getFullYear();
  return endYear - startYear;
}