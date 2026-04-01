import React from "react";
import { ArrowRight, PhoneForwarded, Shield, Truck, Clock } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative min-h-[92vh] flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2175&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(217,91%,10%)/0.95] via-[hsl(217,80%,15%)/0.88] to-[hsl(217,70%,20%)/0.75]" />

      <div className="container mx-auto px-4 py-32 md:py-40 relative z-10">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-8 border border-white/15"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Shield size={16} className="text-secondary" />
            Trusted Transport Partner Since 2021
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-[1.08] tracking-tight">
            Professional Transport{" "}
            <span className="text-secondary">Solutions</span> for All Industries
          </h1>
          <p className="text-lg md:text-xl mb-12 text-white/70 max-w-2xl leading-relaxed">
            Specialized transport services for mining commodities, cement,
            groceries, fertilizers, fresh produce, and various industrial goods
            with our modern fleet.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <a href="#services" className="btn-gradient inline-flex items-center justify-center text-lg">
              Our Services
              <ArrowRight className="ml-2" size={20} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold text-lg text-white border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              Request a Quote
              <PhoneForwarded className="ml-2" size={20} />
            </a>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-4 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {[
              { icon: Truck, label: "Modern Fleet", value: "34-Ton" },
              { icon: Shield, label: "Safety Record", value: "100%" },
              { icon: Clock, label: "On-Time Rate", value: "99%" },
            ].map((stat, i) => (
              <div key={i} className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <stat.icon size={18} className="mx-auto mb-1.5 text-secondary" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-[11px] text-white/50 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default Hero;
