import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { motion } from "motion/react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const isServicesActive = () => 
    ["/web-design-services", "/website-redesign", "/website-maintenance"].includes(location.pathname);

  const isIndustriesActive = () => 
    location.pathname.startsWith("/websites-for-");

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-border bg-card/90 backdrop-blur transition-all shadow-sm">
      <div className="container-page flex h-full items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-1 font-display font-extrabold tracking-tight text-primary">
          <svg className="h-6 w-6 shrink-0" fill="none" stroke="#FF6B35" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M17 11 L12 6 L7 11" />
            <path d="M17 17 L12 12 L7 17" />
          </svg>
          <span className="text-primary text-lg">
            Buildora
            <span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Primary" className="hidden items-center gap-2 lg:flex">
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setServicesOpen(!servicesOpen);
                setWorkOpen(false);
                setIndustriesOpen(false);
              }}
              onMouseEnter={() => setServicesOpen(true)}
              className={`relative px-3.5 py-1.5 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent focus:outline-none ${isServicesActive() ? "text-accent font-semibold" : "text-primary/80"}`}
            >
              {isServicesActive() && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 -z-10 rounded-lg bg-accent/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              Services
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div
                onMouseLeave={() => setServicesOpen(false)}
                className="absolute left-0 mt-2 w-56 rounded-xl border border-border bg-card p-2 shadow-lg z-50"
              >
                <Link
                  to="/web-design-services"
                  onClick={() => setServicesOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-sm text-primary/90 hover:bg-surface hover:text-accent"
                >
                  Web Design Services
                </Link>
                <Link
                  to="/website-redesign"
                  onClick={() => setServicesOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-sm text-primary/90 hover:bg-surface hover:text-accent"
                >
                  Website Redesign
                </Link>
                <Link
                  to="/website-maintenance"
                  onClick={() => setServicesOpen(false)}
                  className="block rounded-lg px-4 py-2.5 text-sm text-primary/90 hover:bg-surface hover:text-accent"
                >
                  Website Maintenance
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/pricing"
            className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors hover:text-accent ${isActive("/pricing") ? "text-accent font-semibold" : "text-primary/80"}`}
          >
            {isActive("/pricing") && (
              <motion.span
                layoutId="activeNavIndicator"
                className="absolute inset-0 -z-10 rounded-lg bg-accent/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            Pricing
          </Link>

          <Link
            to="/websites-for-contractors"
            className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors hover:text-accent ${isIndustriesActive() ? "text-accent font-semibold" : "text-primary/80"}`}
          >
            {isIndustriesActive() && (
              <motion.span
                layoutId="activeNavIndicator"
                className="absolute inset-0 -z-10 rounded-lg bg-accent/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            Industries
          </Link>

          <Link
            to="/about"
            className={`relative px-3.5 py-1.5 text-sm font-medium transition-colors hover:text-accent ${isActive("/about") ? "text-accent font-semibold" : "text-primary/80"}`}
          >
            {isActive("/about") && (
              <motion.span
                layoutId="activeNavIndicator"
                className="absolute inset-0 -z-10 rounded-lg bg-accent/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            About
          </Link>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          {/* Phone */}
          <a href="tel:+14377849500" className="hidden items-center gap-2 text-sm font-bold text-primary hover:text-accent lg:flex">
            <Phone className="h-4 w-4 text-accent" />
            (437) 784-9500
          </a>
          <a href="tel:+14377849500" className="grid h-10 w-10 place-items-center rounded-xl border border-border lg:hidden text-primary hover:border-accent hover:text-accent">
            <Phone className="h-4 w-4" />
          </a>

          {/* CTA */}
          <Link
            to="/free-homepage-design"
            className="hidden h-9 items-center rounded-lg bg-accent px-4 text-xs font-bold text-white shadow-md hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all lg:inline-flex"
          >
            Free Homepage Mockup
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobile}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border lg:hidden text-primary hover:border-accent hover:text-accent focus:outline-none"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-14 bg-card border-b border-border shadow-lg p-5 z-40 lg:hidden max-h-[85vh] overflow-y-auto">
          <div className="grid gap-4">
            <div className="font-semibold text-xs uppercase tracking-wider text-muted-foreground border-b pb-1">
              Services
            </div>
            <div className="grid grid-cols-2 gap-2 pl-2">
              <Link onClick={toggleMobile} to="/web-design-services" className="text-sm font-medium text-primary/80 hover:text-accent">
                Web Design
              </Link>
              <Link onClick={toggleMobile} to="/website-redesign" className="text-sm font-medium text-primary/80 hover:text-accent">
                Redesign
              </Link>
              <Link onClick={toggleMobile} to="/website-maintenance" className="text-sm font-medium text-primary/80 hover:text-accent">
                Maintenance
              </Link>
            </div>

            <Link 
              onClick={toggleMobile} 
              to="/websites-for-contractors" 
              className="text-sm font-semibold hover:text-accent border-b pb-1 mt-2 text-primary"
            >
              Industries →
            </Link>

            <div className="font-semibold text-xs uppercase tracking-wider text-muted-foreground border-b pb-1 mt-2">
              Pages
            </div>
            <div className="grid grid-cols-2 gap-3 pl-2">
              <Link onClick={toggleMobile} to="/pricing" className="text-sm font-medium text-primary/80 hover:text-accent">
                Pricing
              </Link>
              <Link onClick={toggleMobile} to="/about" className="text-sm font-medium text-primary/80 hover:text-accent">
                About Our Story
              </Link>
            </div>

            <div className="font-semibold text-xs uppercase tracking-wider text-muted-foreground border-b pb-1 mt-2">
              Bespoke Request
            </div>
            <Link
              onClick={toggleMobile}
              to="/free-homepage-design"
              className="flex h-11 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white shadow-md w-full"
            >
              Get Free Homepage Design →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
