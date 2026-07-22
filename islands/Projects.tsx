import { useState } from "preact/hooks";
import { projects } from "../content/projects.ts";

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="projects" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Featured Projects
          </h2>
          <p class="text-slate-600 max-w-2xl mx-auto">
            Selected work demonstrating technical expertise
          </p>
          <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              class="group relative bg-slate-900 rounded-2xl overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={project.image}
                alt={project.title}
                class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>

              <div
                class={`absolute bottom-0 left-0 right-0 p-6 transition-transform duration-300 ${
                  hoveredId !== project.id ? "translate-y-4" : ""
                }`}
              >
                <h3 class="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p class="text-slate-300 mb-4">{project.description}</p>

                <p
                  class={`text-slate-400 text-sm mb-4 transition-opacity duration-300 ${
                    hoveredId === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {project.longDescription}
                </p>

                <div class="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div class="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener"
                      class="text-slate-400 hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener"
                      class="text-slate-400 hover:text-white transition-colors"
                    >
                      Live Demo
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
