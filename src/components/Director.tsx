import React from "react";
import { User, Briefcase, Handshake, UserRound, ExternalLink, MapPin, Clock } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const Director = () => {
  return (
    <section id="director" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Meet Our Director</h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-12">
          {/* Director Image */}
          <motion.div
            className="w-full lg:w-1/3 flex flex-col items-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative mb-6">
              <div className="absolute -inset-2 gradient-bg-secondary rounded-full opacity-30 blur-xl" />
              <Avatar className="h-64 w-64 border-4 border-white shadow-2xl relative">
                <AvatarImage src="/lovable-uploads/44daee58-b83d-47b2-8e46-79cdb9b9ab5d.png" alt="Mr. M.E Masevhe" className="object-cover object-top h-full w-full" />
                <AvatarFallback className="text-4xl gradient-bg text-white">ME</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-3 -right-3 gradient-bg-secondary text-white px-4 py-2 rounded-xl shadow-lg text-xs font-bold">
                DIRECTOR
              </div>
            </div>

            <div className="text-center bg-card p-6 rounded-2xl shadow-lg border border-border w-full">
              <h3 className="text-2xl font-bold gradient-text mb-2">Mr. M.E Masevhe</h3>
              <p className="gradient-text-secondary font-semibold mb-3">Founder & Executive Director</p>
              <div className="flex items-center justify-center text-sm text-muted-foreground gap-1 mb-2">
                <MapPin size={14} /> Johannesburg, South Africa
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                <Clock size={14} /> 3+ Years in Transport Industry
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="w-full lg:w-2/3 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
              <h4 className="text-xl font-bold gradient-text mb-4 flex items-center gap-2">
                <User size={22} /> Professional Overview
              </h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Mr. M.E Masevhe is a visionary leader and entrepreneur who founded Me First Group with a clear mission to revolutionize the transport industry in South Africa. With over 3 years of hands-on experience in logistics and transportation, he has built the company from the ground up into a trusted partner for mining, construction, and agricultural sectors.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                His deep understanding of the South African transport landscape, combined with his commitment to innovation and safety, has positioned Me First Group as a leader in specialized transport solutions.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
              <h4 className="text-xl font-bold gradient-text mb-6">Leadership Philosophy & Core Values</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Briefcase, title: "Transport Excellence", quote: "Every delivery is a promise kept. We maintain the highest standards in safety, reliability, and efficiency." },
                  { icon: Handshake, title: "Customer Partnership", quote: "Our clients' success is our success. We build long-term partnerships based on trust and exceptional service." },
                  { icon: UserRound, title: "Team Empowerment", quote: "Our people are our greatest asset. Fair treatment, continuous training, and growth opportunities drive our success." },
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-accent rounded-2xl border border-border card-hover">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mb-3">
                      <item.icon size={18} className="text-white" />
                    </div>
                    <h5 className="font-semibold mb-2 text-foreground text-sm">{item.title}</h5>
                    <p className="text-xs text-muted-foreground italic">"{item.quote}"</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
              <h4 className="text-xl font-bold gradient-text mb-4">Industry Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {["Mining Transport", "Heavy Haulage", "Fleet Management", "Safety Compliance", "Route Optimization", "Agricultural Logistics", "Construction Materials", "Supply Chain Management"].map((tag) => (
                  <span key={tag} className="gradient-bg text-white px-4 py-1.5 rounded-full text-xs font-medium">{tag}</span>
                ))}
              </div>
            </div>

            <div className="gradient-bg-dark text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[hsl(25,100%,50%)/0.1] blur-2xl" />
              <h4 className="text-xl font-bold mb-4 relative z-10">Director's Vision for the Future</h4>
              <p className="text-lg leading-relaxed italic text-white/80 relative z-10">
                "I envision Me First Group as the benchmark for transport excellence in Africa. Through continuous innovation, strategic partnerships, and unwavering commitment to our values, we will expand our reach while maintaining the personal touch and reliability that defines us."
              </p>
              <p className="mt-4 text-right text-sm text-white/50 relative z-10">— Mr. M.E Masevhe, Founder & Executive Director</p>
            </div>

            <div className="text-center">
              <a href="#contact" className="btn-gradient inline-flex items-center gap-2">
                Connect with our Director <ExternalLink size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Director;
