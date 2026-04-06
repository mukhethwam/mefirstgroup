import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Globe, Lock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-sky-600/90 via-sky-500/85 to-sky-400/80 backdrop-blur-xl text-white">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <img src="/images/me-first-logo-horizontal.png" alt="Me First Group" className="h-10 mb-4 brightness-0 invert" />
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Specialized transport solutions for mining commodities, delivering reliability and efficiency with our 34-ton side tipper fleet.
            </p>
            <div className="flex gap-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center hover:bg-white/30 hover:border-white/40 transition-all duration-200 text-white/80 hover:text-white">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-5 uppercase tracking-wider text-white/90">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "Services", to: "/#services" },
                { label: "Our Fleet", to: "/fleet" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-white/65 hover:text-white text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-5 uppercase tracking-wider text-white/90">Our Services</h4>
            <ul className="space-y-2.5">
              {["Mining Commodity Transport", "Bulk Material Haulage", "Custom Logistics Solutions", "Time-Sensitive Deliveries"].map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-white/65 hover:text-white text-sm transition-colors duration-200">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-5 uppercase tracking-wider text-white/90">Contact Info</h4>
            <address className="not-italic space-y-2.5 text-sm text-white/65">
              <p>6 Marlu Road, Selcourt</p>
              <p>Springs, 1559, South Africa</p>
              <p>Phone: 078 171 7615 / 072 018 8078</p>
              <p>Email: mefirstgp@gmail.com</p>
              <p>Email: mukhethwa@mefirstgroup.co.za</p>
              <div className="flex items-center gap-2">
                <Globe size={13} />
                <a href="https://www.mefirstgroup.co.za" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  www.mefirstgroup.co.za
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">&copy; {new Date().getFullYear()} Me First Group. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-white/50 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/50 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link to="/admin" className="text-white/50 hover:text-white text-sm transition-colors inline-flex items-center gap-1">
              <Lock size={11} />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
