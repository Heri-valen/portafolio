import type { Lang } from "./i18n.ts";

export interface ProfileSection {
  id: string;
  title: string;
  command: string;
  painTitle: string;
  pain: string;
  solutionTitle: string;
  solution: string;
  metrics?: { label: string; value: string }[];
}

export interface ProfileData {
  badge: string;
  windowTitle: string;
  windowPath: string;
  headline: string;
  headlineSubtitle: string;
  summaryTitle: string;
  summary: string;
  solutionsTitle: string;
  solutionsSubtitle: string;
  sections: ProfileSection[];
  philosophyTitle: string;
  philosophy: string;
  closeCmd: string;
  scrollHint: string;
}

const es: ProfileData = {
  badge: "[perfil.exe]",
  windowTitle: "heriberto@dev:~/profile",
  windowPath: "~/perfil/heriberto.valencia",
  headline: "Senior Software Engineer & Solutions Architect",
  headlineSubtitle: "resumen-ejecutivo.txt",
  summaryTitle: "▸ Resumen Ejecutivo",
  summary:
    "Ingeniero de Software Senior con más de 10 años de experiencia, enfocado en diagnosticar, arquitectar y resolver los desafíos más complejos de las empresas. Mi valor no radica en las herramientas que utilizo, sino en mi capacidad para traducir problemas de negocio en sistemas escalables, seguros y eficientes. Mi objetivo es eliminar cuellos de botella técnicos, automatizar operaciones costosas y garantizar que los productos digitales aporten valor real, soportando el crecimiento acelerado de la compañía sin comprometer la estabilidad.",
  solutionsTitle: "▸ Soluciones Estratégicas a Problemas de Negocio",
  solutionsSubtitle: "$ cat problemas-negocio.log --priority=high",
  sections: [
    {
      id: "bottleneck",
      title: "01 · Superación de Cuellos de Botella y Escalabilidad Limitada",
      command: "fix --bottleneck --scale=infinite",
      painTitle: "EL DOLOR DE LA COMPAÑÍA:",
      pain: "Sistemas lentos, caídas de servicio durante picos de tráfico o pérdida de usuarios por malas experiencias de carga.",
      solutionTitle: "MI SOLUCIÓN:",
      solution: "Reestructuración de arquitecturas para soportar alto tráfico. He liderado migraciones hacia sistemas distribuidos que han reducido la latencia de respuesta hasta en un 40% y mejorado los tiempos de carga en un 70%. Capacidad comprobada para tomar un producto desde su fase inicial y escalarlo de forma estable para soportar a cientos de miles de usuarios concurrentes, garantizando alta disponibilidad (uptime del 99.9%).",
      metrics: [
        { label: "latencia", value: "−40%" },
        { label: "carga", value: "−70%" },
        { label: "uptime", value: "99.9%" },
        { label: "usuarios_concurrentes", value: "100K+" },
      ],
    },
    {
      id: "automation",
      title: "02 · Reducción de la Carga Operativa mediante IA y Automatización",
      command: "automate --pipeline --agent --ml",
      painTitle: "EL DOLOR DE LA COMPAÑÍA:",
      pain: "Equipos humanos saturados por procesos manuales repetitivos (atención al cliente, revisión de documentos, etc.), lo que genera altos costos y lentitud en el servicio.",
      solutionTitle: "MI SOLUCIÓN:",
      solution: "Diseño e integración de flujos de trabajo autónomos (Pipelines y Agentes Inteligentes). He creado sistemas capaces de resolver autónomamente hasta el 92% de las interacciones con usuarios (procesando decenas de miles de tickets al mes) y pipelines que extraen y validan información de miles de documentos de forma automatizada, reduciendo el margen de error y liberando al talento humano para tareas estratégicas.",
      metrics: [
        { label: "autonomía", value: "92%" },
        { label: "tickets/mes", value: "50K+" },
        { label: "documentos/mes", value: "100K+" },
        { label: "error_margin", value: "−97%" },
      ],
    },
    {
      id: "security",
      title: "03 · Mitigación de Riesgos en Productos Críticos y Transaccionales",
      command: "secure --critical --compliance=on",
      painTitle: "EL DOLOR DE LA COMPAÑÍA:",
      pain: "Vulnerabilidad en datos sensibles, pérdida de transacciones e-commerce o falta de fiabilidad en entornos que requieren alta precisión (como el sector financiero).",
      solutionTitle: "MI SOLUCIÓN:",
      solution: "Construcción de plataformas de misión crítica (aplicaciones bancarias, SaaS multi-inquilino y e-commerce de alto volumen) con estrictos estándares de seguridad. Implementación de encriptación, autenticación biométrica, sincronización de datos en tiempo real (incluso sin conexión) y sistemas de pago sin fricción, asegurando la continuidad del negocio y la confianza total del usuario final.",
      metrics: [
        { label: "compliance", value: "PCI/SOC2" },
        { label: "auth", value: "biométrica" },
        { label: "sync", value: "tiempo-real" },
        { label: "offline-first", value: "true" },
      ],
    },
    {
      id: "speed",
      title: "04 · Reducción del Time-to-Market (Lentitud en la Entrega de Valor)",
      command: "ship --continuous --safe",
      painTitle: "EL DOLOR DE LA COMPAÑÍA:",
      pain: "Ciclos de desarrollo interminables, despliegues que rompen el sistema en producción y falta de agilidad para responder a la competencia.",
      solutionTitle: "MI SOLUCIÓN:",
      solution: "Liderazgo técnico que moderniza el ciclo de vida del desarrollo. Al implementar procesos de entrega continua, integración automatizada y liderar equipos bajo metodologías eficientes, he logrado reducir los tiempos de despliegue hasta en un 60%. Esto permite a la compañía lanzar nuevas funcionalidades de forma rápida, segura y con un impacto inmediato en el mercado.",
      metrics: [
        { label: "deploy_time", value: "−60%" },
        { label: "incidents", value: "−80%" },
        { label: "lead_time", value: "< 1 día" },
        { label: "rollbacks", value: "0 forzados" },
      ],
    },
  ],
  philosophyTitle: "▸ Filosofía de Trabajo",
  philosophy:
    "La tecnología es solo el medio. Un ingeniero Senior se define por su capacidad para tomar un problema complejo del negocio, fragmentarlo y construir una solución mantenible, costo-eficiente y que impulse la rentabilidad de la compañía.",
  closeCmd: "exit",
  scrollHint: "↓ scroll para continuar · esc para cerrar",
};

