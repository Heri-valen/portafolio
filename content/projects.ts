export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Scalable microservices-based e-commerce solution",
    longDescription: "Built a full-featured e-commerce platform handling 10K+ daily transactions with real-time inventory management, payment processing, and analytics dashboard.",
    image: "https://picsum.photos/seed/ecommerce/600/400",
    tags: ["VueJS", "Node.js", "PostgreSQL", "Docker", "AWS"],
    github: "https://github.com",
    live: "https://demo.com",
  },
  {
    id: "2",
    title: "Mobile Banking App",
    description: "Native Android & iOS banking application",
    longDescription: "Developed a secure mobile banking application with biometric authentication, real-time notifications, and instant transfers.",
    image: "https://picsum.photos/seed/banking/600/400",
    tags: ["Kotlin", "Swift", "Spring Boot", "AWS"],
    github: "https://github.com",
  },
  {
    id: "3",
    title: "Real Estate CRM",
    description: "Property management and CRM system",
    longDescription: "Full-stack CRM for real estate agencies with property listings, client management, and automated marketing tools.",
    image: "https://picsum.photos/seed/realestate/600/400",
    tags: ["Angular", "C# .NET", "SQL Server", "Azure"],
    live: "https://demo.com",
  },
  {
    id: "4",
    title: "IoT Dashboard",
    description: "Real-time IoT device monitoring system",
    longDescription: "Dashboard for monitoring 1000+ IoT sensors with real-time data visualization, alerts, and predictive maintenance.",
    image: "https://picsum.photos/seed/iot/600/400",
    tags: ["Svelte", "Python", "TimescaleDB", "Docker"],
    github: "https://github.com",
  },
];
