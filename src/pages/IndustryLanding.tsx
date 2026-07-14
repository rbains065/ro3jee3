import { useParams, Link } from "react-router-dom";
import { Star, ShieldCheck, Zap, Globe, MessageSquare, ArrowRight, Check } from "lucide-react";
import CostCalculator from "../components/CostCalculator";
import ReviewsList from "../components/ReviewsList";

interface IndustryContent {
  title: string;
  category: string;
  benefits: string[];
  desc: string;
  stat: string;
}

const INDUSTRIES_MAPPING: Record<string, IndustryContent> = {
  salons: {
    title: "Websites for Salons & Barbershops That Win Repeat Bookings",
    category: "Beauty & Wellness",
    desc: "A salon website is your 24/7 digital front desk. We build bespoke hair salon and barbershop sites integrated directly with booking systems like Fresha, Vagaro, or Acuity. We highlight your team's visual cuts and reviews same-day.",
    benefits: [
      "Seamless online booking integration (Fresha, Vagaro, Boulevard)",
      "High-contrast staff bios and portfolio cut galleries",
      "Automatic local business schema for Maps visibility",
      "Mobile-first responsive presentation for booking on-the-go"
    ],
    stat: "Salons see significant growth in local bookings post-launch"
  },
  barbershops: {
    title: "Websites for Salons & Barbershops That Win Repeat Bookings",
    category: "Beauty & Wellness",
    desc: "A salon website is your 24/7 digital front desk. We build bespoke hair salon and barbershop sites integrated directly with booking systems like Fresha, Vagaro, or Acuity. We highlight your team's visual cuts and reviews same-day.",
    benefits: [
      "Seamless online booking integration (Fresha, Vagaro, Boulevard)",
      "High-contrast staff bios and portfolio cut galleries",
      "Automatic local business schema for Maps visibility",
      "Mobile-first responsive presentation for booking on-the-go"
    ],
    stat: "Salons see significant growth in local bookings post-launch"
  },
  "nail-salons": {
    title: "Bespoke Web Design for Nail Studios & Luxury Salons",
    category: "Beauty & Wellness",
    desc: "Our premium nail studio websites deliver massive speed and booking layout improvements, moving away from sluggish, bloated page builders. We build clean, high-end visual galleries that showcase your nail art and handle self-serve appointments seamlessly.",
    benefits: [
      "Custom high-resolution nail art galleries",
      "Integrated pricing matrices and booking paths",
      "Lower monthly subscriptions than Squarespace or Wix",
      "Same-day content updates (hours, prices, colors)"
    ],
    stat: "Significantly lower software overhead"
  },
  spas: {
    title: "Bespoke Web Design for Nail Studios & Luxury Salons",
    category: "Beauty & Wellness",
    desc: "Our premium salon and spa websites deliver massive speed and booking layout improvements, moving away from sluggish, bloated page builders. We build clean, high-end visual galleries that showcase your nail art and handle self-serve appointments seamlessly.",
    benefits: [
      "Custom high-resolution nail art galleries",
      "Integrated pricing matrices and booking paths",
      "Lower monthly subscriptions than Squarespace or Wix",
      "Same-day content updates (hours, prices, colors)"
    ],
    stat: "Significantly lower software overhead"
  },
  restaurants: {
    title: "Restaurant Web Design with Live Menus & Reservation Links",
    category: "Food & Hospitality",
    desc: "A 2026 study of 5,242 restaurants in the GTA revealed 69.6% operate with no website. We build custom restaurant sites displaying mobile-friendly menus, direct allergen callouts, and clean booking links (Resy, Tock, OpenTable).",
    benefits: [
      "Search-optimized, text-based interactive menus (no slow PDFs)",
      "Direct integration with reservation platforms (Resy, Tock, OpenTable)",
      "Structured schema markup for local food search rich snippets",
      "Mobile-first checkout and menu loading under 1.5 seconds"
    ],
    stat: "Over 70% of food searches happen on mobile devices"
  },
  cafes: {
    title: "Restaurant Web Design with Live Menus & Reservation Links",
    category: "Food & Hospitality",
    desc: "A 2026 study of 5,242 restaurants in the GTA revealed 69.6% operate with no website. We build custom restaurant sites displaying mobile-friendly menus, direct allergen callouts, and clean booking links (Resy, Tock, OpenTable).",
    benefits: [
      "Search-optimized, text-based interactive menus (no slow PDFs)",
      "Direct integration with reservation platforms (Resy, Tock, OpenTable)",
      "Structured schema markup for local food search rich snippets",
      "Mobile-first checkout and menu loading under 1.5 seconds"
    ],
    stat: "Over 70% of food searches happen on mobile devices"
  },
  contractors: {
    title: "Websites for Contractors & Trades That Generate Qualified Leads",
    category: "Home Services & Trades",
    desc: "Homeowners judge your service business in under 5 seconds. We build contracting and home renovation sites designed to build immediate credibility with trust badges, active reviews, licensed details, and quote request forms.",
    benefits: [
      "Bespoke quote calculator and intake questionnaire setups",
      "Before-and-after interactive project showcases",
      "Visible license and insurance accreditation badges",
      "Local Map Pack SEO for city + trade search visibility"
    ],
    stat: "Trades see up to 3x increase in quote requests"
  },
  plumbers: {
    title: "Websites for Contractors & Trades That Generate Qualified Leads",
    category: "Home Services & Trades",
    desc: "Homeowners judge your service business in under 5 seconds. We build contracting and home renovation sites designed to build immediate credibility with trust badges, active reviews, licensed details, and quote request forms.",
    benefits: [
      "Bespoke quote calculator and intake questionnaire setups",
      "Before-and-after interactive project showcases",
      "Visible license and insurance accreditation badges",
      "Local Map Pack SEO for city + trade search visibility"
    ],
    stat: "Trades see up to 3x increase in quote requests"
  },
  electricians: {
    title: "Websites for Contractors & Trades That Generate Qualified Leads",
    category: "Home Services & Trades",
    desc: "Homeowners judge your service business in under 5 seconds. We build contracting and home renovation sites designed to build immediate credibility with trust badges, active reviews, licensed details, and quote request forms.",
    benefits: [
      "Bespoke quote calculator and intake questionnaire setups",
      "Before-and-after interactive project showcases",
      "Visible license and insurance accreditation badges",
      "Local Map Pack SEO for city + trade search visibility"
    ],
    stat: "Trades see up to 3x increase in quote requests"
  },
  dentists: {
    title: "Bespoke Dental Practice Websites Focused on New Patients",
    category: "Medical & Clinical",
    desc: "We build professional, HIPAA/PHIPA compliant dental websites with secure patient booking, interactive clinical services checklists, and structured schema so you appear in local searches.",
    benefits: [
      "New patient appointment pathways",
      "Compliant Patient Privacy / PHIPA disclosure",
      "Individual treatment pages for dental crowns, Invisalign, implants",
      "Automatic review widgets displaying verified patient feedback"
    ],
    stat: "Clinic local visibility ranks top 3 in local Map Pack"
  },
  lawyers: {
    title: "Websites for Law Firms, Attorneys & B2B Consultants",
    category: "Professional Services",
    desc: "Legal clients require credentials and trust instantly. We build sophisticated law firm websites highlighting case successes, attorney credentials, consult schedulers, and secure intake processes.",
    benefits: [
      "Secure client intake form setups",
      "Bespoke case outcome list layouts and credentials",
      "Consultation scheduling calendar integration",
      "Proper local search credentials and schema markup"
    ],
    stat: "Law offices have the highest organic client value"
  },
  accountants: {
    title: "Websites for Law Firms, Attorneys & B2B Consultants",
    category: "Professional Services",
    desc: "Legal clients require credentials and trust instantly. We build sophisticated law firm websites highlighting case successes, attorney credentials, consult schedulers, and secure intake processes.",
    benefits: [
      "Secure client intake form setups",
      "Bespoke case outcome list layouts and credentials",
      "Consultation scheduling calendar integration",
      "Proper local search credentials and schema markup"
    ],
    stat: "Law offices have the highest organic client value"
  }
};

