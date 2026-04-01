import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Globe, Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "Error", description: "Please enter a valid email address", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    await supabase.from("contact_enquiries").insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    const mailtoLink = `mailto:mefirstgp@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;

    toast({ title: "Message sent", description: "Thank you for your message. We'll get back to you soon!" });
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: MapPin, title: "Location", value: "6 Marlu Road, Selcourt, Springs, 1559, South Africa" },
    { icon: Phone, title: "Phone", value: "078 171 7615 / 072 018 8078" },
    { icon: Mail, title: "Email", value: "mefirstgp@gmail.com\nmukhethwa@mefirstgroup.co.za" },
    { icon: Clock, title: "Operating Hours", value: "Mon - Fri: 7:00 AM - 6:00 PM\nSat: 8:00 AM - 2:00 PM" },
    { icon: Globe, title: "Website", value: "www.mefirstgroup.co.za", isLink: true },
  ];

  const inputClasses = "w-full px-4 py-3 border border-border rounded-xl bg-background text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all";

  return (
    <section id="contact" className="section-padding bg-card">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Contact Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            Reach out for inquiries about our transport services or to request a quote.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-foreground">Get In Touch</h3>
            <div className="space-y-5">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-accent transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-0.5">{item.title}</h4>
                    {item.isLink ? (
                      <a href="https://www.mefirstgroup.co.za" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary transition-colors text-sm">
                        {item.value}
                      </a>
                    ) : (
                      item.value.split("\n").map((line, j) => (
                        <p key={j} className="text-muted-foreground text-sm">{line}</p>
                      ))
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-foreground">Send Us a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                  <input type="text" id="name" value={formData.name} onChange={handleChange} className={inputClasses} placeholder="Your name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                  <input type="email" id="email" value={formData.email} onChange={handleChange} className={inputClasses} placeholder="Your email" required />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                <input type="text" id="subject" value={formData.subject} onChange={handleChange} className={inputClasses} placeholder="Subject" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea id="message" rows={5} value={formData.message} onChange={handleChange} className={`${inputClasses} resize-none`} placeholder="Your message" required />
              </div>
              <button type="submit" className="btn-gradient w-full md:w-auto inline-flex items-center justify-center gap-2" disabled={isSubmitting}>
                <Send size={16} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
