import { useEffect, useRef, useState } from "preact/hooks";
import anime from "animejs";
import { projects, projectCategories, type ProjectCategory } from "../content/projects.ts";
import { t } from "../lib/i18n.ts";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const d = t();
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          anime({
            targets: ".project-card",
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            easing: "easeOutExpo",
            delay: anime.stagger(80),
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  // Re-animate on filter change
  useEffect(() => {
    anime({
      targets: ".project-card",
      opacity: [0, 1],
      scale: [0.96, 1],
      duration: 400,
      easing: "easeOutCubic",
      delay: anime.stagger(40),
    });
  }, [filter]);

  return (
    <section id="projects" ref={sectionRef} class="relative py-24 bg-[#0d0d0e]">
      <div class="container mx-auto px-4">
        <div class="mb-12">
          <div class="section-marker mb-4">{d.projects.marker}</div>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            {d.projects.titleA} <span class="gradient-text">{d.projects.titleB}</span>
          </h2>
          <p class="text-zinc-500 max-w-xl font-mono text-sm">
            <span class="text-emerald-500">$</span> {d.projects.cmd}
          </p>
        </div>

        {/* Filters */}
        <div class="flex flex-wrap gap-2 mb-8 font-mono text-xs">
          <button
            type="button"
            onClick={() => setFilter("all")}
            class={`px-3 py-1.5 border rounded transition-colors ${
              filter === "all"
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
            }`}
          >
            *.{d.projects.filters.all}
          </button>
          {projectCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              class={`px-3 py-1.5 border rounded transition-colors ${
                filter === c.id
                  ? "border-amber bg-amber/10 text-amber"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
              }`}
            >
              {c.label.toLowerCase()}
            </button>
          ))}
          <span class="ml-auto text-zinc-600 self-center">
            [{filtered.length}/{projects.length}]
          </span>
        </div>

        {/* Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <div
              key={project.id}
              class="project-card opacity-0 group rounded-lg overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div class="relative aspect-[4/3] overflow-hidden bg-[#0a0a0b]">
                <img
                  src={project.image}
                  alt={project.title}
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/50 to-transparent"></div>

                {/* Category badge */}
                <div class="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-emerald-400 bg-black/70 px-2 py-1 rounded border border-emerald-500/30">
                  {project.category}
                </div>

                {/* Title overlay */}
                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <h3 class="font-display text-lg font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p class="text-zinc-400 text-xs">{project.description}</p>
                </div>
              </div>

              {/* Body */}
              <div class="p-4 bg-[#111113]">
                <p
                  class={`text-xs text-zinc-400 mb-3 transition-all duration-300 ${
                    hoveredId === project.id ? "max-h-32 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {project.longDescription}
                </p>

                <div class="flex flex-wrap gap-1 mb-3">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      class="font-mono text-[10px] px-1.5 py-0.5 border border-zinc-800 rounded text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span class="font-mono text-[10px] text-zinc-600">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                <div class="flex gap-3 font-mono text-xs">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener"
                      class="text-zinc-500 hover:text-emerald-400 transition-colors"
                    >
                      [{d.projects.code}]
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener"
                      class="text-zinc-500 hover:text-amber transition-colors"
                    >
                      [{d.projects.demo}]
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}