import { signal } from "@preact/signals";

export type Lang = "en" | "es";

export const lang = signal<Lang>("en");

export function setLang(l: Lang) {
  lang.value = l;
  if (typeof document !== "undefined") {
    document.documentElement.lang = l;
    try {
      localStorage.setItem("lang", l);
    } catch (_) { /* ignore */ }
  }
}

export function toggleLang() {
  setLang(lang.value === "en" ? "es" : "en");
}

export type Dict = {
  nav: {
    mobile: string;
    skills: string;
    ai: string;
    experience: string;
    projects: string;
    contact: string;
    toggleMenu: string;
  };
  status: string;
  hero: {
    tag: string;
    name: string;
    role: string;
    years: string;
    location: string;
    viewWork: string;
    initContact: string;
    terminalPath: string;
  };
  showcase: {
    marker: string;
    titleA: string;
    titleB: string;
    cmd: string;
    version: string;
    profileLabel: string;
    role: string;
    bio: string;
    stats: { apps: string; users: string; rating: string };
    techBadges: string[];
    devicesLabel: string;
    livePreview: string;
    rec: string;
    iso: string;
    aperture: string;
    shutter: string;
    bankName: string;
    shopLabel: string;
    activityLabel: string;
    network: string;
    thisMonth: string;
    transaction: string;
    seniorEng: string;
    item: string;
    banking: { balance: string; card: string; send: string; pay: string; top: string };
    shop: { featured: string };
    activity: { steps: string; heart: string; cal: string };
  };
  skills: {
    marker: string;
    titleA: string;
    titleB: string;
    cmd: string;
    entries: string;
    loaded: string;
    ready: string;
    categories: {
      language: string;
      framework: string;
      mobile: string;
      devops: string;
      cms: string;
    };
  };
  ai: {
    marker: string;
    titleA: string;
    titleB: string;
    cmd: string;
    pillars: {
      id: string;
      tag: string;
      title: string;
      body: string;
      meta: string;
    }[];
    flow: {
      title: string;
      steps: { id: string; label: string; detail: string }[];
      output: string;
      stepPrefix: string;
    };
    stack: string;
    stackLabel: string;
    streaming: string;
    live: string;
    streamBlock: string;
    streamInput: string;
    streamPlan: string;
    streamRetrieve: string;
    streamExecute: string;
    streamReflect: string;
    streamRespond: string;
  };
  experience: {
    marker: string;
    titleA: string;
    titleB: string;
    cmd: string;
    inProgress: string;
    yearsShort: string;
    commitLabel: string;
    countLine: string;
  };
  projects: {
    marker: string;
    titleA: string;
    titleB: string;
    cmd: string;
    filters: { all: string; web: string; mobile: string; ai: string };
    catLabel: { web: string; mobile: string; ai: string };
    code: string;
    demo: string;
    visit: string;
    cases: string;
    fieldNote: string;
    expand: string;
    collapse: string;
    footerCount: string;
    sortedBy: string;
    lastUpdated: string;
    moreInProd: string;
    check: string;
    on: string;
    specimenLabel: string;
    metrics: Record<string, string>;
  };
  contact: {
    marker: string;
    titleA: string;
    titleB: string;
    cmd: string;
    online: string;
    based: string;
    city: string;
    email: string;
    emailKey: string;
    copy: string;
    copied: string;
    jsonLabel: string;
    locationLabel: string;
    form: { name: string; email: string; msg: string; send: string };
  };
  footer: {
    rights: string;
    built: string;
  };
};

