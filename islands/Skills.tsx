import { useEffect, useRef } from "preact/hooks";
import anime from "animejs";
import { skills, categories } from "../content/skills.ts";
import { t } from "../lib/i18n.ts";

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const d = t();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          anime({
            targets: ".skill-row",
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 500,
            easing: "easeOutCubic",
            delay: anime.stagger(40),
          });
          anime({
            targets: ".skill-bar-fill",
            width: (el: any) => el.dataset.level + "%",
            duration: 1400,
            easing: "easeOutExpo",
            delay: anime.stagger(40, { start: 200 }),
          });
          document.querySelectorAll<HTMLElement>(".skill-counter").forEach((el) => {
            const target = parseInt(el.dataset.target || "0", 10);
            const obj = { v: 0 };
            anime({
              targets: obj,
              v: target,
              round: 1,
              duration: 1200,
              easing: "easeOutExpo",
              delay: 400,
              update: () => { el.textContent = `${obj.v}/5`; },
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  // Subtle 3D tilt
  useEffect(() => {
    const rows = sectionRef.current?.querySelectorAll<HTMLElement>(".skill-row");
    if (!rows) return;
    const cleanups: Array<() => void> = [];
    rows.forEach((row) => {
      const onMove = (e: MouseEvent) => {
        const rect = row.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        anime({
          targets: row,
          rotateX: -y * 4,
          rotateY: x * 4,
          duration: 200,
          easing: "easeOutQuad",
        });
      };
      const onLeave = () => {
        anime({ targets: row, rotateX: 0, rotateY: 0, duration: 500, easing: "easeOutElastic(1, .7)" });
      };
      row.addEventListener("mousemove", onMove);
      row.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        row.removeEventListener("mousemove", onMove);
        row.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section id="skills" ref={sectionRef} class="relative py-24 bg-[#0a0a0b]" style="perspective: 1000px;">
      <div class="container mx-auto px-4">
        <div class="mb-12">
          <div class="section-marker mb-4">{d.skills.marker}</div>
          <h2 class="section-title">
            {d.skills.titleA} <span class="accent">{d.skills.titleB}</span>
          </h2>
          <p class="section-cmd">
            <span class="text-emerald-500">$</span> {d.skills.cmd}
          </p>
        </div>

        <div class="bento glass overflow-hidden">
          <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-900">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
              <span class="font-mono text-xs text-zinc-500 ml-3">skills --all --years</span>
            </div>
            <span class="font-mono text-xs text-zinc-600">
              {skills.length} {d.skills.entries}
            </span>
          </div>

          <div class="divide-y divide-zinc-900">
            {categories.map((category) => (
              <div key={category.id} class="px-4 md:px-6 py-5">
                <div class="flex items-center gap-3 mb-4">
                  <span class="font-mono text-xs text-amber uppercase tracking-widest">
                    ▸ {d.skills.categories[category.id as keyof typeof d.skills.categories]}
                  </span>
                  <span class="flex-1 h-px bg-zinc-900"></span>
                  <span class="font-mono text-xs text-zinc-600">
                    [{skills.filter((s) => s.category === category.id).length}]
                  </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {skills
                    .filter((s) => s.category === category.id)
                    .map((skill) => (
                      <div
                        key={skill.id}
                        class="skill-row opacity-0 grid grid-cols-[1.5rem_1fr_3rem] items-center gap-3 group p-2 -m-2 rounded transition-colors hover:bg-emerald-500/[0.03]"
                        style="transform-style: preserve-3d;"
                      >
                        <span class="font-mono text-emerald-500/70 group-hover:text-emerald-400 text-lg">
                          {skill.icon}
                        </span>
                        <div class="min-w-0">
                          <div class="flex items-baseline justify-between mb-1.5">
                            <span class="font-mono text-sm text-zinc-300 group-hover:text-white transition-colors truncate">
                              {skill.name}
                            </span>
                          </div>
                          <div class="skill-bar-track">
                            <div class="skill-bar-fill" data-level={skill.level * 20} style="width: 0%"></div>
                          </div>
                        </div>
                        <span
                          class="font-mono text-xs text-zinc-500 text-right tabular-nums skill-counter"
                          data-target={skill.level}
                        >
                          0/5
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div class="flex items-center justify-between px-4 py-2 border-t border-zinc-900 font-mono text-xs">
            <span class="text-zinc-600">
              <span class="text-emerald-500">●</span> {d.skills.loaded}
            </span>
            <span class="text-zinc-600">{d.skills.ready}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
