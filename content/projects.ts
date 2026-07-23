import { t } from "../lib/i18n.ts";

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

// Base data — image, tags, category, links are language-neutral.
// title, description, longDescription come from i18n (d.projects.entries).
const base: Omit<Project, "title" | "description" | "longDescription">[] = [
  {
    id: "ecommerce-headless",
    image: "https://picsum.photos/seed/wc/600/400",
    tags: ["WooCommerce", "Next.js", "PHP", "Stripe", "REST API"],
    category: "web",
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    id: "wp-multisite",
    image: "https://picsum.photos/seed/wp/600/400",
    tags: ["WordPress", "PHP", "WPGraphQL", "Gutenberg", "ACF"],
    category: "web",
    github: "https://github.com",
  },
  {
    id: "laravel-saas",
    image: "https://picsum.photos/seed/laravel/600/400",
    tags: ["Laravel", "PHP", "MySQL", "Redis", "Stripe"],
    category: "web",
    live: "https://demo.com",
  },
  {
    id: "django-api",
    image: "https://picsum.photos/seed/django/600/400",
    tags: ["Django", "DRF", "PostgreSQL", "Celery", "Docker"],
    category: "web",
    github: "https://github.com",
  },
  {
    id: "banking-app",
    image: "https://picsum.photos/seed/banking/600/400",
    tags: ["Kotlin", "Swift", "Spring Boot", "AWS"],
    category: "mobile",
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    id: "fitness-app",
    image: "https://picsum.photos/seed/fitness/600/400",
    tags: ["Flutter", "Dart", "HealthKit", "Firebase"],
    category: "mobile",
    live: "https://demo.com",
  },
  {
    id: "ai-support-agent",
    image: "https://picsum.photos/seed/agent/600/400",
    tags: ["LangGraph", "OpenAI", "pgvector", "Python"],
    category: "ai",
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    id: "ai-pipeline",
    image: "https://picsum.photos/seed/docai/600/400",
    tags: ["Python", "LangChain", "pgvector", "n8n"],
    category: "ai",
  },
];

export function getProjects(): Project[] {
  const d = t();
  return base.map((p, i) => ({
    ...p,
    title: d.projects.entries[i].title,
    description: d.projects.entries[i].description,
    longDescription: d.projects.entries[i].longDescription,
  }));
}

export const projectCategories: { id: ProjectCategory; label: string }[] = [
  { id: "web", label: "Web · APIs" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI · Agents" },
];
