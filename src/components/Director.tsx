import React from "react";
import { User, Briefcase, Handshake, UserRound, ExternalLink, MapPin, Clock } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const Director = () => {
  return (
    <section id="director" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Meet Our Director</h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-12">
          <motion.div
            className="w-full lg:w-1/3 flex flex-col items-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative mb-6">
              <Avatar className="h-56 w-56 border-4 border-card shadow-2xl">
                <AvatarImage src="/lovable-uploads/44daee58-b83d-47b2-8e46-79cdb9b9ab5d.png" alt="Mr. M.E Masevhe" className="object-cover object-top h-full w-full" />
                <AvatarFallback className="text-4xl bg-primary text-primary-foreground">ME</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-secondary text-white px-4 py-1.5 rounded-lg shadow-lg text-xs font-bold">
                DIRECTOR
              </div>
            </div>

            <div className="text-center bg-card p-6 rounded-2xl shadow-sm border border-border w-full">
              <h3 className="text-xl font-bold text-foreground mb-1">Mr. M.E Masevhe</h3>
              <p className="text-secondary font-semibold text-sm mb-3">Founder & Executive Director</p>
              <div className="flex items-center justify-center text-sm text-muted-foreground gap-1 mb-1.5">
                <MapPin size={13} /> Johannesburg, South Africa
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                <Clock size={13} /> 3+ Years in Transport Industry
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/3 space-y-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <User size={20} className="text-primary" /> Professional Overview
              </h4>
              <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
                Mr. M.E Masevhe is a visionary leader who founded Me First Group with a mission to revolutionize transport in South Africa. With over 3 years of hands-on experience, he has built the company into a trusted partner for mining, construction, and agricultural sectors.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                His deep understanding of the transport landscape, combined with his commitment to innovation and safety, has positioned Me First Group as a leader in specialized transport.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
              <h4 className="text-lg font-bold text-foreground mb-5">Leadership & Core Values</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Briefcase, title: "Transport Excellence", quote: "Every delivery is a promise kept. We maintain the highest standards in safety." },
                  { icon: Handshake, title: "Customer Partnership", quote: "Our clients' success is our success. We build long-term partnerships on trust." },
                  { icon: UserRound, title: "Team Empowerment", quote: "Our people are our greatest asset. Fair treatment and growth drive success." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="p-5 bg-accent rounded-xl border border-border hover:border-secondary/20 transition-all duration-300"
                    whileHover={{ y: -3 }}
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <item.icon size={16} className="text-primary" />
                    </div>
                    <h5 className="font-semibold mb-2 text-foreground text-sm">{item.title}</h5>
                    <p className="text-xs text-muted-foreground italic leading-relaxed">"{item.quote}"</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
              <h4 className="text-lg font-bold text-foreground mb-4">Industry Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {["Mining Transport", "Heavy Haulage", "Fleet Management", "Safety Compliance", "Route Optimization", "Agricultural Logistics", "Construction Materials", "Supply Chain"].map((tag) => (
                  <span key={tag} className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-medium">{tag}</span>
                ))}
              </div>
            </div>

            <div className="gradient-bg-dark text-white p-8 rounded-2xl shadow-xl">
              <h4 className="text-lg font-bold mb-3">Director's Vision</h4>
              <p className="text-white/70 leading-relaxed italic text-sm">
                "I envision Me First Group as the benchmark for transport excellence in Africa. Through continuous innovation, strategic partnerships, and unwavering commitment to our values, we will expand our reach while maintaining the reliability that defines us."
              </p>
              <p className="mt-3 text-right text-xs text-white/40">— Mr. M.E Masevhe, Founder & Executive Director</p>
            </div>

            <div className="text-center">
              <a href="#contact" className="btn-gradient inline-flex items-center gap-2">
                Connect with our Director <ExternalLink size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Director;