const en: ProfileData = {
  badge: "[profile.exe]",
  windowTitle: "heriberto@dev:~/profile",
  windowPath: "~/profile/heriberto.valencia",
  headline: "Senior Software Engineer & Solutions Architect",
  headlineSubtitle: "executive-summary.txt",
  summaryTitle: "▸ Executive Summary",
  summary:
    "Senior Software Engineer with 10+ years of experience focused on diagnosing, architecting, and solving the most complex business challenges. My value isn't in the tools I use — it's in my ability to translate business problems into scalable, secure, and efficient systems. My goal is to eliminate technical bottlenecks, automate costly operations, and ensure digital products deliver real value, supporting rapid company growth without compromising stability.",
  solutionsTitle: "▸ Strategic Solutions to Business Problems",
  solutionsSubtitle: "$ cat business-problems.log --priority=high",
  sections: [
    {
      id: "bottleneck",
      title: "01 · Eliminating Bottlenecks & Scaling Limits",
      command: "fix --bottleneck --scale=infinite",
      painTitle: "THE COMPANY'S PAIN:",
      pain: "Slow systems, service outages during traffic spikes, and user churn caused by poor loading experiences.",
      solutionTitle: "MY SOLUTION:",
      solution: "Restructuring architectures to handle high traffic. I've led migrations to distributed systems that reduced response latency by up to 40% and improved load times by 70%. Proven ability to take a product from its early phase and scale it reliably to support hundreds of thousands of concurrent users, guaranteeing high availability (99.9% uptime).",
      metrics: [
        { label: "latency", value: "−40%" },
        { label: "load_time", value: "−70%" },
        { label: "uptime", value: "99.9%" },
        { label: "concurrent_users", value: "100K+" },
      ],
    },
    {
      id: "automation",
      title: "02 · Cutting Operational Load with AI & Automation",
      command: "automate --pipeline --agent --ml",
      painTitle: "THE COMPANY'S PAIN:",
      pain: "Human teams overloaded by repetitive manual processes (customer support, document review, etc.), driving high costs and slow service.",
      solutionTitle: "MY SOLUTION:",
      solution: "Design and integration of autonomous workflows (Pipelines and Intelligent Agents). I've built systems that autonomously resolve up to 92% of user interactions (processing tens of thousands of tickets per month) and pipelines that extract and validate information from thousands of documents automatically, reducing error margin and freeing human talent for strategic tasks.",
      metrics: [
        { label: "autonomy", value: "92%" },
        { label: "tickets/mo", value: "50K+" },
        { label: "docs/mo", value: "100K+" },
        { label: "error_margin", value: "−97%" },
      ],
    },
    {
      id: "security",
      title: "03 · Mitigating Risk in Critical & Transactional Products",
      command: "secure --critical --compliance=on",
      painTitle: "THE COMPANY'S PAIN:",
      pain: "Sensitive data vulnerability, lost e-commerce transactions, or lack of reliability in high-precision environments (e.g. financial sector).",
      solutionTitle: "MY SOLUTION:",
      solution: "Building mission-critical platforms (banking apps, multi-tenant SaaS, high-volume e-commerce) with strict security standards. Implementing encryption, biometric authentication, real-time data sync (even offline) and frictionless payment systems — ensuring business continuity and total end-user trust.",
      metrics: [
        { label: "compliance", value: "PCI/SOC2" },
        { label: "auth", value: "biometric" },
        { label: "sync", value: "real-time" },
        { label: "offline-first", value: "true" },
      ],
    },
    {
      id: "speed",
      title: "04 · Cutting Time-to-Market (Slow Value Delivery)",
      command: "ship --continuous --safe",
      painTitle: "THE COMPANY'S PAIN:",
      pain: "Endless development cycles, deployments breaking production, and lack of agility to respond to competitors.",
      solutionTitle: "MY SOLUTION:",
      solution: "Technical leadership that modernizes the development lifecycle. By implementing continuous delivery, automated integration, and leading teams under efficient methodologies, I've cut deployment time by up to 60%. This lets the company ship new features fast, safely, and with immediate market impact.",
      metrics: [
        { label: "deploy_time", value: "−60%" },
        { label: "incidents", value: "−80%" },
        { label: "lead_time", value: "< 1 day" },
        { label: "forced_rollbacks", value: "0" },
      ],
    },
  ],
  philosophyTitle: "▸ Working Philosophy",
  philosophy:
    "Technology is only the means. A Senior engineer is defined by the ability to take a complex business problem, break it down, and build a maintainable, cost-efficient solution that drives company profitability.",
  closeCmd: "exit",
  scrollHint: "↓ scroll to continue · esc to close",
};

export const profile = {
  get en(): ProfileData { return en; },
  get es(): ProfileData { return es; },
};

export function getProfile(lang: Lang): ProfileData {
  return profile[lang];
}