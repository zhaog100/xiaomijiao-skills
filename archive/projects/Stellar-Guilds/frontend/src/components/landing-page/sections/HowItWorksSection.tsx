import React from "react";
import { motion } from "framer-motion";
import { Users, FileText, CheckCircle, Coins } from "lucide-react";
import WorkflowStep from "@/components/landing-page/ui/WorkflowSteps";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Users,
      title: "Create or Join a Guild",
      description:
        "Start your own decentralized guild with customizable governance rules, or join an existing community aligned with your skills and interests.",
    },
    {
      icon: FileText,
      title: "Post & Claim Bounties",
      description:
        "Guild admins post bounties with escrowed funds. Browse available tasks, filter by skills, and claim bounties that match your expertise.",
    },
    {
      icon: CheckCircle,
      title: "Complete & Submit Work",
      description:
        "Work on your claimed bounty, submit deliverables through the platform, and request review from designated guild reviewers.",
    },
    {
      icon: Coins,
      title: "Automatic Rewards",
      description:
        "Upon approval, smart contracts automatically release payment to your wallet. Build reputation and unlock higher-tier opportunities.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-32 bg-slate-900 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              From Idea to{" "}
              <span className="bg-gradient-to-r from-violet-400 to-violet-200 bg-clip-text text-transparent">
                Earnings
              </span>
              <br />
              in Four Steps
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Our streamlined workflow ensures transparent collaboration from
              start to finish. Smart contracts handle the heavy lifting so you
              can focus on what matters — building great things.
            </p>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">~5s</div>
                <div className="text-sm text-slate-500">Settlement Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">0.01 XLM</div>
                <div className="text-sm text-slate-500">
                  Avg. Transaction Fee
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-slate-500">
                  On-Chain Transparency
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Steps */}
          <div className="relative">
            {steps.map((step, index) => (
              <WorkflowStep
                key={step.title}
                number={index + 1}
                {...step}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
