import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SectionHeading } from "@/components/SectionHeading";
import { SkillCard } from "@/components/SkillCard";
import { ProjectCard } from "@/components/ProjectCard";
import { useSkills, useProjects, useExperience, useEducation, useContact } from "@/hooks/use-portfolio";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: skills = [] } = useSkills();
  const { data: projects = [] } = useProjects();
  const { data: experience = [] } = useExperience();
  const { data: education = [] } = useEducation();
  const contactMutation = useContact();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  // Group skills by category
  const skillCategories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        {/* Background Gradients */}
        <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-secondary font-medium tracking-wide mb-4">FULL STACK DEVELOPER & AI ENTHUSIAST</h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight">
              Building <span className="text-gradient">Digital</span><br />
              <span className="text-white">Experiences.</span>
            </h1>
            <p className="text-muted-foreground text-xl md:text-2xl max-w-xl mb-8 leading-relaxed">
              I craft robust backend systems and intuitive frontend interfaces, bridging the gap between complex logic and beautiful design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                className="bg-white text-black hover:bg-gray-200 text-lg h-14 px-8 rounded-full font-bold"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 hover:bg-white/10 text-lg h-14 px-8 rounded-full"
              >
                <Download className="mr-2 h-5 w-5" /> Download Resume
              </Button>
            </div>

            <div className="mt-12 flex gap-6 text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors"><Github className="w-6 h-6" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-6 h-6" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="mailto:saks9046@gmail.com" className="hover:text-primary transition-colors"><Mail className="w-6 h-6" /></a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Abstract Tech Illustration - CSS only to be lightweight */}
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full opacity-20 animate-pulse" />
              <div className="absolute inset-10 bg-card rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="grid grid-cols-6 gap-2 opacity-20 rotate-12 scale-150">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded bg-white/20" />
                  ))}
                </div>
                {/* Developer Image Placeholder */}
                {/* descriptive comment: modern developer working at laptop in neon lit room */}
                <img
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&auto=format&fit=crop"
                  alt="Developer"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                    <span className="text-4xl font-bold font-display text-white">5+</span>
                    <p className="text-sm text-muted-foreground mt-1">Years of<br />Innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-card/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="About Me" subtitle="The person behind the code" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate developer with a deep love for problem-solving. My journey began with simple HTML pages and evolved into complex full-stack applications powered by modern technologies.
              </p>
              <p>
                When I'm not coding, I'm exploring the latest in AI, contributing to open source, or optimizing my development workflow. I believe in writing clean, maintainable code that solves real-world problems.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-background p-4 rounded-xl border border-white/5">
                  <h4 className="text-2xl font-bold text-primary mb-1">50+</h4>
                  <p className="text-sm text-gray-400">Projects Completed</p>
                </div>
                <div className="bg-background p-4 rounded-xl border border-white/5">
                  <h4 className="text-2xl font-bold text-secondary mb-1">100%</h4>
                  <p className="text-sm text-gray-400">Client Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                {/* descriptive comment: abstract code or futuristic workspace setup */}
                <img
                  src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&auto=format&fit=crop"
                  alt="Workspace"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-background border border-border p-6 rounded-xl flex flex-col justify-center">
                <p className="text-sm text-muted-foreground mb-2">Currently working on</p>
                <p className="font-bold text-white">AI-Powered Analytics Platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading title="Technical Arsenal" subtitle="Tools & technologies I work with" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skillCategories).map(([category, items], index) => (
              <SkillCard
                key={category}
                category={category}
                skills={items}
                delay={index * 0.1}
              />
            ))}
            {/* Fallback if no skills loaded */}
            {skills.length === 0 && (
              <div className="col-span-4 text-center text-muted-foreground py-12">
                Loading skills...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Featured Projects" subtitle="Selected works that showcase my capabilities" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
            {projects.length === 0 && (
              <div className="col-span-full text-center py-20 bg-muted/20 rounded-xl">
                <p className="text-muted-foreground">Projects loading...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Experience" subtitle="My professional journey" />

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-card shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <div className="w-3 h-3 bg-primary rounded-full group-hover:scale-125 transition-transform" />
                </div>

                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <h3 className="font-bold font-display text-xl text-white">{exp.role}</h3>
                    <time className="text-sm text-primary font-mono bg-primary/10 px-2 py-1 rounded">{exp.duration}</time>
                  </div>
                  <h4 className="text-lg text-secondary mb-4">{exp.company}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-24">
            <h3 className="text-2xl font-bold font-display mb-8 text-center">Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <div key={edu.id} className="p-6 rounded-2xl bg-muted/20 border border-white/5 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-lg text-white">{edu.degree}</h4>
                    <p className="text-muted-foreground">{edu.institution}</p>
                  </div>
                  <span className="text-sm font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {edu.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Solving / Innovation Section */}
      <section className="py-24 bg-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading title="Innovation & Problem Solving" className="text-center items-center flex flex-col" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Performance Optimization</h3>
              <p className="text-muted-foreground">
                Reducing load times and optimizing database queries to ensure scalable, lightning-fast applications.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-background border border-border hover:border-secondary/50 transition-all group">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-black transition-colors text-secondary">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Complex Architecture</h3>
              <p className="text-muted-foreground">
                Designing microservices and modular monoliths that handle complex business logic with ease.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-background border border-border hover:border-accent/50 transition-all group">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:text-white transition-colors text-accent">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-4">AI Integration</h3>
              <p className="text-muted-foreground">
                Leveraging LLMs and machine learning to build smarter, more adaptive user experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Get In Touch" subtitle="Let's build something amazing together" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-3xl font-display font-bold">Ready to start?</h3>
              <p className="text-muted-foreground text-lg">
                I'm currently available for freelance projects and full-time opportunities.
                If you have a project that needs some creative direction or technical expertise, I'd love to hear from you.
              </p>

              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors p-4 rounded-xl bg-card border border-border">
                  <Mail className="w-6 h-6 text-primary" />
                  <span>saks9046@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors p-4 rounded-xl bg-card border border-border">
                  <Linkedin className="w-6 h-6 text-secondary" />
                  <span>linkedin.com/in/developer</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground hover:text-white transition-colors p-4 rounded-xl bg-card border border-border">
                  <Github className="w-6 h-6 text-white" />
                  <span>github.com/developer</span>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border shadow-2xl relative z-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} className="bg-background/50 border-white/10 focus:border-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} className="bg-background/50 border-white/10 focus:border-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project..."
                            className="resize-none min-h-[150px] bg-background/50 border-white/10 focus:border-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-6 text-lg rounded-xl hover:opacity-90 transition-opacity"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-muted-foreground border-t border-white/5 mt-12 bg-black/20">
        <p>© {new Date().getFullYear()} Dev Portfolio. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}
