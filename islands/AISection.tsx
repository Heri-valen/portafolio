import { useEffect, useRef } from "preact/hooks";
import anime from "animejs";
import { t } from "../lib/i18n.ts";

export default function AISection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const d = t();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Pillar cards
          anime({
            targets: ".ai-pillar",
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.96, 1],
            duration: 700,
            easing: "easeOutExpo",
            delay: anime.stagger(80),
          });

          // Flow steps
          anime({
            targets: ".flow-step",
            opacity: [0, 1],
            scale: [0.5, 1],
            duration: 500,
            easing: "easeOutBack",
            delay: anime.stagger(140, { start: 600 }),
          });

          // Flow connections
          anime({
            targets: ".flow-conn",
            strokeDashoffset: [200, 0],
            opacity: [0, 1],
            duration: 800,
            easing: "easeInOutQuad",
            delay: anime.stagger(80, { start: 800 }),
          });

          // Neural graph nodes pulse
          anime({
            targets: ".neural-node",
            opacity: [0.3, 1],
            scale: [0.8, 1],
            duration: 1800,
            direction: "alternate",
            loop: true,
            easing: "easeInOutSine",
            delay: anime.stagger(120),
          });

          // Neural edges
          anime({
            targets: ".neural-edge",
            opacity: [0.1, 0.6],
            duration: 2000,
            direction: "alternate",
            loop: true,
            easing: "easeInOutSine",
            delay: anime.stagger(60),
          });

          // Typing effect on stream
          const streamEl = document.querySelector(".ai-stream");
          if (streamEl) {
            const text = streamEl.textContent ?? "";
            streamEl.textContent = "";
            let i = 0;
            const interval = setInterval(() => {
              streamEl.textContent = text.slice(0, i++);
              if (i > text.length) clearInterval(interval);
            }, 18);
          }

          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  // Neural graph nodes (positions in 0-100 viewbox)
  const nodes = [
    { x: 15, y: 20 }, { x: 30, y: 50 }, { x: 12, y: 75 },
    { x: 50, y: 30 }, { x: 52, y: 65 },
    { x: 75, y: 20 }, { x: 88, y: 45 }, { x: 80, y: 75 },
    { x: 45, y: 88 }, { x: 65, y: 88 },
  ];
  const edges = [
    [0, 1], [1, 3], [0, 2], [2, 4], [3, 5], [5, 6], [6, 7],
    [4, 7], [3, 8], [4, 9], [6, 9], [8, 9], [1, 4],
  ];

  return (
    <section
      id="ai"
      ref={sectionRef}
      class="relative py-24 bg-[#0a0a0b] overflow-hidden noise"
    >
      {/* Neural graph background */}
      <svg
        class="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {edges.map(([a, b], i) => (
          <line
            key={i}
            class="neural-edge"
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="#4ade80"
            stroke-width="0.15"
            stroke-dasharray="2 2"
            opacity="0.2"
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            class="neural-node"
            cx={n.x}
            cy={n.y}
            r="0.8"
            fill="#4ade80"
            opacity="0.4"
          />
        ))}
      </svg>

      <div class="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div class="mb-12">
          <div class="section-marker mb-4">{d.ai.marker}</div>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            {d.ai.titleA} <span class="gradient-text">{d.ai.titleB}</span>
          </h2>
          <p class="text-zinc-500 max-w-xl font-mono text-sm">
            <span class="text-emerald-500">$</span> {d.ai.cmd}
          </p>
        </div>

        {/* Bento grid: 5 pillars in asymmetric layout */}
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4 mb-12">
          {/* Pillar 1 — wide */}
          <div class="ai-pillar opacity-0 md:col-span-4 bg-[#111113] border border-zinc-900 rounded-lg p-6 relative overflow-hidden card-hover">
            <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div class="font-mono text-xs text-emerald-500 mb-3">{d.ai.pillars[0].tag}</div>
            <h3 class="font-display text-2xl font-bold text-white mb-3">
              {d.ai.pillars[0].title}
            </h3>
            <p class="text-zinc-400 text-sm leading-relaxed mb-4">
              {d.ai.pillars[0].body}
            </p>
            <div class="font-mono text-[10px] text-zinc-600 border-t border-zinc-900 pt-3">
              {d.ai.pillars[0].meta}
            </div>
          </div>

          {/* Pillar 2 — narrow */}
          <div class="ai-pillar opacity-0 md:col-span-2 bg-[#111113] border border-zinc-900 rounded-lg p-6 relative overflow-hidden card-hover">
            <div class="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
            <div class="font-mono text-xs text-amber mb-3">{d.ai.pillars[1].tag}</div>
            <h3 class="font-display text-lg font-bold text-white mb-3">
              {d.ai.pillars[1].title}
            </h3>
            <p class="text-zinc-400 text-xs leading-relaxed mb-3">
              {d.ai.pillars[1].body}
            </p>
            <div class="font-mono text-[10px] text-zinc-600 border-t border-zinc-900 pt-2">
              {d.ai.pillars[1].meta}
            </div>
          </div>

          {/* Pillar 3 — narrow */}
          <div class="ai-pillar opacity-0 md:col-span-2 bg-[#111113] border border-zinc-900 rounded-lg p-6 relative overflow-hidden card-hover">
            <div class="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl"></div>
            <div class="font-mono text-xs text-violet mb-3">{d.ai.pillars[2].tag}</div>
            <h3 class="font-display text-lg font-bold text-white mb-3">
              {d.ai.pillars[2].title}
            </h3>
            <p class="text-zinc-400 text-xs leading-relaxed mb-3">
              {d.ai.pillars[2].body}
            </p>
            <div class="font-mono text-[10px] text-zinc-600 border-t border-zinc-900 pt-2">
              {d.ai.pillars[2].meta}
            </div>
          </div>

          {/* Pillar 4 — narrow */}
          <div class="ai-pillar opacity-0 md:col-span-2 bg-[#111113] border border-zinc-900 rounded-lg p-6 relative overflow-hidden card-hover">
            <div class="absolute top-0 right-0 w-24 h-24 bg-coral/10 rounded-full blur-2xl"></div>
            <div class="font-mono text-xs text-coral mb-3">{d.ai.pillars[3].tag}</div>
            <h3 class="font-display text-lg font-bold text-white mb-3">
              {d.ai.pillars[3].title}
            </h3>
            <p class="text-zinc-400 text-xs leading-relaxed mb-3">
              {d.ai.pillars[3].body}
            </p>
            <div class="font-mono text-[10px] text-zinc-600 border-t border-zinc-900 pt-2">
              {d.ai.pillars[3].meta}
            </div>
          </div>

          {/* Pillar 5 — wide */}
          <div class="ai-pillar opacity-0 md:col-span-2 bg-[#111113] border border-zinc-900 rounded-lg p-6 relative overflow-hidden card-hover">
            <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div class="font-mono text-xs text-emerald-500 mb-3">{d.ai.pillars[4].tag}</div>
            <h3 class="font-display text-lg font-bold text-white mb-3">
              {d.ai.pillars[4].title}
            </h3>
            <p class="text-zinc-400 text-xs leading-relaxed mb-3">
              {d.ai.pillars[4].body}
            </p>
            <div class="font-mono text-[10px] text-zinc-600 border-t border-zinc-900 pt-2">
              {d.ai.pillars[4].meta}
            </div>
          </div>
        </div>

        {/* Agent flow diagram */}
        <div class="bg-[#0d0d0f] border border-zinc-900 rounded-lg overflow-hidden">
          {/* Terminal header */}
          <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-[#111113]">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="font-mono text-xs text-zinc-500 ml-3">
                $ {d.ai.flow.title}
              </span>
            </div>
            <span class="font-mono text-[10px] text-emerald-500 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              streaming
            </span>
          </div>

          {/* Flow steps */}
          <div class="relative px-4 md:px-8 py-10">
            <div class="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {d.ai.flow.steps.map((step, i) => (
                <>
                  <div class="flow-step opacity-0 flex flex-col items-center group">
                    <div class="w-16 h-16 md:w-20 md:h-20 rounded-lg border border-emerald-500/30 bg-emerald-500/5 flex flex-col items-center justify-center font-mono hover:border-emerald-400 hover:bg-emerald-500/10 transition-all">
                      <div class="text-[9px] text-emerald-500/60">step {i + 1}</div>
                      <div class="text-xs text-emerald-400 font-bold">{step.label}</div>
                    </div>
                    <div class="mt-2 text-[10px] text-zinc-500 font-mono text-center max-w-[100px]">
                      {step.detail}
                    </div>
                  </div>
                  {i < d.ai.flow.steps.length - 1 && (
                    <svg class="hidden md:block flow-conn opacity-0" width="40" height="20" viewBox="0 0 40 20">
                      <line
                        x1="0" y1="10" x2="32" y2="10"
                        stroke="#4ade80"
                        stroke-width="1"
                        stroke-dasharray="3 2"
                        opacity="0.5"
                      />
                      <polygon points="32,10 38,6 38,14" fill="#4ade80" opacity="0.7" />
                    </svg>
                  )}
                </>
              ))}
            </div>

            {/* Stream output */}
            <div class="mt-8 bg-black/50 border border-zinc-900 rounded p-4 font-mono text-xs">
              <div class="text-zinc-600 mb-1">[stream]</div>
              <div class="text-emerald-400 ai-stream">
                {`→ input: "Build a CSV exporter from the SQLite db"\n→ plan: 4 steps · tools=[sql, fs, csv]\n→ retrieve: schema for `}{`users`}{`, `}{`orders`}{`\n→ execute: SELECT * FROM users → /tmp/export.csv\n→ reflect: schema validated · 1,247 rows · 312KB\n→ respond: file written · ready for download`}
              </div>
            </div>

            {/* Status line */}
            <div class="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-zinc-500">
              <span>{d.ai.flow.output}</span>
              <span class="flex items-center gap-2">
                <span class="status-dot"></span>
                <span>live</span>
              </span>
            </div>
          </div>
        </div>

        {/* Stack marquee */}
        <div class="mt-8 font-mono text-xs text-zinc-500 text-center">
          <span class="text-emerald-500">$ </span>
          <span class="opacity-60">stack</span> = <span class="text-zinc-300">{d.ai.stack}</span>
        </div>
      </div>
    </section>
  );
}