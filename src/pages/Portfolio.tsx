import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Globe, ArrowRight, ExternalLink } from "lucide-react";
import { PORTFOLIO_ITEMS } from "../data";

type PortfolioFilter = "All" | "Beauty & Salons" | "Home Services" | "Retail" | "Professional Services";

export default function Portfolio() {
  const [filter, setFilter] = useState<PortfolioFilter>("All");

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (filter === "All") return true;
    if (filter === "Beauty & Salons") return item.type === "Salon" || item.type === "Nail Salon";
    if (filter === "Home Services") return item.type === "Contractor";
    if (filter === "Retail") return item.type === "Boutique";
    if (filter === "Professional Services") return item.type === "HR Consulting" || item.type === "Dentist" || item.type === "Acupuncture";
    return true;
  });

  return (
    <div className="pt-14 text-primary select-text">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container-page py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <span>Portfolio</span>
        </div>
      </div>

      {/* Header */}
      <section className="relative overflow-hidden bg-white py-10 lg:py-14">
        <div className="absolute inset-0 -z-10 opacity-50" style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(255,107,53,0.1), transparent 70%)" }}></div>
        <div className="container-page text-center max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Our Portfolio</span>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-primary lg:text-5xl font-display">
            Bespoke Small Business Web Designs
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Real client designs, real local business outcomes. No templates, no cookie-cutter presets. We build exactly what your brand and search map packs need.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container-page mt-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {(["All", "Beauty & Salons", "Home Services", "Retail", "Professional Services"] as PortfolioFilter[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                filter === type
                  ? "bg-accent text-white"
                  : "border border-border bg-card text-primary hover:border-accent"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container-page mt-12 mb-20">
        <div className="grid gap-8 md:grid-cols-2">
          {filteredItems.map((item) => (
            <div
              key={item.slug}
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md hover:border-accent transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden bg-surface">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-bold text-accent uppercase tracking-wider">
                  <span>{item.type}</span>
                  <span className="text-muted-foreground font-normal">{item.location}</span>
                </div>
                <h3 className="mt-3 text-xl font-bold text-primary font-display group-hover:text-accent transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-bold text-success font-mono flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5 fill-success" /> {item.stat}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container-page">
          <h2 className="h2 text-white font-display">Ready for a beautiful site of your own?</h2>
          <p className="mt-3 text-white/80">
            Book a free call. Within 48 hours we will design a custom homepage mockup specifically for your business, entirely free.
          </p>
          <div className="mt-8">
            <Link to="/free-homepage-design" className="btn-cta text-base">
              Get My Free Homepage Mockup
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Simple Helper chevron for readability
function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
