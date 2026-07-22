import { useEffect, useRef } from "preact/hooks";
import anime from "animejs";

export default function MobileShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Phone entrance
          anime({
            targets: ".phone-frame",
            opacity: [0, 1],
            translateY: [60, 0],
            rotate: [8, 0],
            duration: 900,
            easing: "easeOutExpo",
            delay: anime.stagger(120),
          });

          // Floating loop on phones
          anime({
            targets: ".phone-frame",
            translateY: [-8, 8],
            duration: 4000,
            direction: "alternate",
            loop: true,
            easing: "easeInOutSine",
            delay: anime.stagger(300),
          });

          // Info card slide
          anime({
            targets: ".showcase-info > *",
            opacity: [0, 1],
            translateX: [-30, 0],
            duration: 600,
            easing: "easeOutCubic",
            delay: anime.stagger(100),
          });

          // Progress bars
          anime({
            targets: ".metric-bar",
            width: (el: any) => el.dataset.width + "%",
            duration: 1500,
            easing: "easeOutExpo",
            delay: 800,
          });

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
  }, []);

  const stats = [
    { label: "Mobile Apps Shipped", value: "12+", width: 85 },
    { label: "Active Users", value: "50K", width: 70 },
    { label: "Avg. Rating", value: "4.8★", width: 92 },
  ];

  return (
    <section
      id="showcase"
      ref={sectionRef}
      class="relative py-24 bg-[#0a0a0b] overflow-hidden noise"
    >
      {/* Background gradient */}
      <div class="absolute inset-0 grid-bg opacity-30"></div>
      <div class="absolute top-0 left-1/3 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px]"></div>

      <div class="container mx-auto px-4 relative z-10">
        {/* Section marker */}
        <div class="mb-12">
          <div class="section-marker mb-4">03 // Mobile</div>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            Mobile <span class="gradient-text">craft</span>
          </h2>
          <p class="text-zinc-500 max-w-xl font-mono text-sm">
            <span class="text-emerald-500">$</span> show --platform ios,android --type production
          </p>
        </div>

        {/* Main showcase grid */}
        <div class="grid lg:grid-cols-[1fr_2fr] gap-12 items-center">
          {/* LEFT: Info card with photo */}
          <div class="showcase-info space-y-6">
            {/* Photo card */}
            <div class="relative">
              <div class="card-hover bg-[#111113] border border-zinc-900 rounded-lg p-1 overflow-hidden">
                <div class="relative aspect-[4/5] bg-gradient-to-br from-zinc-800 via-zinc-900 to-black rounded overflow-hidden">
                  {/* Placeholder for photo */}
                  <img
                    src="/profile.jpg"
                    alt="Heriberto Valencia"
                    class="w-full h-full object-cover opacity-80"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Fallback decorative content */}
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center">
                      <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center font-display text-4xl font-bold text-black">
                        HV
                      </div>
                      <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                        Senior Engineer
                      </p>
                    </div>
                  </div>

                  {/* Overlay grid */}
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Corner brackets */}
                  <div class="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-emerald-500"></div>
                  <div class="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-emerald-500"></div>
                  <div class="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-emerald-500"></div>
                  <div class="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-emerald-500"></div>

                  {/* Status bar */}
                  <div class="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] text-emerald-400 bg-black/60 px-2 py-0.5 rounded">
                    REC ● 4K
                  </div>
                </div>
              </div>

              {/* Floating tag */}
              <div class="absolute -bottom-3 -right-3 bg-amber text-black font-mono text-xs font-bold px-3 py-1.5 rounded shadow-lg rotate-3">
                v.2026
              </div>
            </div>

            {/* Role info */}
            <div class="space-y-3">
              <div class="font-mono text-xs text-emerald-500 uppercase tracking-widest">
                ~ /profile
              </div>
              <h3 class="font-display text-2xl font-bold text-white">
                Heriberto Valencia
              </h3>
              <p class="font-mono text-sm text-amber">
                Senior Mobile & Full-Stack Engineer
              </p>
              <p class="text-zinc-400 text-sm leading-relaxed">
                Crafting native experiences for iOS & Android with{" "}
                <span class="text-emerald-400 font-mono">Swift</span> and{" "}
                <span class="text-emerald-400 font-mono">Kotlin</span>. 10+ years shipping apps that scale.
              </p>
            </div>

            {/* Stats */}
            <div class="space-y-3 pt-4 border-t border-zinc-900">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div class="flex justify-between mb-1.5 font-mono text-xs">
                    <span class="text-zinc-500">{stat.label}</span>
                    <span class="text-emerald-400 font-bold">{stat.value}</span>
                  </div>
                  <div class="h-1 bg-zinc-900 rounded-sm overflow-hidden">
                    <div
                      class="metric-bar h-full bg-gradient-to-r from-emerald-500 to-amber-500"
                      data-width={stat.width}
                      style="width: 0%"
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech badges */}
            <div class="flex flex-wrap gap-2 pt-2">
              {["Kotlin", "Swift", "Jetpack", "SwiftUI", "Compose"].map((t) => (
                <span
                  key={t}
                  class="font-mono text-xs px-2 py-1 border border-zinc-800 rounded text-zinc-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: Floating phones */}
          <div class="relative h-[600px] md:h-[700px]">
            {/* Decorative bg grid */}
            <div class="absolute inset-0 opacity-20">
              <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <div class="absolute top-3/4 right-1/4 w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-300"></div>
              <div class="absolute bottom-1/4 left-1/2 w-2 h-2 bg-violet-500 rounded-full animate-pulse delay-700"></div>
            </div>

            {/* Phone 1 — Banking App (large, center) */}
            <div class="phone-frame absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0">
              <div class="w-[260px] md:w-[300px] h-[540px] md:h-[620px] bg-black rounded-[3rem] border-[3px] border-zinc-800 p-2 shadow-2xl shadow-emerald-500/20">
                <div class="w-full h-full bg-gradient-to-br from-[#0a0a0b] via-[#111113] to-[#0a0a0b] rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div class="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20"></div>
                  {/* Status bar */}
                  <div class="flex justify-between items-center px-6 pt-3 pb-2 text-[10px] font-mono">
                    <span class="text-emerald-400">9:41</span>
                    <span class="text-zinc-500">●●●●● 5G</span>
                  </div>
                  {/* Banking App UI */}
                  <div class="px-5 pt-8 space-y-4">
                    <div class="font-mono text-[10px] text-zinc-500">
                      BALANCE
                    </div>
                    <div class="font-display text-3xl font-bold text-white">
                      $12,847<span class="text-emerald-400">.50</span>
                    </div>
                    <div class="text-[10px] text-emerald-400 font-mono">
                      ▲ +12.4% this month
                    </div>
                    {/* Card */}
                    <div class="bg-gradient-to-br from-emerald-500/20 to-amber-500/10 border border-emerald-500/30 rounded-lg p-3 mt-4">
                      <div class="font-mono text-[10px] text-zinc-400">
                        •••• 4242
                      </div>
                      <div class="font-mono text-[10px] text-zinc-500 mt-1">
                        HERIBERTO V.
                      </div>
                    </div>
                    {/* Quick actions */}
                    <div class="grid grid-cols-3 gap-2 mt-3">
                      {["Send", "Pay", "Top"].map((a) => (
                        <div
                          key={a}
                          class="bg-zinc-900 border border-zinc-800 rounded p-2 text-center font-mono text-[10px] text-emerald-400"
                        >
                          {a}
                        </div>
                      ))}
                    </div>
                    {/* Transactions */}
                    <div class="mt-4 space-y-2">
                      {["- $42.50", "- $128.00", "+ $3,200"].map((t, i) => (
                        <div
                          key={i}
                          class="flex justify-between font-mono text-[10px] py-1.5 border-b border-zinc-900"
                        >
                          <span class="text-zinc-500">Transaction</span>
                          <span class={t.startsWith("+") ? "text-emerald-400" : "text-zinc-300"}>
                            {t}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 2 — E-Commerce (left, smaller, rotated) */}
            <div class="phone-frame absolute top-[10%] left-[5%] z-20 opacity-0 -rotate-6 scale-90">
              <div class="w-[200px] h-[420px] bg-black rounded-[2.5rem] border-[2px] border-zinc-800 p-1.5 shadow-xl shadow-amber-500/10">
                <div class="w-full h-full bg-[#0a0a0b] rounded-[2rem] overflow-hidden relative p-3 pt-8">
                  <div class="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full"></div>
                  <div class="font-mono text-[9px] text-amber mb-2">SHOP</div>
                  <div class="font-display text-base text-white mb-3">
                    Featured
                  </div>
                  {/* Product cards */}
                  {[
                    { c: "from-emerald-500/30", n: "Item #1" },
                    { c: "from-amber-500/30", n: "Item #2" },
                    { c: "from-violet-500/30", n: "Item #3" },
                  ].map((p, i) => (
                    <div
                      key={i}
                      class={`bg-gradient-to-br ${p.c} to-zinc-900 border border-zinc-800 rounded-lg p-2 mb-2`}
                    >
                      <div class="w-full h-12 bg-zinc-900/50 rounded mb-1"></div>
                      <div class="font-mono text-[9px] text-zinc-400">
                        {p.n}
                      </div>
                      <div class="font-mono text-[10px] text-emerald-400">
                        $99.00
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone 3 — Fitness/Stats (right, smaller, rotated) */}
            <div class="phone-frame absolute bottom-[10%] right-[5%] z-20 opacity-0 rotate-6 scale-90">
              <div class="w-[200px] h-[420px] bg-black rounded-[2.5rem] border-[2px] border-zinc-800 p-1.5 shadow-xl shadow-violet-500/10">
                <div class="w-full h-full bg-[#0a0a0b] rounded-[2rem] overflow-hidden relative p-3 pt-8">
                  <div class="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full"></div>
                  <div class="font-mono text-[9px] text-violet mb-2">ACTIVITY</div>
                  <div class="font-display text-2xl text-white">
                    8,247
                  </div>
                  <div class="font-mono text-[9px] text-zinc-500">
                    steps today
                  </div>
                  {/* Chart placeholder */}
                  <div class="mt-3 h-20 bg-zinc-900 rounded relative overflow-hidden">
                    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 50">
                      <polyline
                        points="0,40 10,35 20,30 30,20 40,25 50,15 60,20 70,10 80,5 90,12 100,8"
                        fill="none"
                        stroke="#a78bfa"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                  <div class="grid grid-cols-2 gap-2 mt-3">
                    {[
                      { l: "Heart", v: "72" },
                      { l: "Cal", v: "1.2K" },
                    ].map((s) => (
                      <div
                        key={s.l}
                        class="bg-zinc-900 border border-zinc-800 rounded p-2"
                      >
                        <div class="font-mono text-[8px] text-zinc-500">
                          {s.l}
                        </div>
                        <div class="font-mono text-xs text-violet">{s.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Connection lines between phones */}
            <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <line
                x1="20%"
                y1="30%"
                x2="50%"
                y2="50%"
                stroke="#4ade80"
                stroke-width="1"
                stroke-dasharray="4 4"
              />
              <line
                x1="80%"
                y1="70%"
                x2="50%"
                y2="50%"
                stroke="#fbbf24"
                stroke-width="1"
                stroke-dasharray="4 4"
              />
            </svg>

            {/* Corner labels */}
            <div class="absolute top-4 right-4 font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
              [3 devices]
            </div>
            <div class="absolute bottom-4 left-4 font-mono text-[10px] text-emerald-500/60">
              ● live preview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}