export type ProjectCategory = "web" | "mobile" | "ai";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: ProjectCategory;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: "ecommerce-headless",
    title: "WooCommerce Headless Store",
    description: "Headless e-commerce with custom storefront",
    longDescription:
      "WooCommerce + Next.js storefront with Stripe/PayPal gateways, custom REST endpoints, webhooks for inventory sync, and an admin dashboard for orders/analytics. ~3K SKUs, 99.9% uptime.",
    image: "https://picsum.photos/seed/wc/600/400",
    tags: ["WooCommerce", "Next.js", "PHP", "Stripe", "REST API"],
    category: "web",
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    id: "wp-multisite",
    title: "WordPress Multisite Network",
    description: "Custom themes + proprietary plugins",
    longDescription:
      "Multisite network with 12 subsites. Built a custom block theme (FSE), 4 proprietary plugins (auth, booking, CRM, SEO). Headless WP feeding a Next.js frontend via WPGraphQL.",
    image: "https://picsum.photos/seed/wp/600/400",
    tags: ["WordPress", "PHP", "WPGraphQL", "Gutenberg", "ACF"],
    category: "web",
    github: "https://github.com",
  },
  {
    id: "laravel-saas",
    title: "Laravel SaaS Platform",
    description: "Multi-tenant SaaS with billing & queues",
    longDescription:
      "Laravel 11 + Inertia.js multi-tenant SaaS. Stripe subscriptions, Horizon queues, spatie/laravel-permission, custom REST + GraphQL APIs, websockets for live notifications.",
    image: "https://picsum.photos/seed/laravel/600/400",
    tags: ["Laravel", "PHP", "MySQL", "Redis", "Stripe"],
    category: "web",
    live: "https://demo.com",
  },
  {
    id: "django-api",
    title: "Django REST API Platform",
    description: "Scalable Python API with DRF",
    longDescription:
      "Django 5 + DRF + Celery. JWT auth, OpenAPI spec, Celery + Redis for async jobs, pgvector for similarity search. Powers a fleet of mobile apps and partner integrations.",
    image: "https://picsum.photos/seed/django/600/400",
    tags: ["Django", "DRF", "PostgreSQL", "Celery", "Docker"],
    category: "web",
    github: "https://github.com",
  },
  {
    id: "banking-app",
    title: "Mobile Banking App",
    description: "Native Android & iOS banking",
    longDescription:
      "Secure mobile banking with biometric auth, real-time notifications, instant transfers. Kotlin Coroutines + SwiftUI, end-to-end encryption, audit logs.",
    image: "https://picsum.photos/seed/banking/600/400",
    tags: ["Kotlin", "Swift", "Spring Boot", "AWS"],
    category: "mobile",
    github: "https://github.com",
  },
  {
    id: "fitness-app",
    title: "Fitness Tracking App",
    description: "HealthKit & Google Fit integration",
    longDescription:
      "Cross-platform fitness app using HealthKit + Google Fit. Real-time sync, offline-first sync engine, custom ML for activity recognition.",
    image: "https://picsum.photos/seed/fitness/600/400",
    tags: ["Flutter", "Dart", "HealthKit", "Firebase"],
    category: "mobile",
    live: "https://demo.com",
  },
  {
    id: "ai-support-agent",
    title: "AI Support Agent",
    description: "Multi-channel agent with RAG + tools",
    longDescription:
      "Production agent serving 50K tickets/month. RAG over docs, function-calling for refunds/order lookups, escalation to humans, full Langfuse tracing.",
    image: "https://picsum.photos/seed/agent/600/400",
    tags: ["LangGraph", "OpenAI", "pgvector", "Python"],
    category: "ai",
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    id: "ai-pipeline",
    title: "Document AI Pipeline",
    description: "OCR + LLM extraction at scale",
    longDescription:
      "Async document processing pipeline. OCR (Tesseract + LayoutLM), LLM extraction, structured outputs, confidence scoring, human review queue. 100K docs/month.",
    image: "https://picsum.photos/seed/docai/600/400",
    tags: ["Python", "LangChain", "pgvector", "n8n"],
    category: "ai",
  },
];

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "web", label: "Web · APIs" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI · Agents" },
];