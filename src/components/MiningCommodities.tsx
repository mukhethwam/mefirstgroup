import React from "react";
import { motion } from "framer-motion";

interface CommodityCardProps {
  name: string;
  image: string;
  description: string;
  index: number;
}

const CommodityCard = ({ name, image, description, index }: CommodityCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="group bg-card rounded-3xl shadow-md overflow-hidden border border-border card-hover"
    >
      <div className="h-52 overflow-hidden relative">
        <img src={image} alt={name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215,50%,15%)/0.5] to-transparent" />
      </div>
      <div className="p-7">
        <h3 className="text-xl font-bold mb-2 gradient-text">{name}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const MiningCommodities = () => {
  const commodities = [
    { name: "Manganese", image: "/lovable-uploads/14958783-fe80-43b1-b0d6-7dac2a26f2f8.png", description: "Essential in steel production and batteries, requiring specialized transport due to its density and weight." },
    { name: "Chrome", image: "/lovable-uploads/a1d1d01d-9c70-4406-9545-f3204082fdcd.png", description: "Used in stainless steel and metal plating, chrome requires careful handling during transport." },
    { name: "Coal", image: "/lovable-uploads/2699f7ba-cc91-4c5b-bcfa-28f66e3c834d.png", description: "A primary energy source requiring efficient bulk transportation solutions for power generation." },
  ];

  return (
    <section className="section-padding bg-accent relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[hsl(215,60%,40%)/0.05] blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Mining Commodities We Transport</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            Me First Group specializes in the safe and efficient transport of various mining commodities, including but not limited to the following materials.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {commodities.map((commodity, index) => (
            <CommodityCard key={index} name={commodity.name} image={commodity.image} description={commodity.description} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MiningCommodities;
