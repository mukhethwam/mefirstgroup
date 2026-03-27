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
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            Me First Group is a leading transport company specializing in comprehensive logistics solutions across multiple industries. We've built our reputation on reliability, safety, and efficiency in the transport of mining commodities, construction materials, agricultural products, and consumer goods.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            With our diverse fleet of Tautliner Superlink, Side Tipper, and Flatbed trailers, combined with our experienced team, we provide tailored transport solutions to meet the unique needs of every industry we serve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border border-border shadow-sm card-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mb-5 text-white">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
