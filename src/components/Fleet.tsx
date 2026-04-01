import React from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Fleet = () => {
  const fleetFeatures = [
    "34-ton side tipper capacity",
    "Modern, well-maintained vehicles",
    "GPS tracking and fleet management",
    "Experienced drivers",
    "Regular maintenance schedule",
    "Safety compliance certified",
  ];

  const fleetImages = [
    { src: "/lovable-uploads/8a8be9f2-4251-4d4f-b750-185a58c1a8c4.png", alt: "Scania truck with yellow side tipper trailers" },
    { src: "/lovable-uploads/6b48b9ca-bd91-402a-bf6c-26413a7b352b.png", alt: "Scania R460 truck front view" },
    { src: "/lovable-uploads/1bfdabae-d742-41b9-800e-e4283a78d3d3.png", alt: "Scania truck with yellow side tipper trailers - side view" },
    { src: "/lovable-uploads/8e13c4aa-2284-46e7-b2b2-c082e90e76d3.png", alt: "Scania truck front angle view" },
    { src: "/lovable-uploads/bd74459c-115b-47bf-a4a7-971bb0062c85.png", alt: "Scania truck with license plate DM60RV GP" },
    { src: "/lovable-uploads/34e441d6-ef82-4a45-ae53-8f78580a000a.png", alt: "Scania truck on the highway with side tipper" },
    { src: "/lovable-uploads/7400796f-9949-4aa9-9bd2-26704ff3877f.png", alt: "Scania truck with red side tipper trailer" },
    { src: "/lovable-uploads/2b8f60f4-f018-43a3-87af-503038b14d75.png", alt: "Scania truck in sandy area" },
  ];

  return (
    <section id="fleet" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Our Premium Fleet</h2>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground mt-6">
            Specialized 34-ton side tipper trucks designed for the challenges of mining commodity transport.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-foreground">Fleet Specifications</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our vehicles are regularly maintained to ensure maximum reliability and efficiency for all your transport needs.
            </p>

            <div className="space-y-3 mb-10">
              {fleetFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <CheckCircle className="text-secondary flex-shrink-0" size={18} />
                  <span className="text-foreground font-medium text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>

            <a href="#contact" className="btn-gradient-primary inline-block">
              Schedule Our Fleet
            </a>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src={fleetImages[0].src} alt={fleetImages[0].alt} className="object-cover w-full h-80 md:h-[420px]" />
            </div>
            <div className="absolute -bottom-5 -right-5 bg-secondary text-white p-5 rounded-2xl shadow-xl hidden md:block">
              <p className="text-3xl font-bold">34-TON</p>
              <p className="text-sm text-white/80">Side Tipper Capacity</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-bold mb-10 text-center text-foreground">Explore Our Fleet</h3>
          <div className="px-4 md:px-12">
            <Carousel className="w-full">
              <CarouselContent>
                {fleetImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      className="p-2"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="rounded-2xl overflow-hidden shadow-md bg-card border border-border hover:shadow-xl transition-shadow duration-300">
                        <img src={image.src} alt={image.alt} className="object-cover w-full h-56" />
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 md:-left-4" />
              <CarouselNext className="absolute right-0 md:-right-4" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fleet;
