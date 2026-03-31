import React from "react";
import { Target, Eye } from "lucide-react";
import { motion } from "framer-motion";

const MissionVision = () => {
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      <div className="absolute -top-20 right-0 w-72 h-72 rounded-full bg-[hsl(215,70%,40%)/0.04] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-0 w-72 h-72 rounded-full bg-[hsl(25,90%,50%)/0.04] blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Target,
              title: "Our Mission",
              paragraphs: [
                "To provide exceptional transport and logistics services to the mining industry, ensuring safe, reliable, and efficient delivery of mining commodities while maintaining the highest standards of customer service and operational excellence.",
                "We are committed to supporting the growth of the mining sector by offering specialized transport solutions that meet the unique challenges of moving valuable mining commodities across Southern Africa.",
              ],
            },
            {
              icon: Eye,
              title: "Our Vision",
              paragraphs: [
                "To be the leading transport partner for the mining industry in Southern Africa, recognized for our reliability, safety record, and commitment to excellence in all aspects of our operations.",
                "We envision expanding our footprint across the region while maintaining our core values of integrity, professionalism, and customer focus, becoming the first choice for mining companies who need dependable transport solutions.",
              ],
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-accent p-8 rounded-2xl border border-border shadow-sm card-hover"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="flex items-center mb-6 gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center">
                  <item.icon size={28} className="text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold gradient-text">{item.title}</h2>
              </div>
              {item.paragraphs.map((p, j) => (
                <p key={j} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                  {p}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
