import { useEffect, useRef } from "preact/hooks";
import anime from "animejs";
import { skills, categories } from "../content/skills.ts";

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <section id="skills" ref={sectionRef} class="relative py-24 bg-[#0a0a0b]">
      <div class="container mx-auto px-4">
        {/* Section marker */}
        <div class="mb-12">
          <div class="section-marker mb-4">01 // Stack</div>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            Technical <span class="gradient-text">arsenal</span>
          </h2>
          <p class="text-zinc-500 max-w-xl font-mono text-sm">
            <span class="text-emerald-500">$</span> ls ./skills --sort=proficiency --format=table
          </p>
        </div>

        {/* Terminal-style skill list */}
        <div class="bg-[#111113] border border-zinc-900 rounded-lg overflow-hidden">
          {/* Terminal header */}
          <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-[#0d0d0f]">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
              <span class="font-mono text-xs text-zinc-500 ml-3">
                skills --all --years
              </span>
            </div>
            <span class="font-mono text-xs text-zinc-600">
              {skills.length} entries
            </span>
          </div>

          {/* Skill rows grouped by category */}
          <div class="divide-y divide-zinc-900">
            {categories.map((category) => (
              <div key={category.id} class="px-4 md:px-6 py-5">
                {/* Category header */}
                <div class="flex items-center gap-3 mb-4">
                  <span class="font-mono text-xs text-amber uppercase tracking-widest">
                    ▸ {category.label}
                  </span>
                  <span class="flex-1 h-px bg-zinc-900"></span>
                  <span class="font-mono text-xs text-zinc-600">
                    [
                    {skills.filter((s) => s.category === category.id).length}
                    ]
                  </span>
                </div>

                {/* Skills grid */}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {skills
                    .filter((s) => s.category === category.id)
                    .map((skill) => (
                      <div
                        key={skill.id}
                        class="skill-row opacity-0 grid grid-cols-[1.5rem_1fr_3rem] items-center gap-3 group"
                      >
                        <span class="font-mono text-emerald-500/70 group-hover:text-emerald-400">
                          ▶
                        </span>
                        <div class="min-w-0">
                          <div class="flex items-baseline justify-between mb-1.5">
                            <span class="font-mono text-sm text-zinc-300 group-hover:text-white transition-colors truncate">
                              {skill.name}
                            </span>
                          </div>
                          <div class="skill-bar-track">
                            <div
                              class="skill-bar-fill"
                              data-level={skill.level * 20}
                              style="width: 0%"
                            ></div>
                          </div>
                        </div>
                        <span class="font-mono text-xs text-zinc-500 text-right tabular-nums">
                          {skill.level}/5
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal footer */}
          <div class="flex items-center justify-between px-4 py-2 border-t border-zinc-900 bg-[#0d0d0f] font-mono text-xs">
            <span class="text-zinc-600">
              <span class="text-emerald-500">●</span> loaded
            </span>
            <span class="text-zinc-600">utf-8 · main · ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}