import React from "react";
import { Award, Target, Users } from "lucide-react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const values = [
    { icon: <Award size={28} />, title: "Quality Service", description: "We maintain the highest standards in transport services, ensuring safe and efficient delivery every time." },
    { icon: <Target size={28} />, title: "Reliability", description: "Our commitment to timeliness and dependability has made us a trusted partner across multiple industries." },
    { icon: <Users size={28} />, title: "Expert Team", description: "Our experienced drivers and logistics professionals ensure smooth operations from pickup to delivery." },
  ];

  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[hsl(24,100%,50%)/0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[hsl(340,80%,55%)/0.03] blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-20 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Me First Group is a leading transport company specializing in comprehensive logistics solutions across multiple industries. We've built our reputation on reliability, safety, and efficiency.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            With our diverse fleet of Tautliner Superlink, Side Tipper, and Flatbed trailers, combined with our experienced team, we provide tailored transport solutions to meet the unique needs of every industry we serve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-10 apple-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-6 text-white glow-orange">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
