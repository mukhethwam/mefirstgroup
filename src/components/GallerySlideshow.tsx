import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const GallerySlideshow = () => {
  const slides = [
    { image: "/lovable-uploads/c9754556-57c1-4716-94ea-70cca848029e.png", title: "Professional Transport Solutions", message: "Me First Group - Your trusted partner for reliable transport across all industries" },
    { image: "/lovable-uploads/0d3cd3ad-6cdf-4a0d-b257-5b5e863d5bc8.png", title: "Modern Fleet Excellence", message: "State-of-the-art Scania trucks ensuring safe and efficient delivery of your valuable cargo" },
    { image: "/lovable-uploads/51982528-f0b4-4f1e-90e9-abeaf3c62146.png", title: "Heavy Duty Capabilities", message: "Specialized in bulk transport with advanced side tipper technology for maximum efficiency" },
    { image: "/lovable-uploads/1a3683f9-a3d1-4f37-bd29-417882be7ed8.png", title: "Efficient Loading Operations", message: "Professional loading and unloading services with modern equipment and skilled operators" },
    { image: "/lovable-uploads/ae653f48-2b40-4933-8f53-0331af79788f.png", title: "Secure Cargo Handling", message: "Temperature-controlled and secure transport for groceries, produce, and sensitive materials" },
    { image: "/lovable-uploads/ca13c38d-430b-4685-879c-eefdc31eb6fc.png", title: "Industrial Transport Solutions", message: "Comprehensive transport for fertilizers, cement, and construction materials nationwide" },
    { image: "/lovable-uploads/2b8f60f4-f018-43a3-87af-503038b14d75.png", title: "Advanced Logistics Solutions", message: "Cutting-edge fleet technology ensuring optimal performance and cargo safety" },
    { image: "/lovable-uploads/44daee58-b83d-47b2-8e46-79cdb9b9ab5d.png", title: "Professional Driver Team", message: "Experienced drivers committed to safe and timely delivery of your valuable cargo" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="section-padding bg-card">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Our Operations Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
            See our professional transport operations in action across different industries and cargo types.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-96 md:h-[520px] overflow-hidden rounded-3xl shadow-2xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              >
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end">
                  <div className="p-8 md:p-12">
                    <h3 className="text-2xl md:text-4xl font-bold mb-2 text-white">{slide.title}</h3>
                    <p className="text-base md:text-lg text-white/80 max-w-xl">{slide.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-6 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 gradient-bg-secondary" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { title: "Mining & Industrial", desc: "Specialized transport for mining commodities, cement, and heavy industrial materials." },
            { title: "Agricultural Products", desc: "Safe transport of fertilizers, fresh produce, and agricultural inputs with proper handling." },
            { title: "Consumer Goods", desc: "Reliable distribution of groceries and consumer products with secure logistics solutions." },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="text-center p-8 bg-accent rounded-2xl border border-border card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <h4 className="font-bold text-lg mb-2 gradient-text">{card.title}</h4>
              <p className="text-muted-foreground text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySlideshow;
