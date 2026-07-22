import { useSignal } from "@preact/signals";

export default function Header() {
  const isMenuOpen = useSignal(false);

  const navItems = [
    { href: "#showcase", label: "/mobile" },
    { href: "#skills", label: "/skills" },
    { href: "#experience", label: "/experience" },
    { href: "#projects", label: "/projects" },
    { href: "#contact", label: "/contact" },
  ];

  return (
    <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0b]/80 border-b border-zinc-900">
      <nav class="container mx-auto px-4">
        <div class="flex items-center justify-between h-14">
          {/* Logo / Prompt */}
          <a href="#top" class="flex items-center gap-2 font-mono text-sm group">
            <span class="text-emerald-500">~</span>
            <span class="text-zinc-400 group-hover:text-white transition-colors">
              heriberto<span class="text-emerald-500">@dev</span>
            </span>
            <span class="hidden md:inline text-zinc-600">:</span>
            <span class="hidden md:inline text-amber">~/portfolio</span>
            <span class="hidden md:inline text-emerald-500">$</span>
          </a>

          {/* Center nav */}
          <ul class="hidden md:flex items-center gap-1 font-mono text-xs">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  class="px-3 py-2 text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Status indicators */}
          <div class="hidden md:flex items-center gap-4 font-mono text-xs">
            <div class="flex items-center gap-2">
              <span class="status-dot"></span>
              <span class="text-zinc-500">online</span>
            </div>
            <div class="text-zinc-700">|</div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener"
              class="text-zinc-500 hover:text-amber transition-colors"
            >
              [gh]
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener"
              class="text-zinc-500 hover:text-amber transition-colors"
            >
              [in]
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            class="md:hidden font-mono text-emerald-500 px-3"
            onClick={() => isMenuOpen.value = !isMenuOpen.value}
          >
            {isMenuOpen.value ? "[x]" : "[≡]"}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen.value && (
          <div class="md:hidden pb-4 border-t border-zinc-900 mt-2 pt-4">
            <ul class="flex flex-col gap-1 font-mono text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    class="block px-3 py-2 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-900/50 rounded transition-colors"
                    onClick={() => isMenuOpen.value = false}
                  >
                    <span class="text-emerald-500">$ </span>
                    cd {item.label}
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