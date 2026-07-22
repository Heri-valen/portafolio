import { useState } from "preact/hooks";
import { t } from "../lib/i18n.ts";

export default function Contact() {
  const d = t();
  const [copied, setCopied] = useState(false);
  const email = "heriberto.valencia@protonmail.com";

  function handleCopy() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }

  return (
    <section id="contact" class="relative py-24 bg-[#0a0a0b] grid-bg overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]"></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="mb-12">
          <div class="section-marker mb-4">{d.contact.marker}</div>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-3">
            {d.contact.titleA} <span class="gradient-text">{d.contact.titleB}</span>
          </h2>
          <p class="text-zinc-500 max-w-xl font-mono text-sm">
            <span class="text-emerald-500">$</span> {d.contact.cmd}
          </p>
        </div>

        <div class="max-w-3xl mx-auto">
          {/* Terminal-style card */}
          <div class="bg-[#111113] border border-zinc-900 rounded-lg overflow-hidden">
            <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-[#0d0d0f]">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="font-mono text-xs text-zinc-500 ml-3">
                  contact@heriberto:~
                </span>
              </div>
              <span class="font-mono text-[10px] text-emerald-500 flex items-center gap-1">
                <span class="status-dot"></span>
                {d.contact.online}
              </span>
            </div>

            <div class="p-6 md:p-8 space-y-6 font-mono">
              {/* Social links */}
              <div class="flex flex-wrap gap-2">
                <a
                  href="https://github.com/Heri-valen"
                  target="_blank"
                  rel="noopener"
                  class="px-3 py-2 border border-zinc-800 rounded text-zinc-400 hover:border-emerald-500 hover:text-emerald-400 transition-colors text-sm"
                >
                  [gh] github.com/Heri-valen
                </a>
                <a
                  href="https://linkedin.com/in/heriberto-valencia"
                  target="_blank"
                  rel="noopener"
                  class="px-3 py-2 border border-zinc-800 rounded text-zinc-400 hover:border-amber hover:text-amber transition-colors text-sm"
                >
                  [in] LinkedIn
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener"
                  class="px-3 py-2 border border-zinc-800 rounded text-zinc-400 hover:border-violet hover:text-violet transition-colors text-sm"
                >
                  [tw] Twitter
                </a>
              </div>

              {/* Email with copy */}
              <div class="border border-zinc-900 rounded-lg p-4 bg-[#0a0a0b]">
                <div class="text-xs text-zinc-600 mb-2">{d.contact.jsonLabel}</div>
                <div class="flex flex-wrap items-center gap-3">
                  <span class="text-emerald-500">{d.contact.emailKey}</span>
                  <a
                    href={`mailto:${email}`}
                    class="text-white hover:text-emerald-400 transition-colors"
                  >
                    {email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopy}
                    class="ml-auto px-3 py-1 border border-zinc-800 rounded text-xs text-zinc-500 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    {copied ? d.contact.copied : `[${d.contact.copy}]`}
                  </button>
                </div>
                <div class="text-xs text-zinc-600 mt-2">
                  <span class="text-emerald-500">{d.contact.locationLabel}</span> {d.contact.based} {d.contact.city}
                </div>
              </div>

              {/* Quick form */}
              <form
                class="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const data = new FormData(form);
                  const subject = encodeURIComponent(`Portfolio contact · ${data.get("name")}`);
                  const body = encodeURIComponent(`${data.get("msg")}\n\n— ${data.get("name")} (${data.get("email")})`);
                  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                }}
              >
                <div class="grid md:grid-cols-2 gap-3">
                  <label class="block">
                    <span class="text-xs text-zinc-600">$ {d.contact.form.name}</span>
                    <input
                      type="text"
                      name="name"
                      required
                      class="w-full mt-1 bg-black border border-zinc-900 rounded px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </label>
                  <label class="block">
                    <span class="text-xs text-zinc-600">$ {d.contact.form.email}</span>
                    <input
                      type="email"
                      name="email"
                      required
                      class="w-full mt-1 bg-black border border-zinc-900 rounded px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </label>
                </div>
                <label class="block">
                  <span class="text-xs text-zinc-600">$ {d.contact.form.msg}</span>
                  <textarea
                    name="msg"
                    rows={4}
                    required
                    class="w-full mt-1 bg-black border border-zinc-900 rounded px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none resize-none"
                  ></textarea>
                </label>
                <button type="submit" class="btn-terminal w-full md:w-auto justify-center">
                  <span>{d.contact.form.send}</span>
                  <span class="text-xs">→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}