const en: Dict = {
  nav: {
    mobile: "/mobile",
    skills: "/skills",
    ai: "/ai",
    experience: "/experience",
    projects: "/projects",
    contact: "/contact",
    toggleMenu: "Toggle menu",
  },
  status: "online",
  hero: {
    tag: "Available for new projects · 2026",
    name: "Heriberto",
    role: "Senior Full-Stack Engineer",
    years: "10+ years shipping production",
    location: "Bogotá, Colombia",
    viewWork: "view_work",
    initContact: "init_contact",
    terminalPath: "~/portafolio/heriberto.valencia",
  },
  showcase: {
    marker: "03 // Mobile",
    titleA: "Mobile",
    titleB: "craft",
    cmd: "$ show --platform ios,android --type production",
    version: "v.2026",
    profileLabel: "~ /profile",
    role: "Senior Mobile & Full-Stack Engineer",
    bio:
      "Crafting native experiences for iOS & Android with Swift and Kotlin. 10+ years shipping apps that scale.",
    stats: {
      apps: "Mobile Apps Shipped",
      users: "Active Users",
      rating: "Avg. Rating",
    },
    techBadges: ["Kotlin", "Swift", "Jetpack", "SwiftUI", "Compose"],
    devicesLabel: "[3 devices]",
    livePreview: "● live preview",
    rec: "REC ● 4K · MEMOJI",
    iso: "ISO 100",
    aperture: "f/1.8",
    shutter: "1/60s",
    bankName: "HERIBERTO V.",
    shopLabel: "SHOP",
    activityLabel: "ACTIVITY",
    network: "●●●●● 5G",
    thisMonth: "▲ +12.4% this month",
    transaction: "Transaction",
    seniorEng: "Senior Engineer",
    item: "Item",
    banking: {
      balance: "BALANCE",
      card: "•••• 4242",
      send: "Send",
      pay: "Pay",
      top: "Top",
    },
    shop: { featured: "Featured" },
    activity: { steps: "steps today", heart: "Heart", cal: "Cal" },
  },
  skills: {
    marker: "01 // Stack",
    titleA: "Technical",
    titleB: "arsenal",
    cmd: "$ ls ./skills --sort=proficiency --format=table",
    entries: "entries",
    loaded: "loaded",
    ready: "utf-8 · main · ready",
    categories: {
      language: "Languages",
      framework: "Frameworks & Libraries",
      mobile: "Mobile Development",
      devops: "DevOps & Cloud",
      cms: "CMS & E-commerce",
    },
  },
  ai: {
    marker: "04 // AI · Agents",
    titleA: "Agentic",
    titleB: "engineering",
    cmd: "$ openai run --agent --stream --tools=all",
    pillars: [
      {
        id: "ai-1",
        tag: "/01 · LLMs",
        title: "Model orchestration",
        body:
          "OpenAI, Anthropic, Gemini, Mistral & local Ollama. Prompt design, structured outputs, function-calling, RAG over private corpora.",
        meta: "tokens_in/out · temperature · streaming · JSON-mode",
      },
      {
        id: "ai-2",
        tag: "/02 · RAG",
        title: "Retrieval pipelines",
        body:
          "Vector stores (pgvector, Qdrant, Chroma), embeddings, hybrid search, document chunking, re-ranking & evaluation.",
        meta: "embed · retrieve · rerank · answer",
      },
      {
        id: "ai-3",
        tag: "/03 · Agents",
        title: "Autonomous workflows",
        body:
          "Multi-step tool-using agents. LangGraph, CrewAI, custom planners. Sandboxed code execution, browser automation, MCP servers.",
        meta: "plan → tool → observe → reflect",
      },
      {
        id: "ai-4",
        tag: "/04 · Automate",
        title: "Bots & pipelines",
        body:
          "n8n, Zapier, Make, custom Python workers. Webhooks, schedulers, scrapers, ETL. WhatsApp / Telegram / Slack bots.",
        meta: "cron · webhook · event · queue",
      },
      {
        id: "ai-5",
        tag: "/05 · MLOps",
        title: "Deploy & observe",
        body:
          "Fine-tuning, evals, cost & latency budgets, fallback chains, drift detection. Logs, traces, guardrails, red-team prompts.",
        meta: "p50 · p99 · cost-per-call · safety",
      },
    ],
    flow: {
      title: "agent.run(input)",
      steps: [
        { id: "s1", label: "parse", detail: "intent + entities" },
        { id: "s2", label: "plan", detail: "decompose → tools" },
        { id: "s3", label: "retrieve", detail: "RAG · web · APIs" },
        { id: "s4", label: "execute", detail: "code · shell · browser" },
        { id: "s5", label: "reflect", detail: "self-critique · retry" },
        { id: "s6", label: "respond", detail: "stream · cite · trace" },
      ],
      output: "✓ delivered in 1.4s · 3 tool calls · 0 retries",
      stepPrefix: "step",
    },
    stack:
      "Python · TypeScript · LangGraph · OpenAI · Anthropic · pgvector · Ollama · MCP · n8n",
    streaming: "streaming",
    live: "live",
    streamBlock: "[stream]",
    streamInput:
      '→ input: "Build a CSV exporter from the SQLite db"',
    streamPlan: "→ plan: 4 steps · tools=[sql, fs, csv]",
    streamRetrieve: "→ retrieve: schema for ",
    streamExecute: "→ execute: SELECT * FROM users → /tmp/export.csv",
    streamReflect: "→ reflect: schema validated · 1,247 rows · 312KB",
    streamRespond: "→ respond: file written · ready for download",
    stackLabel: "stack",
  },
  experience: {
    marker: "02 // Career",
    titleA: "git log",
    titleB: "--career",
    cmd: "$ git log --reverse --author=heriberto --oneline",
    inProgress: "in progress",
    yearsShort: "yrs",
    commitLabel: "commit",
    countLine: "git log --oneline | wc -l",
  },
  projects: {
    marker: "05 // Work",
    titleA: "Featured",
    titleB: "deploys",
    cmd: "$ ls ./projects --format=card --sort=recency",
    filters: { all: "all", web: "web", mobile: "mobile", ai: "ai" },
    catLabel: { web: "Web · APIs", mobile: "Mobile", ai: "AI · Agents" },
    code: "code",
    demo: "demo",
    visit: "visit",
    cases: "cases",
    fieldNote: "field-research · est.2014",
    expand: "expand",
    collapse: "collapse",
    footerCount: "specimens",
    sortedBy: "sorted by recency",
    lastUpdated: "last updated: today",
    moreInProd: "more in production · check",
    check: "check",
    on: "on",
    specimenLabel: "SPECIMEN",
    metrics: {
      skus: "skus",
      uptime: "uptime",
      checkout_ms: "checkout_ms",
      sites: "sites",
      plugins: "plugins",
      themes: "themes",
      tenants: "tenants",
      jobs_per_day: "jobs/day",
      p99_ms: "p99_ms",
      endpoints: "endpoints",
      requests_per_s: "req/s",
      docs: "docs",
      platforms: "platforms",
      biometric: "biometric",
      rating: "rating",
      sync: "sync",
      models: "models",
      tickets_per_mo: "tickets/mo",
      tools: "tools",
      autonomy: "autonomy",
      ocr_acc: "ocr_acc",
      queue: "queue",
    },
  },
  contact: {
    marker: "06 // Contact",
    titleA: "Get in",
    titleB: "touch",
    cmd: "$ contact --new --channel=preferred",
online: "online",
    based: "Based in",
    city: "Bogotá, Colombia",
    email: "hello@example.com",
    emailKey: "email:",
    copy: "copy",
    copied: "copied ✓",
    jsonLabel: "$ cat contact.json",
    locationLabel: "location:",
    form: { name: "name", email: "email", msg: "message", send: "send_message" },
  },
  footer: {
    rights: "All rights reserved.",
    built: "Built with Fresh · Anime.js · Tailwind",
  },
};

