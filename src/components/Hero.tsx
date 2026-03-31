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
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80" />

      {/* Glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[hsl(24,100%,50%)/0.2] via-[hsl(35,100%,55%)/0.08] to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[hsl(340,80%,55%)/0.1] via-[hsl(280,70%,50%)/0.06] to-transparent blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(24,100%,50%)/0.05] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-28 md:py-36 relative z-10">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card-dark text-white/90 text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Shield size={16} className="text-primary" />
            Trusted Transport Partner Since 2021
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-[1.1] tracking-tight">
            Professional Transport{" "}
            <span className="gradient-text-secondary glow-text">Solutions</span> for All
            Industries
          </h1>
          <p className="text-lg md:text-xl mb-12 text-white/60 max-w-2xl leading-relaxed font-light">
            Specialized transport services for mining commodities, cement,
            groceries, fertilizers, fresh produce, and various industrial goods
            with our modern fleet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <a href="#services" className="btn-gradient inline-flex items-center justify-center text-lg">
              Our Services
              <ArrowRight className="ml-2" size={20} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-lg text-white border border-white/20 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300"
            >
              Request a Quote
              <PhoneForwarded className="ml-2" size={20} />
            </a>
          </div>

          <motion.div
            className="grid grid-cols-3 gap-4 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              { icon: Truck, label: "Modern Fleet", value: "34-Ton" },
              { icon: Shield, label: "Safety Record", value: "100%" },
              { icon: Clock, label: "On-Time Rate", value: "99%" },
            ].map((stat, i) => (
              <div key={i} className="text-center glass-card-dark rounded-2xl p-4 border-white/5">
                <stat.icon size={18} className="mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default Hero;
