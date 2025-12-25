import { motion } from "framer-motion";
import type { Project } from "@shared/schema";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col h-full"
      >
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 3).map((tech, i) => (
              <span key={i} className="text-xs font-semibold px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-xs font-semibold px-2 py-1 rounded bg-muted text-muted-foreground">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
          
          <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
            {project.description}
          </p>
          
          <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all mt-auto"
          >
            View Case Study <ArrowRight className="w-4 h-4 text-primary" />
          </button>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-3xl font-display font-bold mb-2">{project.title}</DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground">
              {project.description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-8">
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted border border-white/10">
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-primary mb-2">The Challenge</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.problemStatement}
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-secondary mb-2">The Outcome</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.outcome}
                </p>
              </div>
            </div>

            <div className="bg-muted/30 p-6 rounded-xl border border-white/5">
              <h4 className="text-lg font-bold mb-4">Technical Solution</h4>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {project.solution}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-background rounded-full text-sm font-medium border border-border">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/10">
              {project.githubLink && (
                <a 
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors font-medium"
                >
                  <Github className="w-5 h-5" /> Source Code
                </a>
              )}
              {project.demoLink && (
                <a 
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
                >
                  <ExternalLink className="w-5 h-5" /> Live Demo
                </a>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
