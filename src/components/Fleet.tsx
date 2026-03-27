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
          <p className="text-lg max-w-3xl mx-auto text-muted-foreground mt-4">
            Me First Group operates a fleet of specialized 34-ton side tipper trucks designed specifically for the challenges of mining commodity transport.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6 gradient-text">Fleet Specifications</h3>
            <p className="text-lg mb-8 text-muted-foreground">
              Our vehicles are regularly maintained to ensure maximum reliability and efficiency for all your transport needs.
            </p>

            <div className="space-y-4 mb-8">
              {fleetFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-6 h-6 rounded-full gradient-bg-secondary flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-white" size={14} />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
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
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src={fleetImages[0].src} alt={fleetImages[0].alt} className="object-cover w-full h-80 md:h-96" />
            </div>
            <div className="absolute -bottom-4 -right-4 gradient-bg-secondary text-white p-5 rounded-2xl shadow-xl hidden md:block">
              <p className="text-3xl font-bold">34-TON</p>
              <p className="text-sm opacity-90">Side Tipper Capacity</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-bold mb-10 text-center gradient-text">Explore Our Fleet</h3>
          <div className="px-4 md:px-12">
            <Carousel className="w-full">
              <CarouselContent>
                {fleetImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <div className="rounded-2xl overflow-hidden shadow-lg bg-card border border-border card-hover">
                        <img src={image.src} alt={image.alt} className="object-cover w-full h-56" />
                      </div>
                    </div>
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
