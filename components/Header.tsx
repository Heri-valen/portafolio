import { useSignal } from "@preact/signals";

export default function Header() {
  const isMenuOpen = useSignal(false);

  const navItems = [
    { href: "/#skills", label: "Skills" },
    { href: "/#experience", label: "Experience" },
    { href: "/#projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header class="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <a href="/" class="text-xl font-bold text-white">
            <span class="text-blue-500">&lt;</span>Dev<span class="text-blue-500">/&gt;</span>
          </a>

          <ul class="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  class="text-slate-300 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          <div class="hidden md:flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener" class="text-slate-400 hover:text-white transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="text-slate-400 hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>

          <button
            class="md:hidden text-white"
            onClick={() => isMenuOpen.value = !isMenuOpen.value}
          >
            {isMenuOpen.value ? "✕" : "☰"}
          </button>
        </div>

        {isMenuOpen.value && (
          <div class="md:hidden pt-4 pb-2">
            <ul class="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    class="text-slate-300 hover:text-white transition-colors block"
                    onClick={() => isMenuOpen.value = false}
                  >
                    {item.label}
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
