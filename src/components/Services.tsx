import React from "react";
import { Truck, Package, Mountain, Clock, Building2, ShoppingCart, Wheat, Apple } from "lucide-react";
import { motion } from "framer-motion";

const ServiceCard = ({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08, duration: 0.5 }}
    whileHover={{ y: -8 }}
    className="group bg-card rounded-2xl p-7 shadow-sm border border-border hover:shadow-xl hover:border-secondary/20 transition-all duration-400 relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-[3px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const Services = () => {
  const services = [
    { icon: <Mountain size={22} />, title: "Mining Commodity Transport", description: "Specialized transport of manganese, chrome, coal, and other mining materials with our advanced fleet of side tipper trucks." },
    { icon: <Building2 size={22} />, title: "Cement & Construction", description: "Reliable transport solutions for cement, aggregates, and construction materials to support building projects across the region." },
    { icon: <ShoppingCart size={22} />, title: "Grocery & Consumer Goods", description: "Efficient distribution of groceries and consumer products with temperature-controlled and secure transport options." },
    { icon: <Wheat size={22} />, title: "Agricultural Fertilizers", description: "Safe and compliant transport of fertilizers and agricultural inputs to support farming operations nationwide." },
    { icon: <Apple size={22} />, title: "Fresh Produce Transport", description: "Temperature-controlled transport for fruits, vegetables, and perishable goods maintaining freshness from farm to market." },
    { icon: <Package size={22} />, title: "General Freight & Cargo", description: "Comprehensive transport solutions for various industrial goods, machinery, and general cargo with flexible scheduling." },
    { icon: <Truck size={22} />, title: "Bulk Material Haulage", description: "Efficient bulk transport with side tipper trucks for maximum payload capacity and quick unloading." },
    { icon: <Clock size={22} />, title: "Time-Sensitive Deliveries", description: "Reliable and punctual transport services with GPS tracking to keep your operations running smoothly." },
  ];

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Our Comprehensive Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            Specialized transport solutions across multiple industries, ensuring your goods reach their destination safely and on time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={index} icon={service.icon} title={service.title} description={service.description} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="gradient-bg-dark p-10 md:p-12 text-white flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-8">Why Choose Me First Group?</h3>
            <div className="space-y-6">
              {[
                { title: "Diverse Fleet Capability", desc: "Our versatile fleet handles everything from bulk materials to temperature-sensitive goods." },
                { title: "Industry Expertise", desc: "Years of experience across multiple sectors with specialized handling requirements." },
                { title: "Nationwide Coverage", desc: "Comprehensive transport network covering urban centers and remote locations." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="w-1 rounded-full bg-secondary flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-base mb-1">{item.title}</h4>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-card p-10 md:p-12 flex flex-col justify-center">
            <h4 className="text-2xl font-bold mb-8 text-foreground">Our Fleet Equipment</h4>
            <div className="space-y-4">
              {[
                { title: "Tautliner Superlink", desc: "Versatile enclosed trailers for general freight and weather-sensitive cargo." },
                { title: "Side Tipper", desc: "Specialized for bulk materials like mining commodities and aggregates." },
                { title: "Flatbed Trailers", desc: "Ideal for oversized loads, machinery, and irregularly shaped cargo." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="p-5 rounded-xl bg-accent border border-border hover:border-secondary/20 transition-colors"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h5 className="font-bold text-sm mb-1 text-foreground">{item.title}</h5>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