const es: Dict = {
  nav: {
    mobile: "/mobile",
    skills: "/skills",
    ai: "/ia",
    experience: "/experiencia",
    projects: "/proyectos",
    contact: "/contacto",
    toggleMenu: "Alternar menú",
  },
  status: "en línea",
  hero: {
    tag: "Disponible para nuevos proyectos · 2026",
    name: "Heriberto",
    role: "Ingeniero Full-Stack Senior",
    years: "10+ años en producción",
    location: "Bogotá, Colombia",
    viewWork: "ver_trabajo",
    initContact: "iniciar_contacto",
    terminalPath: "~/portafolio/heriberto.valencia",
  },
  showcase: {
    marker: "03 // Móvil",
    titleA: "Desarrollo",
    titleB: "móvil",
    cmd: "$ show --platform ios,android --type produccion",
    version: "v.2026",
    profileLabel: "~ /perfil",
    role: "Ingeniero Senior Móvil y Full-Stack",
    bio:
      "Creando experiencias nativas para iOS y Android con Swift y Kotlin. 10+ años lanzando apps que escalan.",
    stats: {
      apps: "Apps móviles lanzadas",
      users: "Usuarios activos",
      rating: "Calificación promedio",
    },
    techBadges: ["Kotlin", "Swift", "Jetpack", "SwiftUI", "Compose"],
    devicesLabel: "[3 dispositivos]",
    livePreview: "● vista en vivo",
    rec: "REC ● 4K · MEMOJI",
    iso: "ISO 100",
    aperture: "f/1.8",
    shutter: "1/60s",
    bankName: "HERIBERTO V.",
    shopLabel: "TIENDA",
    activityLabel: "ACTIVIDAD",
    network: "●●●●● 5G",
    thisMonth: "▲ +12.4% este mes",
    transaction: "Transacción",
    seniorEng: "Ingeniero Senior",
    item: "Artículo",
    banking: {
      balance: "SALDO",
      card: "•••• 4242",
      send: "Enviar",
      pay: "Pagar",
      top: "Top",
    },
    shop: { featured: "Destacado" },
    activity: { steps: "pasos hoy", heart: "Pulso", cal: "Cal" },
  },
  skills: {
    marker: "01 // Stack",
    titleA: "Arsenal",
    titleB: "técnico",
    cmd: "$ ls ./skills --sort=proficiencia --format=tabla",
    entries: "entradas",
    loaded: "cargado",
    ready: "utf-8 · main · listo",
    categories: {
      language: "Lenguajes",
      framework: "Frameworks y Librerías",
      mobile: "Desarrollo Móvil",
      devops: "DevOps y Cloud",
      cms: "CMS y E-commerce",
    },
  },
  ai: {
    marker: "04 // IA · Agentes",
    titleA: "Ingeniería",
    titleB: "agéntica",
    cmd: "$ openai run --agente --stream --tools=todos",
    pillars: [
      {
        id: "ai-1",
        tag: "/01 · LLMs",
        title: "Orquestación de modelos",
        body:
          "OpenAI, Anthropic, Gemini, Mistral y Ollama local. Diseño de prompts, salidas estructuradas, function-calling, RAG sobre corpus privados.",
        meta: "tokens · temperatura · streaming · modo JSON",
      },
      {
        id: "ai-2",
        tag: "/02 · RAG",
        title: "Pipelines de recuperación",
        body:
          "Vector stores (pgvector, Qdrant, Chroma), embeddings, búsqueda híbrida, chunking, re-ranking y evaluación.",
        meta: "embed · retrieve · rerank · answer",
      },
      {
        id: "ai-3",
        tag: "/03 · Agentes",
        title: "Workflows autónomos",
        body:
          "Agentes multi-paso con herramientas. LangGraph, CrewAI, planners custom. Ejecución de código aislada, automatización de navegador, servidores MCP.",
        meta: "plan → tool → observe → reflect",
      },
      {
        id: "ai-4",
        tag: "/04 · Automatiza",
        title: "Bots y pipelines",
        body:
          "n8n, Zapier, Make, workers Python custom. Webhooks, schedulers, scrapers, ETL. Bots WhatsApp / Telegram / Slack.",
        meta: "cron · webhook · evento · cola",
      },
      {
        id: "ai-5",
        tag: "/05 · MLOps",
        title: "Despliegue y monitoreo",
        body:
          "Fine-tuning, evals, presupuestos de costo y latencia, cadenas de fallback, detección de drift. Logs, trazas, guardrails, red-team.",
        meta: "p50 · p99 · costo-por-llamada · seguridad",
      },
    ],
    flow: {
      title: "agente.ejecutar(entrada)",
      steps: [
        { id: "s1", label: "parsear", detail: "intención + entidades" },
        { id: "s2", label: "planear", detail: "descomponer → tools" },
        { id: "s3", label: "recuperar", detail: "RAG · web · APIs" },
        { id: "s4", label: "ejecutar", detail: "código · shell · browser" },
        { id: "s5", label: "reflexionar", detail: "auto-crítica · retry" },
        { id: "s6", label: "responder", detail: "stream · citar · trazar" },
      ],
      output: "✓ entregado en 1.4s · 3 llamadas a tools · 0 reintentos",
      stepPrefix: "paso",
    },
    stack:
      "Python · TypeScript · LangGraph · OpenAI · Anthropic · pgvector · Ollama · MCP · n8n",
    streaming: "transmitiendo",
    live: "en vivo",
    streamBlock: "[stream]",
    streamInput:
      '→ entrada: "Construye un exportador CSV desde la db SQLite"',
    streamPlan: "→ plan: 4 pasos · tools=[sql, fs, csv]",
    streamRetrieve: "→ recuperar: esquema para ",
    streamExecute: "→ ejecutar: SELECT * FROM usuarios → /tmp/exportar.csv",
    streamReflect: "→ reflexionar: esquema validado · 1,247 filas · 312KB",
    streamRespond: "→ responder: archivo escrito · listo para descargar",
    stackLabel: "stack",
  },
  experience: {
    marker: "02 // Carrera",
    titleA: "git log",
    titleB: "--carrera",
    cmd: "$ git log --reverse --author=heriberto --oneline",
    inProgress: "en curso",
    yearsShort: "años",
    commitLabel: "commit",
    countLine: "git log --oneline | wc -l",
  },
  projects: {
    marker: "05 // Trabajo",
    titleA: "Despliegues",
    titleB: "destacados",
    cmd: "$ ls ./proyectos --formato=tarjeta --sort=reciente",
    filters: { all: "todo", web: "web", mobile: "móvil", ai: "ia" },
    catLabel: { web: "Web · APIs", mobile: "Móvil", ai: "IA · Agentes" },
    code: "código",
    demo: "demo",
    visit: "visitar",
    cases: "casos",
    fieldNote: "trabajo-de-campo · est.2014",
    expand: "expandir",
    collapse: "contraer",
    footerCount: "especímenes",
    sortedBy: "ordenado por reciente",
    lastUpdated: "actualizado: hoy",
    moreInProd: "más en producción · revisa",
    check: "revisa",
    on: "en",
    specimenLabel: "ESPECÍMEN",
    metrics: {
      skus: "skus",
      uptime: "disponib.",
      checkout_ms: "checkout_ms",
      sites: "sitios",
      plugins: "plugins",
      themes: "themes",
      tenants: "inquilinos",
      jobs_per_day: "trabajos/día",
      p99_ms: "p99_ms",
      endpoints: "endpoints",
      requests_per_s: "req/s",
      docs: "docs",
      platforms: "plataformas",
      biometric: "biométric.",
      rating: "calif.",
      sync: "sincron.",
      models: "modelos",
      tickets_per_mo: "tickets/mes",
      tools: "herram.",
      autonomy: "autonomía",
      ocr_acc: "precisión",
      queue: "cola",
    },
  },
  contact: {
    marker: "06 // Contacto",
    titleA: "Ponerte en",
    titleB: "contacto",
    cmd: "$ contacto --nuevo --canal=preferido",
    online: "en línea",
    based: "Ubicado en",
    city: "Bogotá, Colombia",
    email: "hola@ejemplo.com",
    emailKey: "correo:",
    copy: "copiar",
    copied: "copiado ✓",
    jsonLabel: "$ cat contacto.json",
    locationLabel: "ubicación:",
    form: { name: "nombre", email: "correo", msg: "mensaje", send: "enviar_mensaje" },
  },
  footer: {
    rights: "Todos los derechos reservados.",
    built: "Hecho con Fresh · Anime.js · Tailwind",
  },
};

export const dict = {
  get en(): Dict { return en; },
  get es(): Dict { return es; },
};

export function t(): Dict {
  return dict[lang.value];
}

// Restore from localStorage on client
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "es") {
      lang.value = saved;
      document.documentElement.lang = saved;
    }
  } catch (_) { /* ignore */ }
}