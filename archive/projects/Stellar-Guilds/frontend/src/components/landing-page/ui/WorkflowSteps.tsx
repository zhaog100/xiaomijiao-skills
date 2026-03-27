import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  isLast?: boolean;
}

export default function WorkflowStep({
  number,
  title,
  description,
  icon: Icon,
  isLast = false,
}: WorkflowStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: number * 0.15 }}
      viewport={{ once: true }}
      className="relative flex items-start gap-6"
    >
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-violet-500/50 to-transparent" />
      )}

      {/* Step number with glow */}
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 bg-violet-500/30 rounded-full blur-xl animate-pulse" />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 border-2 border-violet-400/50 flex items-center justify-center shadow-lg shadow-violet-500/30">
          <span className="text-2xl font-bold text-white">{number}</span>
        </div>
      </div>

      {/* Content card */}
      <div className="flex-1 pb-12">
        <div className="group p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <Icon className="w-5 h-5 text-violet-400" />
            </div>
            <h4 className="text-xl font-bold text-white">{title}</h4>
          </div>
          <p className="text-slate-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
