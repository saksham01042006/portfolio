import { motion } from "framer-motion";
import type { Skill } from "@shared/schema";

interface SkillCardProps {
  category: string;
  skills: Skill[];
  delay: number;
}

export function SkillCard({ category, skills, delay }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-colors duration-300 h-full"
    >
      <h3 className="text-xl font-bold font-display mb-6 text-white capitalize flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
        {category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="px-4 py-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 hover:border-primary/30 transition-all text-sm font-medium text-gray-300"
          >
            {skill.name}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
