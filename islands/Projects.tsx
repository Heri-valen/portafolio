import { useEffect, useRef, useState } from "preact/hooks";
import anime from "animejs";
import { projects, projectCategories, type ProjectCategory } from "../content/projects.ts";
import { t } from "../lib/i18n.ts";

/* ─────────────────────────────────────────────────────────────
   SKETCHED DIAGRAMS — One per category, hand-drawn aesthetic
   ───────────────────────────────────────────────────────────── */
function WebSketch({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 80" class="w-full h-full">
      <rect x="10" y="10" width="100" height="60" rx="2" fill="none" stroke={color} stroke-width="1" opacity="0.6" />
      <rect x="10" y="10" width="100" height="8" fill={color} opacity="0.2" />
      <circle cx="16" cy="14" r="1.5" fill={color} opacity="0.8" />
      <circle cx="22" cy="14" r="1.5" fill={color} opacity="0.8" />
      <circle cx="28" cy="14" r="1.5" fill={color} opacity="0.8" />
      <line x1="20" y1="28" x2="50" y2="28" stroke={color} stroke-width="0.5" opacity="0.4" />
      <line x1="20" y1="34" x2="70" y2="34" stroke={color} stroke-width="0.5" opacity="0.4" />
      <rect x="20" y="42" width="35" height="20" fill="none" stroke={color} stroke-width="0.8" opacity="0.5" stroke-dasharray="2 1" />
      <rect x="65" y="42" width="35" height="20" fill="none" stroke={color} stroke-width="0.8" opacity="0.5" stroke-dasharray="2 1" />
    </svg>
  );
}

function MobileSketch({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 80" class="w-full h-full">
      <rect x="45" y="5" width="30" height="70" rx="4" fill="none" stroke={color} stroke-width="1" opacity="0.6" />
      <rect x="49" y="10" width="22" height="50" fill={color} opacity="0.15" />
      <line x1="52" y1="18" x2="68" y2="18" stroke={color} stroke-width="0.5" opacity="0.4" />
      <line x1="52" y1="22" x2="65" y2="22" stroke={color} stroke-width="0.5" opacity="0.4" />
      <rect x="52" y="28" width="16" height="10" fill="none" stroke={color} stroke-width="0.6" opacity="0.5" />
      <line x1="52" y1="42" x2="68" y2="42" stroke={color} stroke-width="0.5" opacity="0.4" />
      <line x1="52" y1="46" x2="64" y2="46" stroke={color} stroke-width="0.5" opacity="0.4" />
      <circle cx="60" cy="68" r="3" fill="none" stroke={color} stroke-width="0.6" opacity="0.6" />
      {/* Touch ripple */}
      <circle cx="60" cy="33" r="6" fill="none" stroke={color} stroke-width="0.4" opacity="0.3" stroke-dasharray="2 2" />
      <circle cx="60" cy="33" r="10" fill="none" stroke={color} stroke-width="0.4" opacity="0.2" stroke-dasharray="2 2" />
    </svg>
  );
}

