import { db } from "./db";
import {
  skills, projects, experience, education, messages,
  type InsertMessage, type Skill, type Project, type Experience, type Education, type Message
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getSkills(): Promise<Skill[]>;
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getExperience(): Promise<Experience[]>;
  getEducation(): Promise<Education[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  seed(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getExperience(): Promise<Experience[]> {
    return await db.select().from(experience);
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async seed(): Promise<void> {
    // Check if data exists
    const existingSkills = await this.getSkills();
    if (existingSkills.length > 0) return;

    // Seed Skills
    await db.insert(skills).values([
      { name: "React", category: "frontend", proficiency: 90 },
      { name: "TypeScript", category: "frontend", proficiency: 85 },
      { name: "Tailwind CSS", category: "frontend", proficiency: 95 },
      { name: "Node.js", category: "backend", proficiency: 80 },
      { name: "PostgreSQL", category: "backend", proficiency: 75 },
      { name: "Python", category: "ai_ml", proficiency: 70 },
      { name: "TensorFlow", category: "ai_ml", proficiency: 60 },
      { name: "Git", category: "tools", proficiency: 85 },
      { name: "Docker", category: "tools", proficiency: 70 },
    ]);

    // Seed Projects
    await db.insert(projects).values([
      {
        title: "AI-Powered Code Assistant",
        description: "An intelligent coding companion that suggests optimizations in real-time.",
        problemStatement: "Developers spend too much time looking up boilerplate code and best practices.",
        techStack: ["Python", "TensorFlow", "React", "Node.js"],
        challenges: "Minimizing latency for real-time inference was a major hurdle.",
        solution: "Implemented a lightweight model and utilized WebSocket for streaming responses.",
        outcome: "Reduced coding time by 30% for beta testers.",
        githubLink: "https://github.com",
        demoLink: "https://demo.com",
        imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
      },
      {
        title: "E-Commerce Analytics Dashboard",
        description: "A comprehensive dashboard for tracking sales and user engagement.",
        problemStatement: "Small businesses lack accessible tools to visualize their data effectively.",
        techStack: ["Vue.js", "D3.js", "Express", "MongoDB"],
        challenges: "Handling large datasets without freezing the UI.",
        solution: "Used web workers for data processing and virtualized lists for rendering.",
        outcome: "Empowered 50+ local businesses to make data-driven decisions.",
        githubLink: "https://github.com",
        demoLink: "https://demo.com",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      },
      {
        title: "Social Media Sentiment Analyzer",
        description: "Analyze brand sentiment across multiple social platforms.",
        problemStatement: "Brands struggle to track public perception in real-time.",
        techStack: ["Python", "NLP", "React", "FastAPI"],
        challenges: "Filtering out spam and irrelevant bot traffic.",
        solution: "Developed a custom NLP pipeline to classify sentiment with 85% accuracy.",
        outcome: "Helped brands respond to PR crises 2x faster.",
        githubLink: "https://github.com",
        demoLink: "https://demo.com",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      }
    ]);

    // Seed Experience
    await db.insert(experience).values([
      {
        role: "Senior Full Stack Developer",
        company: "TechNova Solutions",
        duration: "2023 - Present",
        description: "Leading a team of 5 developers to build scalable SaaS products. Architected a microservices backend handling 10k+ concurrent users.",
      },
      {
        role: "Frontend Developer",
        company: "Creative Pixel Agency",
        duration: "2021 - 2023",
        description: "Collaborated with designers to implement pixel-perfect UIs. Improved site performance scores by 40% through code splitting and lazy loading.",
      },
    ]);

    // Seed Education
    await db.insert(education).values([
      {
        degree: "B.S. Computer Science",
        institution: "University of Technology",
        year: "2021",
      },
      {
        degree: "Certified Cloud Practitioner",
        institution: "AWS Certification",
        year: "2022",
      },
    ]);
  }
}

export const storage = new DatabaseStorage();
