export interface Skill {
  id: string;
  name: string;
  category: "language" | "framework" | "mobile" | "devops";
  level: number;
  icon: string;
}

export const skills: Skill[] = [
  { id: "python", name: "Python", category: "language", level: 5, icon: "🐍" },
  { id: "javascript", name: "JavaScript", category: "language", level: 5, icon: "📜" },
  { id: "typescript", name: "TypeScript", category: "language", level: 5, icon: "📘" },
  { id: "php", name: "PHP", category: "language", level: 4, icon: "🐘" },
  { id: "csharp", name: "C# .NET", category: "language", level: 4, icon: "🔷" },
  { id: "java", name: "Java", category: "language", level: 4, icon: "☕" },

  { id: "vuejs", name: "VueJS", category: "framework", level: 5, icon: "💚" },
  { id: "svelte", name: "Svelte", category: "framework", level: 4, icon: "🔥" },
  { id: "angular", name: "Angular", category: "framework", level: 4, icon: "🅰️" },

  { id: "kotlin", name: "Kotlin (Android)", category: "mobile", level: 4, icon: "🤖" },
  { id: "swift", name: "Swift (iOS)", category: "mobile", level: 3, icon: "🍎" },

  { id: "docker", name: "Docker", category: "devops", level: 5, icon: "🐳" },
  { id: "aws", name: "AWS", category: "devops", level: 4, icon: "☁️" },
];

export const categories = [
  { id: "language", label: "Languages" },
  { id: "framework", label: "Frameworks & Libraries" },
  { id: "mobile", label: "Mobile Development" },
  { id: "devops", label: "DevOps & Cloud" },
];
