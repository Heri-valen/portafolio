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
            targets: ".skill-card",
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.95, 1],
            duration: 600,
            easing: "easeOutCubic",
            delay: anime.stagger(50),
          });

          anime({
            targets: ".skill-bar-fill",
            width: (el: any) => el.dataset.level + "%",
            duration: 1200,
            easing: "easeOutExpo",
            delay: anime.stagger(50),
          });

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <section id="skills" ref={sectionRef} class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Technical Skills
          </h2>
          <p class="text-slate-600 max-w-2xl mx-auto">
            Technologies and tools I work with daily to build robust applications
          </p>
          <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div class="space-y-16">
          {categories.map((category) => (
            <div key={category.id}>
              <h3 class="text-xl font-semibold text-slate-900 mb-6">
                {category.label}
              </h3>

              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {skills
                  .filter((s) => s.category === category.id)
                  .map((skill) => (
                    <div
                      key={skill.id}
                      class="skill-card group relative bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
                    >
                      <div class="mb-3 text-2xl">{skill.icon}</div>
                      <h4 class="font-semibold text-slate-900 mb-1 text-sm">
                        {skill.name}
                      </h4>
                      <div class="flex items-center gap-2">
                        <div class="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            class="skill-bar-fill h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                            data-level={skill.level * 20}
                            style="width: 0%"
                          ></div>
                        </div>
                        <span class="text-xs text-slate-500">
                          {skill.level}/5
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
