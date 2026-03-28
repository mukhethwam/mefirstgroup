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
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-card rounded-2xl p-6 shadow-sm border border-border card-hover relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 gradient-bg-secondary rounded-t-2xl" />
      <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-5 text-primary-foreground group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    { icon: <Mountain size={24} />, title: "Mining Commodity Transport", description: "Specialized transport of manganese, chrome, coal, and other mining materials with our advanced fleet of side tipper trucks." },
    { icon: <Building2 size={24} />, title: "Cement & Construction Materials", description: "Reliable transport solutions for cement, aggregates, and construction materials to support building projects across the region." },
    { icon: <ShoppingCart size={24} />, title: "Grocery & Consumer Goods", description: "Efficient distribution of groceries and consumer products with temperature-controlled and secure transport options." },
    { icon: <Wheat size={24} />, title: "Agricultural Fertilizers", description: "Safe and compliant transport of fertilizers and agricultural inputs to support farming operations nationwide." },
    { icon: <Apple size={24} />, title: "Fresh Produce Transport", description: "Temperature-controlled transport for fruits, vegetables, and perishable goods maintaining freshness from farm to market." },
    { icon: <Package size={24} />, title: "General Freight & Cargo", description: "Comprehensive transport solutions for various industrial goods, machinery, and general cargo with flexible scheduling." },
    { icon: <Truck size={24} />, title: "Bulk Material Haulage", description: "Efficient bulk transport solutions with side tipper trucks for maximum payload capacity and quick unloading." },
    { icon: <Clock size={24} />, title: "Time-Sensitive Deliveries", description: "Reliable and punctual transport services with GPS tracking to keep your operations running smoothly." },
  ];

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Our Comprehensive Services</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            Me First Group provides specialized transport solutions across multiple industries, ensuring your goods reach their destination safely, efficiently, and on time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} icon={service.icon} title={service.title} description={service.description} index={index} />
          ))}
        </div>

        {/* Why Choose Us */}
        <motion.div
          className="mt-20 rounded-3xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="gradient-bg-dark p-10 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[hsl(330,80%,55%)/0.1] blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[hsl(200,90%,50%)/0.1] blur-3xl pointer-events-none" />
            <h3 className="text-3xl font-bold mb-8 text-center relative z-10">Why Choose Me First Group?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {[
                { title: "Diverse Fleet Capability", desc: "Our versatile fleet handles everything from bulk materials to temperature-sensitive goods." },
                { title: "Industry Expertise", desc: "Years of experience across multiple sectors with specialized handling requirements." },
                { title: "Nationwide Coverage", desc: "Comprehensive transport network covering urban centers and remote locations." },
              ].map((item, i) => (
                <div key={i} className="text-center glass-card-dark rounded-2xl p-6 border-[hsl(270,60%,50%)/0.2]">
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card p-10">
            <h4 className="text-2xl font-bold mb-6 text-center gradient-text">Our Fleet Equipment</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Tautliner Superlink", desc: "Versatile enclosed trailers perfect for general freight, consumer goods, and weather-sensitive cargo." },
                { title: "Side Tipper", desc: "Specialized for bulk materials like mining commodities, aggregates, and construction materials." },
                { title: "Flatbed Trailers", desc: "Ideal for oversized loads, machinery, construction equipment, and irregularly shaped cargo." },
              ].map((item, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-accent border border-border">
                  <h5 className="font-bold text-lg mb-2 text-foreground">{item.title}</h5>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
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
