import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-20 ${className}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-5xl font-bold font-display mb-4"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          {title}
        </span>
        <span className="text-primary">.</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
      <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mt-6 rounded-full" />
    </div>
  );
}
