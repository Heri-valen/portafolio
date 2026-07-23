import { lang, setLang, type Lang } from "../lib/i18n.ts";

export default function LangSwitcher() {
  const opts: Lang[] = ["en", "es"];
  return (
    <div class="flex items-center gap-0.5 font-mono text-[10px] border border-zinc-800 rounded overflow-hidden">
      {opts.map((l) => {
        const active = lang.value === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active ? "true" : "false"}
            class={`px-2 py-1 uppercase tracking-widest transition-colors ${
              active
                ? "bg-emerald-500 text-black font-bold"
                : "text-zinc-500 hover:text-emerald-400"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}