function AISketch({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 80" class="w-full h-full">
      {/* Nodes */}
      <circle cx="20" cy="20" r="3" fill={color} opacity="0.8" />
      <circle cx="100" cy="20" r="3" fill={color} opacity="0.8" />
      <circle cx="60" cy="15" r="4" fill={color} opacity="1" />
      <circle cx="20" cy="60" r="3" fill={color} opacity="0.8" />
      <circle cx="100" cy="60" r="3" fill={color} opacity="0.8" />
      <circle cx="60" cy="65" r="4" fill={color} opacity="1" />
      <circle cx="60" cy="40" r="5" fill="none" stroke={color} stroke-width="1" opacity="0.9" />
      <circle cx="60" cy="40" r="8" fill="none" stroke={color} stroke-width="0.6" opacity="0.5" stroke-dasharray="2 2" />
      {/* Connections */}
      <line x1="20" y1="20" x2="60" y2="15" stroke={color} stroke-width="0.5" opacity="0.4" />
      <line x1="100" y1="20" x2="60" y2="15" stroke={color} stroke-width="0.5" opacity="0.4" />
      <line x1="60" y1="15" x2="60" y2="40" stroke={color} stroke-width="0.5" opacity="0.4" />
      <line x1="20" y1="60" x2="60" y2="65" stroke={color} stroke-width="0.5" opacity="0.4" />
      <line x1="100" y1="60" x2="60" y2="65" stroke={color} stroke-width="0.5" opacity="0.4" />
      <line x1="60" y1="65" x2="60" y2="40" stroke={color} stroke-width="0.5" opacity="0.4" />
      <line x1="20" y1="20" x2="60" y2="40" stroke={color} stroke-width="0.5" opacity="0.3" stroke-dasharray="2 2" />
      <line x1="100" y1="20" x2="60" y2="40" stroke={color} stroke-width="0.5" opacity="0.3" stroke-dasharray="2 2" />
    </svg>
  );
}

const CATEGORY_META: Record<ProjectCategory, { color: string; sketch: any; metric: string }> = {
  web: { color: "#4ade80", sketch: WebSketch, metric: "stack" },
  mobile: { color: "#fbbf24", sketch: MobileSketch, metric: "platform" },
  ai: { color: "#a78bfa", sketch: AISketch, metric: "model" },
};

interface ProjectStat {
  label: string;
  value: string;
}

