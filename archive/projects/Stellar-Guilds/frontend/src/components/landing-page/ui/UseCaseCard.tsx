import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface UseCaseCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}

export default function UseCaseCard({
  icon: Icon,
  title,
  description,
  gradient,
  delay = 0,
}: UseCaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="relative h-full p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-violet-500/30 transition-colors overflow-hidden">
        {/* Gradient background on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />

        {/* Icon */}
        <div className="relative z-10 mb-4 inline-flex">
          <div
            className={`relative p-3 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-10`}
          >
            <Icon className="w-6 h-6 text-violet-400" />
          </div>
        </div>

        {/* Content */}
        <h3 className="relative z-10 text-xl font-semibold text-white mb-2">
          {title}
        </h3>
        <p className="relative z-10 text-slate-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
