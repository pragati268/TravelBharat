import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/states" },
  { name: "States", path: "/states" },
  { name: "Categories", path: "/categories" },
  { name: "About", path: "/about" },
];

const DesktopNavLink = ({ to, name, light }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group relative py-2 font-body text-sm font-medium transition-colors duration-200 ${
          light
            ? `text-white/90 hover:text-accent ${isActive ? "text-accent!" : ""}`
            : `text-dark hover:text-primary ${isActive ? "text-primary!" : ""}`
        }`
      }
    >
      {({ isActive }) => (
        <>
          {name}
          <span
            className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 bg-accent transition-all duration-300 ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </>
      )}
    </NavLink>
  </li>
);

const MobileNavLink = ({ to, name, index }) => (
  <motion.li
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.1 + index * 0.05 }}
  >
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded-xl px-4 py-3.5 font-body text-[15px] font-medium transition-all duration-200 ${
          isActive
            ? "bg-primary/10 text-primary"
            : "text-dark hover:bg-primary/5 hover:text-primary"
        }`
      }
    >
      {name}
    </NavLink>
  </motion.li>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const light = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        light
          ? "bg-transparent"
          : "border-b border-white/20 bg-white/70 shadow-sm backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
            <span className="text-2xl leading-none">🌿</span>
            <span
              className={`font-heading text-xl font-bold lg:text-2xl transition-colors duration-300 ${
                light ? "text-white text-shadow" : "text-primary"
              }`}
            >
              TravelBharat
            </span>
          </NavLink>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <DesktopNavLink
                key={link.name}
                to={link.path}
                name={link.name}
                light={light}
              />
            ))}
          </ul>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className={`rounded-full p-2.5 transition-colors duration-300 ${
                light
                  ? "text-white/90 hover:bg-white/15 hover:text-accent"
                  : "text-dark hover:bg-primary/10 hover:text-primary"
              }`}
              aria-label="Search"
            >
              <Search size={20} strokeWidth={2} />
            </button>

            <NavLink
              to="/login"
              className="hidden rounded-full border-2 border-transparent bg-primary px-6 py-2.5 font-body text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:border-accent hover:shadow-lg sm:inline-flex sm:items-center"
            >
              Login
            </NavLink>

            <button
              className={`rounded-lg p-2.5 transition-colors duration-300 lg:hidden ${
                light
                  ? "text-white/90 hover:bg-white/15"
                  : "text-dark hover:bg-primary/10"
              }`}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 z-50 flex h-full w-[75%] max-w-sm flex-col border-l border-white/20 bg-white/80 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <div className="flex h-full flex-col overflow-y-auto p-6">
                {/* Drawer Header */}
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-heading text-lg font-bold text-primary">
                    Menu
                  </span>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg p-2 text-dark transition-colors duration-200 hover:bg-primary/10"
                    aria-label="Close menu"
                  >
                    <X size={22} strokeWidth={2} />
                  </button>
                </div>

                {/* Nav Links */}
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <MobileNavLink
                      key={link.name}
                      to={link.path}
                      name={link.name}
                      index={i}
                    />
                  ))}
                </ul>

                {/* Login */}
                <div className="mt-auto pt-8">
                  <NavLink
                    to="/login"
                    className="flex w-full items-center justify-center rounded-full bg-primary py-3.5 font-body text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  >
                    Login
                  </NavLink>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
