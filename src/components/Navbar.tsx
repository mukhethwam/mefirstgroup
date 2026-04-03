import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, MapPin, Truck, Users } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Only update if crossing threshold to prevent rattling
      if (currentY > 20 && !isScrolled) {
        setIsScrolled(true);
      } else if (currentY <= 5 && isScrolled) {
        setIsScrolled(false);
      }
      lastScrollY.current = currentY;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", to: "/", type: "link" as const },
    { label: "Services", action: () => scrollToSection("services"), type: "button" as const },
    { label: "Our Fleet", to: "/fleet", icon: Truck, type: "link" as const },
    { label: "Footprint", to: "/footprint", icon: MapPin, type: "link" as const },
    { label: "About Us", to: "/about", type: "link" as const },
    { label: "Our Team", to: "/director", icon: Users, type: "link" as const },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 will-change-transform transition-[background,shadow,padding] duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 py-2 border-b border-white/30"
          : "bg-white/60 backdrop-blur-lg py-3 border-b border-white/20"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="bg-white/60 backdrop-blur-md rounded-lg p-1.5">
              <img
                src="/lovable-uploads/5e0c66c3-0eee-4e98-8870-06dde2529bcb.png"
                alt="Me First Group"
                className={`transition-all duration-300 ${isScrolled ? "h-9" : "h-11"} w-auto`}
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.type === "link" ? (
                <Link
                  key={link.label}
                  to={link.to!}
                  className="px-4 py-2 rounded-lg text-[13px] font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 flex items-center gap-1.5"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {link.icon && <link.icon size={14} />}
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="px-4 py-2 rounded-lg text-[13px] font-medium text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  {link.label}
                </button>
              )
            )}
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-3 bg-secondary hover:bg-secondary/90 text-white font-semibold px-5 py-2 rounded-lg text-[13px] inline-flex items-center gap-2 transition-all duration-200 shadow-md shadow-secondary/20"
            >
              <Phone size={14} />
              Contact Us
            </button>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-foreground">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="flex flex-col gap-1 py-4 border-t border-black/5 mt-2">
              {navLinks.map((link) =>
                link.type === "link" ? (
                  <Link
                    key={link.label}
                    to={link.to!}
                    className="px-4 py-3 rounded-lg text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors flex items-center gap-2 font-medium"
                    onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}
                  >
                    {link.icon && <link.icon size={16} />}
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="px-4 py-3 rounded-lg text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors text-left font-medium"
                  >
                    {link.label}
                  </button>
                )
              )}
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-secondary text-white rounded-lg py-3 flex items-center justify-center gap-2 mt-2 font-semibold"
              >
                <Phone size={16} />
                Contact Us
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
