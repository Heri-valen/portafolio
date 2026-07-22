import { useEffect } from "preact/hooks";
import anime from "animejs";
import { experiences } from "../content/experience.ts";

export default function Experience() {
  useEffect(() => {
    anime({
      targets: ".experience-card",
      opacity: [0, 1],
      translateX: [-30, 0],
      duration: 600,
      easing: "easeOutCubic",
      delay: anime.stagger(150),
    });
  }, []);

  return (
    <section id="experience" class="py-20 bg-slate-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Work Experience
          </h2>
          <p class="text-slate-600 max-w-2xl mx-auto">
            A decade of building production applications
          </p>
          <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div class="max-w-3xl mx-auto space-y-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              class="experience-card relative pl-8 border-l-2 border-blue-500/30"
            >
              <div class="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>

              <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div class="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 class="text-xl font-semibold text-slate-900">
                      {exp.role}
                    </h3>
                    <p class="text-blue-500 font-medium">{exp.company}</p>
                  </div>
                  <div class="text-sm text-slate-500">
                    {exp.period.start} - {exp.period.end ?? "Present"}
                  </div>
                </div>

                <p class="text-slate-600 mb-4">{exp.description}</p>

                <ul class="space-y-2 mb-4">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} class="flex items-start gap-2 text-slate-600">
                      <span class="text-blue-500 mt-1">▹</span>
                      {achievement}
                    </li>
                  ))}
                </ul>

                <div class="flex flex-wrap gap-2">
                  {exp.tech.map((tech) => (
                    <span
                      key={tech}
                      class="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
