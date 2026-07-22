export interface Experience {
  id: string;
  company: string;
  role: string;
  period: { start: string; end: string | null };
  description: string;
  achievements: string[];
  tech: string[];
}

export const experiences: Experience[] = [
  {
    id: "1",
    company: "Tech Corp",
    role: "Senior Full-Stack Developer",
    period: { start: "2020", end: null },
    description: "Leading development of enterprise SaaS applications serving 100K+ users.",
    achievements: [
      "Architected microservices migration reducing latency by 40%",
      "Led team of 5 developers in Agile environment",
      "Implemented CI/CD pipelines reducing deploy time by 60%",
    ],
    tech: ["VueJS", "Node.js", "AWS", "Docker", "PostgreSQL"],
  },
  {
    id: "2",
    company: "StartupXYZ",
    role: "Full-Stack Developer",
    period: { start: "2017", end: "2020" },
    description: "Built and scaled MVP from 0 to 50K users.",
    achievements: [
      "Developed real-time features handling 10K concurrent connections",
      "Reduced page load time by 70% through optimization",
      "Integrated 15+ third-party APIs",
    ],
    tech: ["Angular", "Python", "Django", "Redis", "Docker"],
  },
  {
    id: "3",
    company: "Agency ABC",
    role: "Mid-Level Developer",
    period: { start: "2015", end: "2017" },
    description: "Delivered 30+ client projects across various industries.",
    achievements: [
      "Built responsive web applications for Fortune 500 clients",
      "Developed custom CMS solutions",
      "Mentored junior developers",
    ],
    tech: ["PHP", "Laravel", "JavaScript", "MySQL", "AWS"],
  },
];
