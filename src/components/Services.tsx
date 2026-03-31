import React from "react";
import { Truck, Package, Mountain, Clock, Building2, ShoppingCart, Wheat, Apple } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon, title, description, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group apple-card p-7 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mb-5 text-white group-hover:scale-110 transition-transform duration-300 glow-orange">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    { icon: <Mountain size={22} />, title: "Mining Commodity Transport", description: "Specialized transport of manganese, chrome, coal, and other mining materials with our advanced fleet of side tipper trucks." },
    { icon: <Building2 size={22} />, title: "Cement & Construction Materials", description: "Reliable transport solutions for cement, aggregates, and construction materials to support building projects across the region." },
    { icon: <ShoppingCart size={22} />, title: "Grocery & Consumer Goods", description: "Efficient distribution of groceries and consumer products with temperature-controlled and secure transport options." },
    { icon: <Wheat size={22} />, title: "Agricultural Fertilizers", description: "Safe and compliant transport of fertilizers and agricultural inputs to support farming operations nationwide." },
    { icon: <Apple size={22} />, title: "Fresh Produce Transport", description: "Temperature-controlled transport for fruits, vegetables, and perishable goods maintaining freshness from farm to market." },
    { icon: <Package size={22} />, title: "General Freight & Cargo", description: "Comprehensive transport solutions for various industrial goods, machinery, and general cargo with flexible scheduling." },
    { icon: <Truck size={22} />, title: "Bulk Material Haulage", description: "Efficient bulk transport solutions with side tipper trucks for maximum payload capacity and quick unloading." },
    { icon: <Clock size={22} />, title: "Time-Sensitive Deliveries", description: "Reliable and punctual transport services with GPS tracking to keep your operations running smoothly." },
  ];

  return (
    <section id="services" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[hsl(24,100%,50%)/0.03] blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Our Comprehensive Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
            Specialized transport solutions across multiple industries, ensuring your goods reach their destination safely and on time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={index} icon={service.icon} title={service.title} description={service.description} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-24 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="gradient-bg-dark p-12 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[hsl(24,100%,50%)/0.1] blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[hsl(340,80%,55%)/0.06] blur-3xl pointer-events-none" />
            <h3 className="text-3xl font-bold mb-10 text-center relative z-10">Why Choose Me First Group?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {[
                { title: "Diverse Fleet Capability", desc: "Our versatile fleet handles everything from bulk materials to temperature-sensitive goods." },
                { title: "Industry Expertise", desc: "Years of experience across multiple sectors with specialized handling requirements." },
                { title: "Nationwide Coverage", desc: "Comprehensive transport network covering urban centers and remote locations." },
              ].map((item, i) => (
                <div key={i} className="text-center glass-card-dark rounded-2xl p-8 border-white/5">
                  <h4 className="font-semibold text-lg mb-3">{item.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card p-12">
            <h4 className="text-2xl font-bold mb-8 text-center gradient-text">Our Fleet Equipment</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "Tautliner Superlink", desc: "Versatile enclosed trailers perfect for general freight, consumer goods, and weather-sensitive cargo." },
                { title: "Side Tipper", desc: "Specialized for bulk materials like mining commodities, aggregates, and construction materials." },
                { title: "Flatbed Trailers", desc: "Ideal for oversized loads, machinery, construction equipment, and irregularly shaped cargo." },
              ].map((item, i) => (
                <div key={i} className="text-center p-7 rounded-2xl bg-accent border border-border apple-card">
                  <h5 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h5>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
