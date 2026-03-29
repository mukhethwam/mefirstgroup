import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Globe, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      <div className="gradient-bg-dark text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[hsl(25,90%,50%)/0.06] via-[hsl(215,70%,40%)/0.04] to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[hsl(200,80%,45%)/0.06] via-[hsl(215,60%,35%)/0.04] to-transparent blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">Me First Group</h3>
              <p className="text-white/60 mb-6 text-sm leading-relaxed">
                Specialized transport solutions for mining commodities, delivering reliability and efficiency with our 34-ton side tipper fleet.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-xl bg-[hsl(215,60%,40%)/0.15] border border-[hsl(215,60%,40%)/0.2] flex items-center justify-center hover:bg-[hsl(25,90%,50%)/0.2] hover:border-[hsl(25,90%,50%)/0.4] transition-all duration-300">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", to: "/" },
                  { label: "Services", to: "/#services" },
                  { label: "Our Fleet", to: "/fleet" },
                  { label: "About Us", to: "/about" },
                  { label: "Contact", to: "/contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-white/60 hover:text-secondary flex items-center gap-1 text-sm transition-colors duration-200">
                      {link.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-5">Our Services</h4>
              <ul className="space-y-3">
                {["Mining Commodity Transport", "Bulk Material Haulage", "Custom Logistics Solutions", "Time-Sensitive Deliveries"].map((s) => (
                  <li key={s}>
                    <Link to="/services" className="text-white/60 hover:text-secondary text-sm transition-colors duration-200">
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-5">Contact Info</h4>
              <address className="not-italic space-y-3 text-sm text-white/60">
                <p>6 Marlu Road, Selcourt</p>
                <p>Springs, 1559, South Africa</p>
                <p>Phone: 078 171 7615 / 072 018 8078</p>
                <p>Email: mefirstgp@gmail.com</p>
                <p>Email: mukhethwa@mefirstgroup.co.za</p>
                <div className="flex items-center gap-2">
                  <Globe size={14} />
                  <a href="https://www.mefirstgroup.co.za" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                    www.mefirstgroup.co.za
                  </a>
                </div>
              </address>
            </div>
          </div>

          <div className="border-t border-[hsl(215,50%,30%)/0.3] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} Me First Group. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="text-white/40 hover:text-secondary text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-white/40 hover:text-secondary text-sm transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
