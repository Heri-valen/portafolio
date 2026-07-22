export default function Footer() {
  return (
    <footer class="bg-slate-900 border-t border-slate-800 py-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="text-center md:text-left">
            <p class="text-2xl font-bold text-white mb-2">
              <span class="text-blue-500">&lt;</span>Dev<span class="text-blue-500">/&gt;</span>
            </p>
            <p class="text-slate-400">Senior Full-Stack Developer</p>
          </div>

          <div class="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener" class="text-slate-400 hover:text-blue-500 transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener" class="text-slate-400 hover:text-blue-500 transition-colors">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" class="text-slate-400 hover:text-blue-500 transition-colors">
              Twitter
            </a>
          </div>

          <p class="text-slate-500 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
