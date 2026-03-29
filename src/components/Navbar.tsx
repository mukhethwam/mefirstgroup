import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, MapPin, Truck, Users, Lock } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          const shouldBeScrolled = window.scrollY > 10;
          setIsScrolled(shouldBeScrolled);
          lastScrollY.current = window.scrollY;
          ticking.current = false;
        });
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
      className={`sticky top-0 z-50 transition-all duration-300 ease-out ${
        isScrolled
          ? "bg-primary/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(20,50,100,0.15)] py-2"
          : "bg-primary py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/5e0c66c3-0eee-4e98-8870-06dde2529bcb.png"
              alt="Me First Group"
              className={`transition-all duration-300 ease-out ${isScrolled ? "h-10" : "h-12"} w-auto`}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) =>
              link.type === "link" ? (
                <Link
                  key={link.label}
                  to={link.to!}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-200 flex items-center gap-1.5"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {link.icon && <link.icon size={15} />}
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-200"
                >
                  {link.label}
                </button>
              )
            )}
            <Link
              to="/admin"
              className="px-4 py-2 rounded-lg text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-200 flex items-center gap-1.5"
            >
              <Lock size={15} />
              Admin
            </Link>
            <button
              onClick={() => scrollToSection("contact")}
              className="ml-2 btn-gradient !px-5 !py-2.5 !text-sm inline-flex items-center gap-2 !rounded-lg"
            >
              <Phone size={15} />
              Contact Us
            </button>
          </div>

          {/* Mobile toggle */}
          <button onClick={toggleMenu} className="md:hidden p-2 text-primary-foreground">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="flex flex-col space-y-1 py-4 border-t border-primary-foreground/20 mt-2">
              {navLinks.map((link) =>
                link.type === "link" ? (
                  <Link
                    key={link.label}
                    to={link.to!}
                    className="px-4 py-3 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors flex items-center gap-2 font-medium"
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {link.icon && <link.icon size={16} />}
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="px-4 py-3 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors text-left font-medium"
                  >
                    {link.label}
                  </button>
                )
              )}
              <Link
                to="/admin"
                className="px-4 py-3 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors flex items-center gap-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Lock size={16} />
                Admin
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="btn-gradient !rounded-lg flex items-center justify-center gap-2 mt-2"
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
