export interface Skill {
  id: string;
  name: string;
  category: "language" | "framework" | "mobile" | "devops" | "cms";
  level: number;
  icon: string;
}

export const skills: Skill[] = [
  { id: "python", name: "Python", category: "language", level: 5, icon: "🐍" },
  { id: "javascript", name: "JavaScript", category: "language", level: 5, icon: "📜" },
  { id: "typescript", name: "TypeScript", category: "language", level: 5, icon: "📘" },
  { id: "php", name: "PHP", category: "language", level: 5, icon: "🐘" },
  { id: "csharp", name: "C# .NET", category: "language", level: 4, icon: "🔷" },
  { id: "java", name: "Java", category: "language", level: 4, icon: "☕" },
  { id: "go", name: "Go", category: "language", level: 3, icon: "🦫" },

  { id: "vuejs", name: "VueJS", category: "framework", level: 5, icon: "💚" },
  { id: "react", name: "React", category: "framework", level: 5, icon: "⚛️" },
  { id: "nextjs", name: "Next.js", category: "framework", level: 5, icon: "▲" },
  { id: "svelte", name: "Svelte", category: "framework", level: 4, icon: "🔥" },
  { id: "angular", name: "Angular", category: "framework", level: 4, icon: "🅰️" },
  { id: "tailwind", name: "Tailwind CSS", category: "framework", level: 5, icon: "🎨" },
  { id: "django", name: "Django", category: "framework", level: 5, icon: "🧩" },
  { id: "fastapi", name: "FastAPI", category: "framework", level: 5, icon: "⚡" },
  { id: "laravel", name: "Laravel", category: "framework", level: 5, icon: "🎼" },
  { id: "symfony", name: "Symfony", category: "framework", level: 4, icon: "🎵" },

  { id: "kotlin", name: "Kotlin (Android)", category: "mobile", level: 4, icon: "🤖" },
  { id: "swift", name: "Swift (iOS)", category: "mobile", level: 4, icon: "🍎" },
  { id: "react-native", name: "React Native", category: "mobile", level: 5, icon: "📱" },
  { id: "expo", name: "Expo", category: "mobile", level: 5, icon: "🚀" },
  { id: "flutter", name: "Flutter", category: "mobile", level: 4, icon: "🦋" },
  { id: "swiftui", name: "SwiftUI", category: "mobile", level: 4, icon: "✨" },
  { id: "jetpack", name: "Jetpack Compose", category: "mobile", level: 4, icon: "🧪" },

  { id: "docker", name: "Docker", category: "devops", level: 5, icon: "🐳" },
  { id: "kubernetes", name: "Kubernetes", category: "devops", level: 4, icon: "⎈" },
  { id: "aws", name: "AWS", category: "devops", level: 4, icon: "☁️" },
  { id: "gcp", name: "Google Cloud", category: "devops", level: 4, icon: "🌐" },
  { id: "ci-cd", name: "CI/CD", category: "devops", level: 5, icon: "🔁" },
  { id: "terraform", name: "Terraform", category: "devops", level: 4, icon: "🏗️" },

  { id: "wordpress", name: "WordPress", category: "cms", level: 5, icon: "📰" },
  { id: "wp-themes", name: "WP Theme Dev", category: "cms", level: 5, icon: "🎨" },
  { id: "wp-plugins", name: "WP Plugins", category: "cms", level: 5, icon: "🔌" },
  { id: "woocommerce", name: "WooCommerce", category: "cms", level: 5, icon: "🛒" },
  { id: "shopify", name: "Shopify", category: "cms", level: 4, icon: "🛍️" },
];

export const categories = [
  { id: "language", label: "Languages" },
  { id: "framework", label: "Frameworks & Libraries" },
  { id: "mobile", label: "Mobile Development" },
  { id: "devops", label: "DevOps & Cloud" },
  { id: "cms", label: "CMS & E-commerce" },
];