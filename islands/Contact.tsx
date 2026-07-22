export default function Contact() {
  return (
    <section id="contact" class="py-20 bg-slate-900">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p class="text-slate-400 max-w-2xl mx-auto">
            Open for opportunities and interesting projects
          </p>
          <div class="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div class="max-w-2xl mx-auto text-center">
          <div class="flex justify-center gap-6 mb-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener"
              class="p-4 bg-slate-800 rounded-full text-slate-400 hover:text-blue-500 hover:bg-slate-700 transition-all duration-300"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener"
              class="p-4 bg-slate-800 rounded-full text-slate-400 hover:text-blue-500 hover:bg-slate-700 transition-all duration-300"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener"
              class="p-4 bg-slate-800 rounded-full text-slate-400 hover:text-blue-500 hover:bg-slate-700 transition-all duration-300"
            >
              Twitter
            </a>
          </div>

          <a
            href="mailto:hello@example.com"
            class="inline-flex items-center gap-3 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            hello@example.com
          </a>

          <p class="mt-8 text-slate-500 flex items-center justify-center gap-2">
            📍 Based in Mexico City
          </p>
        </div>
      </div>
    </section>
  );
}
