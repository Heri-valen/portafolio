import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { t } from "../lib/i18n.ts";
import LangSwitcher from "./LangSwitcher.tsx";

const SECTIONS = [
  { id: "showcase", labelKey: "mobile" as const },
  { id: "skills", labelKey: "skills" as const },
  { id: "ai", labelKey: "ai" as const },
  { id: "experience", labelKey: "experience" as const },
  { id: "projects", labelKey: "projects" as const },
  { id: "contact", labelKey: "contact" as const },
];

export default function Header() {
  const isMenuOpen = useSignal(false);
  const activeSection = useSignal<string>("top");
  const scrolled = useSignal(false);
  const d = t();

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id;
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Scroll state
  useEffect(() => {
    const onScroll = () => {
      const wasScrolled = scrolled.value;
      scrolled.value = window.scrollY > 12;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0;
      const bar = document.querySelector(".scroll-progress") as HTMLElement | null;
      if (bar) bar.style.transform = `scaleX(${pct / 100})`;
      if (scrolled.value !== wasScrolled) {
        document.documentElement.style.setProperty(
          "--header-h",
          scrolled.value ? "44px" : "56px",
        );
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      class={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        scrolled.value
          ? "bg-[#0a0a0b]/90 border-zinc-800"
          : "bg-[#0a0a0b]/60 border-zinc-900"
      }`}
    >
      <nav class="container mx-auto px-4">
        <div class={`flex items-center justify-between transition-[height] duration-300 ${scrolled.value ? "h-11" : "h-14"}`}>
          {/* Logo */}
          <a href="#top" class="flex items-center gap-2 font-mono text-sm group">
            <span class="text-emerald-500">~</span>
            <span class="text-zinc-400 group-hover:text-white transition-colors">
              heriberto<span class="text-emerald-500">@dev</span>
            </span>
            <span class="hidden md:inline text-zinc-600">:</span>
            <span class="hidden md:inline text-amber">~/portafolio</span>
            <span class="hidden md:inline text-emerald-500">$</span>
          </a>

          {/* Center nav */}
          <ul class="hidden md:flex items-center gap-1 font-mono text-xs">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  class={`nav-link ${activeSection.value === s.id ? "is-active" : ""}`}
                >
                  {d.nav[s.labelKey]}
                </a>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div class="hidden md:flex items-center gap-3 font-mono text-xs">
            <LangSwitcher />
            <div class="flex items-center gap-2">
              <span class="status-dot"></span>
              <span class="text-zinc-500">{d.status}</span>
            </div>
            <div class="text-zinc-700">|</div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener"
              class="text-zinc-500 hover:text-amber transition-colors"
              aria-label="GitHub"
            >
              [gh]
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener"
              class="text-zinc-500 hover:text-amber transition-colors"
              aria-label="LinkedIn"
            >
              [in]
            </a>
          </div>

          {/* Mobile toggle */}
          <div class="md:hidden flex items-center gap-2">
            <LangSwitcher />
            <button
              class="font-mono text-emerald-500 px-3"
              onClick={() => isMenuOpen.value = !isMenuOpen.value}
              aria-label={d.nav.toggleMenu}
              aria-expanded={isMenuOpen.value ? "true" : "false"}
              aria-controls="mobile-menu"
            >
              {isMenuOpen.value ? "[x]" : "[≡]"}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen.value && (
          <div id="mobile-menu" class="md:hidden pb-4 border-t border-zinc-900 mt-2 pt-4">
            <ul class="flex flex-col gap-1 font-mono text-sm">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    class={`block px-3 py-2 rounded transition-colors ${
                      activeSection.value === s.id
                        ? "text-mint bg-emerald-500/5"
                        : "text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900/50"
                    }`}
                    onClick={() => isMenuOpen.value = false}
                  >
                    <span class="text-emerald-500">$ </span>
                    cd {d.nav[s.labelKey]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
