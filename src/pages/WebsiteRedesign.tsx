import { Link } from "react-router-dom";
import { Check, Star, ShieldAlert, ArrowRight, Smartphone, Zap, Search, MousePointerClick, BarChart3, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

const REDESIGN_FAQ = [
  {
    q: "Will I lose my existing Google search rankings?",
    a: "No, if handled correctly. We do a comprehensive index audit of your existing site first. We map all old URLs to the new layout and set up permanent 301 redirects, preserving your accrued search authority and ranking signals perfectly."
  },
  {
    q: "How long does a website redesign take?",
    a: "The timeline matches our standard builds: 3 to 10 business days from the moment we collect your brand assets and current text content."
  },
  {
    q: "Can I keep my current domain name?",
    a: "Absolutely. You retain full domain ownership. We simply map your existing domain to our Cloudflare edge host on launch day. No transfers or domain purchase fees are needed."
  },
  {
    q: "We built our site on Wix / Squarespace. Can you migrate us?",
    a: "Yes. We specialize in migrating businesses off restrictive page builders (Wix, Squarespace, GoDaddy) onto our custom-coded React framework. You can safely cancel those monthly builder subscriptions once we go live."
  }
];

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function WebsiteRedesign() {
  return (
    <div className="pt-14 text-primary select-text overflow-hidden">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container-page py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/pricing" className="hover:text-accent">Services</Link>
          <span className="mx-2">/</span>
          <span>Website Redesign</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-16">
        <div className="absolute inset-0 -z-10 opacity-55" style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(255,107,53,0.12), transparent 70%)" }}></div>
        <div className="container-page text-center max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants}
          >
            <span className="eyebrow">
              <Zap className="h-3.5 w-3.5 animate-pulse" /> Site Modernization & Migration
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-primary lg:text-5xl font-display">
              Turn Your Outdated Site Into a Lead Machine
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              If your website was built more than 2 years ago, it is likely costing you customers. We redesign outdated sites from the ground up to be mobile-friendly, secure, under-2-seconds fast, and highly optimized for lead capture — without losing your existing Google rankings.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/free-homepage-design" className="btn-cta text-sm">
                Get My Free Redesign Mockup
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signs you need redesign */}
      <section className="section-y bg-surface overflow-hidden">
        <div className="container-page max-w-3xl">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealVariants}
            className="text-center mb-10"
          >
            <h2 className="h2 text-primary">6 signs your website is costing you business.</h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "It is not optimized for phone screens",
              "Pages take more than 3 seconds to load on mobile",
              "You cannot update simple text without high developer bills",
              "It doesn't show up on local Google Maps",
              "Visitors leave instantly without clicking anything (high bounce)",
              "It looks noticeably older than your top 3 competitors"
            ].map((text, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-destructive/10 text-destructive font-bold text-xs">×</span>
                <span className="text-sm text-primary/90 leading-normal">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we fix */}
      <section className="section-y bg-white overflow-hidden">
        <div className="container-page">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealVariants}
            className="text-center mb-12"
          >
            <span className="eyebrow">Redesign scope</span>
            <h2 className="h2 mt-4 text-primary">What we fix in our redesign workflow.</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {[
              { icon: Smartphone, title: "Mobile-First Rebuild", desc: "Completely recoded for high-density phone layouts with tap-friendly menus." },
              { icon: Zap, title: "Speed Optimization", desc: "Slashing CSS bloat and optimizing media queries to achieve under-2-second loading." },
              { icon: Search, title: "Rankings Redirection", desc: "Proper 301 URL redirects mapping to preserve accrued organic search value." },
              { icon: MousePointerClick, title: "Conversion Updates", desc: "Clearing form clutter and placing prominent click-to-book buttons." }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm text-center"
                >
                  <div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent mb-4">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-primary font-display">{item.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Redesign FAQ */}
      <section className="section-y bg-surface border-t border-border overflow-hidden">
        <div className="container-page">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealVariants}
            className="mx-auto max-w-2xl text-center mb-10"
          >
            <h2 className="h2 text-primary">Redesign Frequently Asked Questions</h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl border border-border rounded-2xl bg-card divide-y divide-border shadow-sm"
          >
            {REDESIGN_FAQ.map((faq, index) => (
              <details key={index} className="group p-6 focus:outline-none">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-primary hover:text-accent font-display text-lg">
                  <span>{faq.q}</span>
                  <span className="text-accent font-mono text-xl transition group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed select-text">
                  {faq.a}
                </p>
              </details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-primary text-white py-16 text-center overflow-hidden">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="h2 text-white font-display">See your site redesigned, free.</h2>
            <p className="mt-3 text-white/80">
              Send us your current URL. Within 48 hours of our discovery call we will show you a bespoke homepage design mockup.
            </p>
            <div className="mt-8">
              <Link to="/free-homepage-design" className="btn-cta text-base">
                Get My Free Redesign Mockup
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
