import React from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, 
  Eye, 
  Vote, 
  Star,
  Shield,
  Rocket,
} from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Trophy,
      title: 'Earn Reputation',
      description: 'Build a verifiable track record that travels with you across the ecosystem.',
      gradient: 'from-violet-500 to-violet-600',
    },
    {
      icon: Eye,
      title: 'Transparent Payments',
      description: 'Every transaction is recorded on-chain. No hidden fees, no surprises.',
      gradient: 'from-violet-500 to-violet-600',
    },
    {
      icon: Vote,
      title: 'Governance Rights',
      description: 'Stake in guilds, vote on proposals, and shape community direction.',
      gradient: 'from-violet-500 to-violet-600',
    },
    {
      icon: Star,
      title: 'Premium Bounties',
      description: 'High reputation unlocks access to exclusive, higher-paying opportunities.',
      gradient: 'from-violet-500 to-violet-600',
    },
    {
      icon: Shield,
      title: 'Fair Arbitration',
      description: 'Community-driven dispute resolution with economic incentives for fairness.',
      gradient: 'from-violet-500 to-violet-600',
    },
    {
      icon: Rocket,
      title: 'Fast Settlement',
      description: 'Near-instant payments via Stellar. No waiting days for bank transfers.',
      gradient: 'from-violet-500 to-violet-600',
    },
  ];

  return (
    <section id="benefits" className="relative py-32 bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
            Developer Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Why Developers{' '}
            <span className="bg-gradient-to-r from-violet-400 to-violet-200 bg-clip-text text-transparent">
              Love Us
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Built by developers, for developers. Every feature is designed to maximize 
            your earning potential and career growth.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 h-full">
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${benefit.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reputation badge showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900/50 border border-slate-800 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Reputation Tiers
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Progress through tiers by completing bounties and receiving positive reviews. 
                  Each tier unlocks new opportunities and higher earning potential.
                </p>
              </div>
              
              {/* Badge display */}
              <div className="flex flex-wrap justify-center md:justify-end gap-4">
                {[
                  { name: 'Bronze', color: 'from-amber-700 to-amber-900', border: 'border-amber-600/50' },
                  { name: 'Silver', color: 'from-slate-400 to-slate-600', border: 'border-slate-400/50' },
                  { name: 'Gold', color: 'from-amber-400 to-amber-600', border: 'border-amber-400/50' },
                  { name: 'Diamond', color: 'from-cyan-400 to-violet-500', border: 'border-cyan-400/50' },
                ].map((tier, index) => (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group cursor-pointer"
                  >
                    <div className={`
                      w-20 h-20 rounded-2xl bg-gradient-to-br ${tier.color} border-2 ${tier.border}
                      flex items-center justify-center
                      group-hover:scale-110 group-hover:shadow-2xl transition-all duration-300
                    `}>
                      <Trophy className="w-8 h-8 text-white/90" />
                    </div>
                    <p className="text-center text-sm text-slate-400 mt-2 font-medium">{tier.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}