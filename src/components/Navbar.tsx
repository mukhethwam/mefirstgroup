import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, MapPin, Truck, Users } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
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
            <img
              src="/lovable-uploads/5e0c66c3-0eee-4e98-8870-06dde2529bcb.png"
              alt="Me First Group"
              className={`transition-all duration-300 ${isScrolled ? "h-9" : "h-11"} w-auto`}
            />
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

          {/* Mobile popover menu */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="md:hidden p-2 text-foreground rounded-lg hover:bg-primary/5 transition-colors">
                <Menu size={22} />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={8}
              className="w-52 p-2 rounded-xl border border-border/50 bg-white/95 backdrop-blur-xl shadow-xl shadow-black/10"
            >
              <div className="flex flex-col gap-0.5">
                {navLinks.map((link) =>
                  link.type === "link" ? (
                    <Link
                      key={link.label}
                      to={link.to!}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-primary/8 hover:text-primary transition-colors"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {link.icon && <link.icon size={15} className="text-secondary" />}
                      {!link.icon && <span className="w-[15px]" />}
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      key={link.label}
                      onClick={link.action}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-primary/8 hover:text-primary transition-colors text-left"
                    >
                      <span className="w-[15px]" />
                      {link.label}
                    </button>
                  )
                )}
                <div className="my-1 border-t border-border/30" />
                <button
                  onClick={() => scrollToSection("contact")}
                  className="flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white font-semibold px-3 py-2.5 rounded-lg text-sm transition-colors"
                >
                  <Phone size={15} />
                  Contact Us
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
