import { Link } from "react-router-dom";
import { Star, Shield, Zap, Flame, Globe, Search, Megaphone, Check, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import ReviewsList from "../components/ReviewsList";
import CostCalculator from "../components/CostCalculator";
import { WEBSITES_FAQ } from "../data";

// Reuse standard elegant transition physics inspired by ibelick/motion-primitives
const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(255,107,53,0.15), transparent 70%)" }}></div>
        <div className="container-page">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-primary md:text-5xl lg:text-6xl font-display">
              High-End Websites for Small Businesses That{" "}
              <span className="text-accent">Turn Clicks Into Clients.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              Custom-coded builds with foundational SEO included. No slow WordPress setups, no generic Wix templates. Shipped in 3 to 10 business days, starting from CA$399.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/free-homepage-design" className="btn-cta text-base">
                Get a Free Homepage Mockup
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="btn-outline text-base">
                See Plans & Pricing
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground font-mono">
              ★ No credit card required · Shipped in 48 hours · Yours to keep
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Services / Pillars */}
      <section className="section-y bg-white overflow-hidden">
        <div className="container-page">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealVariants}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <span className="eyebrow">Our Services</span>
            <h2 className="h2 mt-4 text-primary">Two categories. One-stop execution.</h2>
            <p className="mt-3 text-muted-foreground">
              Everything you need to look professional online and capture customers who are actively searching for what you do.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Website Design */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-border bg-card p-8 hover:border-accent transition-all group"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-primary font-display">Custom Websites</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Beautiful, custom-coded web design engineered for mobile devices. Shipped quickly, optimized for search engines, and built with conversion paths.
              </p>
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="font-bold text-primary">Setup from CA$399</span>
                <Link to="/web-design-services" className="text-accent font-bold hover:underline">
                  Web Services →
                </Link>
              </div>
            </motion.div>

            {/* Local SEO & Support */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-border bg-card p-8 hover:border-accent transition-all group"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-primary font-display">Local SEO & Support</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Foundational local search optimization, high-speed security hosting, scheduled daily backups, and same-day minor content edits. We handle all technical aspects while you run your business.
              </p>
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="font-bold text-primary">Plans from CA$69/mo</span>
                <Link to="/website-maintenance" className="text-accent font-bold hover:underline">
                  Maintenance Plans →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Math / Interactive Calculator */}
      <section id="calculator" className="section-y bg-white scroll-mt-20 overflow-hidden">
        <div className="container-page">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealVariants}
            className="mx-auto max-w-3xl mb-12 text-center"
          >
            <span className="eyebrow">Price Transparency</span>
            <h2 className="h2 mt-4 text-primary">No mystery. No sales call required.</h2>
            <p className="mt-3 text-muted-foreground">
              Most digital agencies hide their pricing to sell you on a call. We put our quote builder online. Pick your pages and add-ons; the totals update instantly.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl"
          >
            <CostCalculator />
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-surface overflow-hidden">
        <div className="container-page">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealVariants}
            className="mx-auto max-w-2xl text-center mb-12"
          >
            <span className="eyebrow">FAQ</span>
            <h2 className="h2 mt-4 text-primary">Web Design & Support FAQ</h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl rounded-2xl border border-border bg-card divide-y divide-border"
          >
            {WEBSITES_FAQ.slice(0, 6).map((faq, index) => (
              <details key={index} className="group p-6 focus:outline-none">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-primary hover:text-accent font-display text-lg">
                  <span>{faq.question}</span>
                  <span className="text-accent font-mono text-xl transition group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed select-text">
                  {faq.answer}
                </p>
              </details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bottom CTA Block */}
      <section className="bg-primary text-white py-16 md:py-24 text-center overflow-hidden">
        <div className="container-page">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={revealVariants}
            className="mx-auto max-w-3xl"
          >
            <h2 className="text-3xl font-extrabold text-white md:text-4xl lg:text-5xl font-display">
              Get Your Free Custom Homepage Mockup
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
              We design a homepage mockup specifically for your business in 48 hours. No upfront payment, no obligations. Let's see what we can do.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/free-homepage-design" className="btn-cta text-base">
                Get My Free Homepage Mockup
              </Link>
              <Link to="/discovery-call" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/30 px-6 font-bold text-white hover:bg-white/10 transition-colors">
                Book a Free Discovery Call
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/60">
              Or call us directly at{" "}
              <a href="tel:+14377849500" className="font-semibold text-white underline underline-offset-4 hover:text-accent">
                (437) 784-9500
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
