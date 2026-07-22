import { t } from "../lib/i18n.ts";

export default function Footer() {
  const d = t();
  return (
    <footer class="bg-[#0a0a0b] border-t border-zinc-900 py-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-center md:text-left">
            <p class="text-2xl font-bold text-white mb-2 font-mono">
              <span class="text-emerald-500">&lt;</span>Dev<span class="text-emerald-500">/&gt;</span>
            </p>
            <p class="text-zinc-500 text-sm">{d.showcase.role}</p>
          </div>

          <div class="flex items-center gap-6 font-mono text-sm">
            <a href="https://github.com" target="_blank" rel="noopener" class="text-zinc-500 hover:text-emerald-400 transition-colors">
              [gh]
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="text-zinc-500 hover:text-emerald-400 transition-colors">
              [in]
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" class="text-zinc-500 hover:text-emerald-400 transition-colors">
              [tw]
            </a>
          </div>

          <p class="text-zinc-600 text-xs font-mono text-center md:text-right">
            © {new Date().getFullYear()} · {d.footer.rights}<br />
            <span class="text-zinc-700">{d.footer.built}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}