export default function IndustryLanding() {
  const { industry } = useParams();
  const slug = industry || "";

  // Find dynamic layout content or use a default one
  const content = INDUSTRIES_MAPPING[slug] || {
    title: `Custom Websites for ${slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ")}`,
    category: "Custom Build",
    desc: "We build high-performance, mobile-responsive custom websites specifically tailored to represent your business vertical and turn organic visitors into paying local leads.",
    benefits: [
      "Bespoke design aligned with your branding guidelines",
      "Fast page load times (under 2 seconds)",
      "Foundational SEO setup and GBP linking included",
      "Ongoing secure maintenance and same-day support"
    ],
    stat: "compounding results across search and maps"
  };

  return (
    <div className="pt-14 text-primary select-text">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container-page py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <span>Industries</span>
          <span className="mx-2">/</span>
          <span>{slug.replace("-", " ")}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-16">
        <div className="absolute inset-0 -z-10 opacity-55" style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(255,107,53,0.12), transparent 70%)" }}></div>
        <div className="container-page text-center max-w-3xl">
          <span className="eyebrow">
            <Globe className="h-3.5 w-3.5" /> {content.category}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-primary md:text-4xl lg:text-5xl font-display">
            {content.title}
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            {content.desc}
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/free-homepage-design" className="btn-cta text-sm">
              Get a Free Homepage Design mockup
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-y bg-surface">
        <div className="container-page max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="h2 text-primary">Core must-haves we deploy.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.benefits.map((text, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-sm">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-semibold text-primary/90 leading-normal">{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl bg-accent/15 border border-accent/30 p-4 text-center text-sm font-bold text-accent">
            ★ {content.stat}
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="section-y bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="h2 text-primary">Calculate your setup and monthly cost</h2>
            <p className="mt-3 text-muted-foreground">Select extra pages, branding assets, and optional support packages below.</p>
          </div>
          <div className="mx-auto max-w-3xl">
            <CostCalculator />
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container-page">
          <h2 className="h2 text-white font-display">Ready to stand out?</h2>
          <p className="mt-3 text-white/80">We design a custom homepage mockup for your business in 48 hours. Free of cost.</p>
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
