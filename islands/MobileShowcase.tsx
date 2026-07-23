import { useEffect, useRef } from "preact/hooks";
import anime from "animejs";
import { t } from "../lib/i18n.ts";

export default function MobileShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);
  const d = t();

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

  // Subtle parallax on phone cluster
  useEffect(() => {
    const cluster = phonesRef.current;
    if (!cluster) return;
    const onMove = (e: MouseEvent) => {
      const rect = cluster.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const phone1 = cluster.querySelector(".phone-1") as HTMLElement | null;
      const phone2 = cluster.querySelector(".phone-2") as HTMLElement | null;
      const phone3 = cluster.querySelector(".phone-3") as HTMLElement | null;
      if (phone1) anime({ targets: phone1, translateX: dx * 10, translateY: dy * 6, duration: 600, easing: "easeOutQuad" });
      if (phone2) anime({ targets: phone2, translateX: dx * 18, translateY: dy * 12, duration: 700, easing: "easeOutQuad" });
      if (phone3) anime({ targets: phone3, translateX: dx * 18, translateY: dy * 12, duration: 700, easing: "easeOutQuad" });
    };
    const onLeave = () => {
      const phone1 = cluster.querySelector(".phone-1") as HTMLElement | null;
      const phone2 = cluster.querySelector(".phone-2") as HTMLElement | null;
      const phone3 = cluster.querySelector(".phone-3") as HTMLElement | null;
      [phone1, phone2, phone3].forEach((p, i) => {
        if (!p) return;
        anime({ targets: p, translateX: 0, translateY: 0, duration: 800, easing: "easeOutElastic(1, .7)", delay: i * 60 });
      });
    };
    cluster.addEventListener("mousemove", onMove);
    cluster.addEventListener("mouseleave", onLeave);
    return () => {
      cluster.removeEventListener("mousemove", onMove);
      cluster.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const stats = [
    { label: "apps", value: "12+", width: 85 },
    { label: "users", value: "50K", width: 70 },
    { label: "rating", value: "4.8★", width: 92 },
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
          <div class="section-marker mb-4">{d.showcase.marker}</div>
          <h2 class="section-title">
            {d.showcase.titleA} <span class="accent">{d.showcase.titleB}</span>
          </h2>
          <p class="section-cmd">
            <span class="text-emerald-500">$</span> {d.showcase.cmd}
          </p>
        </div>

        {/* Main showcase grid */}
        <div class="grid lg:grid-cols-[1fr_2fr] gap-12 items-center">
          {/* LEFT: Info card with photo */}
          <div class="showcase-info space-y-6">
            {/* Photo card */}
            <div class="relative">
              <div class="card-hover bg-[#111113] border border-zinc-900 rounded-lg p-1 overflow-hidden">
                <div class="relative aspect-[4/5] bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded overflow-hidden">
                  {/* Photo — works great with Memoji (transparent bg) */}
                  <img
                    src="/profile.jpg"
                    alt="Heriberto Valencia"
                    class="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />

                  {/* Fallback when no image */}
                  <div class="absolute inset-0 flex items-center justify-center -z-0">
                    <div class="text-center">
                      <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center font-display text-4xl font-bold text-black">
                        HV
                      </div>
                      <p class="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                        {d.showcase.seniorEng}
                      </p>
                    </div>
                  </div>

                  {/* Subtle vignette */}
                  <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none"></div>

                  {/* Corner brackets — viewfinder */}
                  <div class="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-emerald-500 z-20"></div>
                  <div class="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-emerald-500 z-20"></div>
                  <div class="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-emerald-500 z-20"></div>
                  <div class="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-emerald-500 z-20"></div>

                  {/* Status bar */}
                  <div class="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] text-emerald-400 bg-black/70 px-2 py-0.5 rounded z-20">
                    {d.showcase.rec}
                  </div>

                  {/* Bottom data strip */}
                  <div class="absolute bottom-3 left-3 right-3 flex justify-between font-mono text-[9px] text-zinc-400 z-20">
                    <span class="bg-black/60 px-1.5 py-0.5 rounded">{d.showcase.iso}</span>
                    <span class="bg-black/60 px-1.5 py-0.5 rounded">{d.showcase.aperture}</span>
                    <span class="bg-black/60 px-1.5 py-0.5 rounded">{d.showcase.shutter}</span>
                  </div>
                </div>
              </div>

              {/* Floating tag */}
              <div class="absolute -bottom-3 -right-3 bg-amber text-black font-mono text-xs font-bold px-3 py-1.5 rounded shadow-lg rotate-3">
                {d.showcase.version}
              </div>
            </div>

            {/* Role info */}
            <div class="space-y-3">
              <div class="font-mono text-xs text-emerald-500 uppercase tracking-widest">
                {d.showcase.profileLabel}
              </div>
              <h3 class="font-display text-2xl font-bold text-white">
                Heriberto Valencia
              </h3>
              <p class="font-mono text-sm text-amber">
                {d.showcase.role}
              </p>
              <p class="text-zinc-400 text-sm leading-relaxed">
                {d.showcase.bio}
              </p>
            </div>

            {/* Stats */}
            <div class="space-y-3 pt-4 border-t border-zinc-900">
              <div>
                <div class="flex justify-between mb-1.5 font-mono text-xs">
                  <span class="text-zinc-500">{d.showcase.stats.apps}</span>
                  <span class="text-emerald-400 font-bold">{stats[0].value}</span>
                </div>
                <div class="h-1 bg-zinc-900 rounded-sm overflow-hidden">
                  <div
                    class="metric-bar h-full bg-gradient-to-r from-emerald-500 to-amber-500"
                    data-width={stats[0].width}
                    style="width: 0%"
                  ></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-1.5 font-mono text-xs">
                  <span class="text-zinc-500">{d.showcase.stats.users}</span>
                  <span class="text-emerald-400 font-bold">{stats[1].value}</span>
                </div>
                <div class="h-1 bg-zinc-900 rounded-sm overflow-hidden">
                  <div
                    class="metric-bar h-full bg-gradient-to-r from-emerald-500 to-amber-500"
                    data-width={stats[1].width}
                    style="width: 0%"
                  ></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between mb-1.5 font-mono text-xs">
                  <span class="text-zinc-500">{d.showcase.stats.rating}</span>
                  <span class="text-emerald-400 font-bold">{stats[2].value}</span>
                </div>
                <div class="h-1 bg-zinc-900 rounded-sm overflow-hidden">
                  <div
                    class="metric-bar h-full bg-gradient-to-r from-emerald-500 to-amber-500"
                    data-width={stats[2].width}
                    style="width: 0%"
                  ></div>
                </div>
              </div>
            </div>

            {/* Tech badges */}
            <div class="flex flex-wrap gap-2 pt-2">
              {d.showcase.techBadges.map((t) => (
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
          <div ref={phonesRef} class="relative h-[600px] md:h-[700px]">
            {/* Decorative bg grid */}
            <div class="absolute inset-0 opacity-20">
              <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <div class="absolute top-3/4 right-1/4 w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-300"></div>
              <div class="absolute bottom-1/4 left-1/2 w-2 h-2 bg-violet-500 rounded-full animate-pulse delay-700"></div>
            </div>

            {/* Phone 1 — Banking App (large, center) */}
            <div class="phone-frame phone-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 opacity-0">
              <div class="w-[260px] md:w-[300px] h-[540px] md:h-[620px] bg-black rounded-[3rem] border-[3px] border-zinc-800 p-2 shadow-2xl shadow-emerald-500/20">
                <div class="w-full h-full bg-gradient-to-br from-[#0a0a0b] via-[#111113] to-[#0a0a0b] rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div class="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20"></div>
                  {/* Status bar */}
                  <div class="flex justify-between items-center px-6 pt-3 pb-2 text-[10px] font-mono">
                    <span class="text-emerald-400">9:41</span>
                    <span class="text-zinc-500">{d.showcase.network}</span>
                  </div>
                  {/* Banking App UI */}
                  <div class="px-5 pt-8 space-y-4">
                    <div class="font-mono text-[10px] text-zinc-500">
                      {d.showcase.banking.balance}
                    </div>
                    <div class="font-display text-3xl font-bold text-white">
                      $12,847<span class="text-emerald-400">.50</span>
                    </div>
                    <div class="text-[10px] text-emerald-400 font-mono">
                      {d.showcase.thisMonth}
                    </div>
                    {/* Card */}
                    <div class="bg-gradient-to-br from-emerald-500/20 to-amber-500/10 border border-emerald-500/30 rounded-lg p-3 mt-4">
<div class="font-mono text-[10px] text-zinc-400">
                      {d.showcase.banking.card}
                    </div>
                      <div class="font-mono text-[10px] text-zinc-500 mt-1">
                        {d.showcase.bankName}
                      </div>
                    </div>
                    {/* Quick actions */}
                    <div class="grid grid-cols-3 gap-2 mt-3">
                      {[d.showcase.banking.send, d.showcase.banking.pay, d.showcase.banking.top].map((a) => (
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
                          <span class="text-zinc-500">{d.showcase.transaction}</span>
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
            <div class="phone-frame phone-2 absolute top-[10%] left-[5%] z-20 opacity-0 -rotate-6 scale-90">
              <div class="w-[200px] h-[420px] bg-black rounded-[2.5rem] border-[2px] border-zinc-800 p-1.5 shadow-xl shadow-amber-500/10">
                <div class="w-full h-full bg-[#0a0a0b] rounded-[2rem] overflow-hidden relative p-3 pt-8">
                  <div class="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full"></div>
                  <div class="font-mono text-[9px] text-amber mb-2">{d.showcase.shopLabel}</div>
                  <div class="font-display text-base text-white mb-3">
                    {d.showcase.shop.featured}
                  </div>
                  {/* Product cards */}
                  {[
                    { c: "from-emerald-500/30", n: `${d.showcase.item} #1` },
                    { c: "from-amber-500/30", n: `${d.showcase.item} #2` },
                    { c: "from-violet-500/30", n: `${d.showcase.item} #3` },
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
            <div class="phone-frame phone-3 absolute bottom-[10%] right-[5%] z-20 opacity-0 rotate-6 scale-90">
              <div class="w-[200px] h-[420px] bg-black rounded-[2.5rem] border-[2px] border-zinc-800 p-1.5 shadow-xl shadow-violet-500/10">
                <div class="w-full h-full bg-[#0a0a0b] rounded-[2rem] overflow-hidden relative p-3 pt-8">
                  <div class="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full"></div>
                  <div class="font-mono text-[9px] text-violet mb-2">{d.showcase.activityLabel}</div>
                  <div class="font-display text-2xl text-white">
                    8,247
                  </div>
                  <div class="font-mono text-[9px] text-zinc-500">
                    {d.showcase.activity.steps}
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
                      { l: d.showcase.activity.heart, v: "72" },
                      { l: d.showcase.activity.cal, v: "1.2K" },
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
              {d.showcase.devicesLabel}
            </div>
            <div class="absolute bottom-4 left-4 font-mono text-[10px] text-emerald-500/60">
              {d.showcase.livePreview}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}