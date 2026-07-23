import { t } from "../lib/i18n.ts";

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: { start: string; end: string | null };
  description: string;
  achievements: string[];
  tech: string[];
}

// Base data — company, period, tech are language-neutral.
// role, description, achievements come from i18n (d.experience.entries).
const base: Omit<Experience, "role" | "description" | "achievements">[] = [
  {
    id: "1",
    company: "Tech Corp",
    period: { start: "2020", end: null },
    tech: ["VueJS", "Node.js", "AWS", "Docker", "PostgreSQL"],
  },
  {
    id: "2",
    company: "StartupXYZ",
    period: { start: "2017", end: "2020" },
    tech: ["Angular", "Python", "Django", "Redis", "Docker"],
  },
  {
    id: "3",
    company: "Agency ABC",
    period: { start: "2015", end: "2017" },
    tech: ["PHP", "Laravel", "JavaScript", "MySQL", "AWS"],
  },
];

export function getExperiences(): Experience[] {
  const d = t();
  return base.map((exp, i) => ({
    ...exp,
    role: d.experience.entries[i].role,
    description: d.experience.entries[i].description,
    achievements: d.experience.entries[i].achievements,
  }));
}