const PROJECT_STATS: Record<string, ProjectStat[]> = {
  "ecommerce-headless": [
    { label: "skus", value: "3K" },
    { label: "uptime", value: "99.9%" },
    { label: "checkout_ms", value: "412" },
  ],
  "wp-multisite": [
    { label: "sites", value: "12" },
    { label: "plugins", value: "4" },
    { label: "themes", value: "3" },
  ],
  "laravel-saas": [
    { label: "tenants", value: "240+" },
    { label: "jobs_per_day", value: "8K" },
    { label: "p99_ms", value: "120" },
  ],
  "django-api": [
    { label: "endpoints", value: "180" },
    { label: "requests_per_s", value: "1.2K" },
    { label: "docs", value: "100%" },
  ],
  "banking-app": [
    { label: "platforms", value: "iOS+Android" },
    { label: "biometric", value: "✓" },
    { label: "rating", value: "4.9" },
  ],
  "fitness-app": [
    { label: "platforms", value: "iOS+Android" },
    { label: "sync", value: "real-time" },
    { label: "models", value: "ML" },
  ],
  "ai-support-agent": [
    { label: "tickets_per_mo", value: "50K" },
    { label: "tools", value: "12" },
    { label: "autonomy", value: "92%" },
  ],
  "ai-pipeline": [
    { label: "docs_per_mo", value: "100K" },
    { label: "ocr_acc", value: "97%" },
    { label: "queue", value: "async" },
  ],
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const d = t();
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = filter === "all"
    ? projects
    : projects.filter((p) => p.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Section entrance
          anime({
            targets: ".proj-marker",
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 600,
          });
          anime({
            targets: ".proj-title",
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 700,
            delay: 100,
          });

          // Folder tabs stagger
          anime({
            targets: ".folder-tab",
            opacity: [0, 1],
            translateY: [-15, 0],
            rotate: [-3, 0],
            duration: 500,
            delay: anime.stagger(60, { start: 300 }),
            easing: "easeOutBack",
          });

          // Specimen cards — staggered slide up
          anime({
            targets: ".specimen",
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.95, 1],
            duration: 700,
            easing: "easeOutExpo",
            delay: anime.stagger(100, { start: 500 }),
          });

          // Numbered badges — count up
          anime({
            targets: ".specimen-num",
            opacity: [0, 1],
            scale: [0, 1],
            duration: 600,
            delay: anime.stagger(120, { start: 700 }),
            easing: "easeOutBack",
          });

          // Sketched diagrams draw-in (stroke-dasharray)
          anime({
            targets: ".specimen-sketch svg *",
            opacity: [0, (el: any) => parseFloat(getComputedStyle(el).opacity || "1")],
            duration: 800,
            delay: anime.stagger(15, { start: 800 }),
            easing: "easeOutQuad",
          });

          // Metric counters
          anime({
            targets: ".metric-pill",
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 500,
            delay: anime.stagger(50, { start: 1000 }),
          });

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  // Re-animate when filter changes
  useEffect(() => {
    anime.remove(".specimen");
    anime({
      targets: ".specimen",
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.97, 1],
      duration: 450,
      easing: "easeOutExpo",
      delay: anime.stagger(70),
    });
    anime({
      targets: ".specimen-num",
      scale: [0.5, 1],
      duration: 500,
      delay: anime.stagger(80),
      easing: "easeOutBack",
    });
  }, [filter]);

  // Hover: expand specimen (lift + glow)
  useEffect(() => {
    if (!hoveredId) return;
    anime({
      targets: `.specimen[data-id="${hoveredId}"]`,
      translateY: -8,
      duration: 300,
      easing: "easeOutCubic",
    });
    anime({
      targets: `.specimen-svg-overlay[data-id="${hoveredId}"]`,
      opacity: 1,
      duration: 300,
    });
  }, [hoveredId]);

  useEffect(() => {
    if (hoveredId) {
      anime({
        targets: `.specimen[data-id="${hoveredId}"]`,
        translateY: 0,
        duration: 300,
        easing: "easeOutCubic",
      });
      anime({
        targets: `.specimen-svg-overlay[data-id="${hoveredId}"]`,
        opacity: 0,
        duration: 300,
      });
    }
  }, [hoveredId]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      class="relative py-24 bg-[#0a0a0b] overflow-hidden"
    >
      {/* Paper grid texture */}
      <div
        class="absolute inset-0 opacity-20 pointer-events-none"
        style="background-image: linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px); background-size: 24px 24px;"
      >
      </div>

      {/* Tape pieces decoration */}
      <div class="absolute top-32 left-12 w-24 h-6 bg-amber/20 rotate-[-12deg] backdrop-blur-sm border border-amber/30 pointer-events-none hidden md:block"></div>
      <div class="absolute top-48 right-16 w-20 h-6 bg-mint/20 rotate-[8deg] backdrop-blur-sm border border-mint/30 pointer-events-none hidden md:block"></div>

      <div class="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div class="mb-12 max-w-3xl">
          <div class="proj-marker opacity-0 flex items-center gap-3 mb-4">
            <span class="font-mono text-xs text-amber uppercase tracking-[0.2em] border border-amber/30 px-2 py-1 rounded">
              {d.projects.marker}
            </span>
            <span class="font-mono text-[10px] text-zinc-600">
              field-research · est.2014
            </span>
          </div>
          <h2 class="proj-title opacity-0 font-display text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {d.projects.titleA}{" "}
            <span class="gradient-text italic">{d.projects.titleB}</span>
          </h2>
          <p class="text-zinc-500 max-w-xl font-mono text-sm pl-3 border-l-2 border-emerald-500/40">
            <span class="text-emerald-500">$</span> {d.projects.cmd}
          </p>
        </div>

        {/* Folder tabs — physical folder metaphor */}
        <div class="mb-10 flex flex-wrap items-end gap-1 font-mono">
          <button
            type="button"
            onClick={() => setFilter("all")}
            class={`folder-tab opacity-0 px-4 py-2 rounded-t-lg border-t border-x transition-all relative ${
              filter === "all"
                ? "bg-[#111113] border-zinc-800 text-white"
                : "bg-[#0a0a0b] border-zinc-900 text-zinc-600 hover:text-zinc-300 hover:bg-[#0d0d0d]"
            }`}
            style={filter === "all" ? "margin-bottom: -1px; border-bottom: 1px solid #111113;" : ""}
          >
            <span class="text-xs uppercase tracking-widest">*.</span>
            <span class="ml-1">{d.projects.filters.all}</span>
            <span class="ml-2 text-[10px] text-zinc-600">[{projects.length}]</span>
          </button>
          {projectCategories.map((c) => {
            const meta = CATEGORY_META[c.id];
            const isActive = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                class={`folder-tab opacity-0 px-4 py-2 rounded-t-lg border-t border-x transition-all ${
                  isActive
                    ? "bg-[#111113] border-zinc-800 text-white"
                    : "bg-[#0a0a0b] border-zinc-900 text-zinc-600 hover:text-zinc-300 hover:bg-[#0d0d0d]"
                }`}
                style={isActive ? "margin-bottom: -1px; border-bottom: 1px solid #111113;" : ""}
              >
                <span
                  class="inline-block w-1.5 h-1.5 rounded-full mr-2"
                  style={`background: ${meta.color};`}
                >
                </span>
                <span class="text-xs uppercase tracking-widest">
                  {c.label.toLowerCase()}
                </span>
                <span class="ml-2 text-[10px] text-zinc-600">
                  [{projects.filter((p) => p.category === c.id).length}]
                </span>
              </button>
            );
          })}

          {/* Ruler line */}
          <div class="flex-1 h-px bg-zinc-900 mb-0"></div>
        </div>

        {/* Filter active underline (folder body) */}
        <div class="bg-[#111113] border border-zinc-900 rounded-lg rounded-tl-none p-6 md:p-8 -mt-px">
          {/* Specimens grid */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, idx) => {
              const meta = CATEGORY_META[project.category];
              const Sketch = meta.sketch;
              const stats = PROJECT_STATS[project.id] ?? [];
              const isExpanded = expandedId === project.id;
              const isHovered = hoveredId === project.id;

              return (
                <article
                  key={project.id}
                  data-id={project.id}
                  class={`specimen opacity-0 group relative bg-[#0d0d0f] border border-zinc-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    isHovered ? "border-zinc-700" : ""
                  }`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                >
                  {/* Specimen header — like a museum label */}
                  <div
                    class="px-4 py-2 border-b border-zinc-900 flex items-center justify-between"
                    style={`background: linear-gradient(90deg, ${meta.color}10, transparent);`}
                  >
                    <div class="flex items-center gap-2">
                      <span
                        class="specimen-num font-mono text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center"
                        style={`background: ${meta.color}; color: #0a0a0b;`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span class="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                        SPECIMEN · {project.category}
                      </span>
                    </div>
                    <span class="font-mono text-[10px] text-zinc-700">
                      #{project.id.slice(0, 4)}
                    </span>
                  </div>

                  {/* Sketched diagram */}
                  <div class="specimen-sketch relative aspect-[3/2] bg-[#0a0a0b] border-b border-zinc-900 overflow-hidden">
                    <div class="absolute inset-0 opacity-80 p-4">
                      <Sketch color={meta.color} />
                    </div>
                    {/* Grid overlay */}
                    <div
                      class="absolute inset-0 opacity-20 pointer-events-none"
                      style="background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 16px 16px;"
                    >
                    </div>
                    {/* Corner crosshairs */}
                    <div class="absolute top-2 left-2 w-3 h-3 border-t border-l border-zinc-700"></div>
                    <div class="absolute top-2 right-2 w-3 h-3 border-t border-r border-zinc-700"></div>
                    <div class="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-zinc-700"></div>
                    <div class="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-zinc-700"></div>

                    {/* Hover glow */}
                    <div
                      class="specimen-svg-overlay absolute inset-0 opacity-0 pointer-events-none transition-opacity"
                      data-id={project.id}
                      style={`background: radial-gradient(circle at center, ${meta.color}15, transparent 70%);`}
                    >
                    </div>
                  </div>

                  {/* Body */}
                  <div class="p-5">
                    <h3 class="font-display text-xl font-bold text-white mb-2 leading-tight">
                      {project.title}
                    </h3>
                    <p class="text-zinc-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Metrics pills */}
                    <div class="flex flex-wrap gap-1.5 mb-4">
                      {stats.map((s) => (
                        <span
                          key={s.label}
                          class="metric-pill font-mono text-[10px] px-2 py-1 border border-zinc-800 rounded text-zinc-500 flex items-center gap-1.5"
                        >
                          <span class="text-zinc-700">{s.label}:</span>
                          <span
                            class="font-bold"
                            style={`color: ${meta.color};`}
                          >
                            {s.value}
                          </span>
                        </span>
                      ))}
                    </div>

                    {/* Tags as post-its */}
                    <div class="flex flex-wrap gap-1 mb-4">
                      {project.tags.map((tag, i) => {
                        const rotations = [-2, 1, -1, 2, -1];
                        const colors = [
                          "bg-amber/10 border-amber/30 text-amber",
                          "bg-mint/10 border-mint/30 text-mint",
                          "bg-violet/10 border-violet/30 text-violet",
                          "bg-coral/10 border-coral/30 text-coral",
                        ];
                        const colorCls = colors[i % colors.length];
                        return (
                          <span
                            key={tag}
                            class={`font-mono text-[10px] px-1.5 py-0.5 border rounded ${colorCls}`}
                            style={`transform: rotate(${rotations[i % rotations.length]}deg);`}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>

                    {/* Expandable details */}
                    <div
                      class={`grid transition-all duration-500 ${
                        isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div class="overflow-hidden">
                        <div class="pt-4 border-t border-dashed border-zinc-800 text-zinc-400 text-xs leading-relaxed font-mono">
                          <span style={`color: ${meta.color};`}>▸</span>{" "}
                          {project.longDescription}
                        </div>
                      </div>
                    </div>

                    {/* Action bar */}
                    <div class="flex items-center gap-3 pt-3 border-t border-zinc-900 font-mono text-xs">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(isExpanded ? null : project.id);
                        }}
                        class="text-zinc-500 hover:text-zinc-200 transition-colors flex items-center gap-1"
                      >
                        <span>{isExpanded ? "▴" : "▾"}</span>
                        <span>{isExpanded ? "collapse" : "expand"}</span>
                      </button>
                      <span class="text-zinc-800">·</span>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener"
                          onClick={(e) => e.stopPropagation()}
                          class="text-zinc-500 hover:text-mint transition-colors"
                        >
                          [code]
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener"
                          onClick={(e) => e.stopPropagation()}
                          class="text-zinc-500 hover:text-amber transition-colors"
                        >
                          [demo]
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Corner ribbon */}
                  <div
                    class="absolute top-0 right-0 w-12 h-12 pointer-events-none"
                    style={`background: linear-gradient(135deg, transparent 50%, ${meta.color}40 50%);`}
                  >
                  </div>
                </article>
              );
            })}
          </div>

          {/* Footer of folder */}
          <div class="mt-6 pt-4 border-t border-dashed border-zinc-900 flex items-center justify-between font-mono text-[10px] text-zinc-600">
            <span>
              <span class="text-mint">●</span> {filtered.length} specimens ·
              sorted by recency
            </span>
            <span>last updated: today</span>
          </div>
        </div>

        {/* "More coming" footer */}
        <div class="mt-12 text-center font-mono text-xs text-zinc-600">
          <span class="text-amber">▸</span> more in production · check{" "}
          <a
            href="https://github.com/Heri-valen"
            target="_blank"
            rel="noopener"
            class="text-emerald-500 hover:text-emerald-400 underline underline-offset-4 decoration-emerald-500/30"
          >
            github.com/Heri-valen
          </a>
        </div>
      </div>
    </section>
  );
}