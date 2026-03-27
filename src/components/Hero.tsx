import React from "react";
import { ArrowRight, PhoneForwarded, Shield, Truck, Clock } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2175&q=80')",
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,70%,12%)] via-[hsl(220,60%,18%)/0.92] to-[hsl(200,80%,25%)/0.85]" />

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[hsl(25,100%,50%)/0.15] to-transparent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-tr from-[hsl(200,90%,50%)/0.15] to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-28 md:py-36 relative z-10">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-dark text-white/90 text-sm font-medium mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Shield size={16} className="text-[hsl(25,100%,55%)]" />
            Trusted Transport Partner Since 2021
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight tracking-tight">
            Professional Transport{" "}
            <span className="gradient-text-secondary">Solutions</span> for All
            Industries
          </h1>
          <p className="text-lg md:text-xl mb-10 text-white/80 max-w-2xl leading-relaxed">
            Specialized transport services for mining commodities, cement,
            groceries, fertilizers, fresh produce, and various industrial goods
            with our modern fleet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#services" className="btn-gradient inline-flex items-center justify-center text-lg">
              Our Services
              <ArrowRight className="ml-2" size={20} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl font-semibold text-lg text-white border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              Request a Quote
              <PhoneForwarded className="ml-2" size={20} />
            </a>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-6 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { icon: Truck, label: "Modern Fleet", value: "34-Ton" },
              { icon: Shield, label: "Safety Record", value: "100%" },
              { icon: Clock, label: "On-Time Rate", value: "99%" },
            ].map((stat, i) => (
              <div key={i} className="text-center glass-card-dark rounded-xl p-4">
                <stat.icon size={20} className="mx-auto mb-1 text-[hsl(25,100%,55%)]" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default Hero;
