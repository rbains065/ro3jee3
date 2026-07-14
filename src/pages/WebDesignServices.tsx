import { Link } from "react-router-dom";
import { Check, Star, Shield, Zap, Globe, MousePointerClick, Server, Palette, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { WEBSITES_FAQ } from "../data";

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function WebDesignServices() {
  return (
    <div className="pt-14 text-primary select-text overflow-hidden">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container-page py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/pricing" className="hover:text-accent">Services</Link>
          <span className="mx-2">/</span>
          <span>Web Design Services</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-16">
        <div className="absolute inset-0 -z-10 opacity-55" style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(255,107,53,0.12), transparent 70%)" }}></div>
        <div className="container-page text-center max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants}
          >
            <span className="eyebrow">
              <Globe className="h-3.5 w-3.5" /> High-Performance Web Design
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-primary lg:text-5xl font-display">
              Custom Web Design That Turns Visitors Into Customers
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              We build lightning-fast, custom-coded React websites for small businesses. Designed for mobile-first rendering, equipped with conversion paths, and fully optimized for local Google search. Shipped in 3 to 10 days, starting at $499.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/free-homepage-design" className="btn-cta text-sm">
                Get My Free Homepage Mockup →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Deliverables Grid */}
      <section className="section-y bg-surface overflow-hidden">
        <div className="container-page">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealVariants}
            className="text-center mb-12"
          >
            <span className="eyebrow">Deliverables</span>
            <h2 className="h2 mt-4 text-primary">What is included in every custom website.</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Palette, title: "100% Custom Design", desc: "No templates, no page builders. Every visual block is coded specifically for your B2B services, clinic, salon, or contracting brand." },
              { icon: Zap, title: "Mobile-First Responsive", desc: "Most searches happen on phones. We optimize touch target layouts, readability densities, and fast media scaling for modern devices." },
              { icon: Shield, title: "SSL Security Guarded", desc: "Secure HTTPS configuration, malware scanning, and server firewall protection configured instantly on Cloudflare edge." },
              { icon: MousePointerClick, title: "Booking Integration", desc: "Connects directly to your booking software (e.g. Jane, Acuity, Fresha, Tock, Resy) or provides custom lead form triggers." },
              { icon: Server, title: "Hosting on Cloudflare CDN", desc: "We host your code on a global content delivery network, slashing loading times to under 2 seconds worldwide." },
              { icon: Check, title: "Foundational SEO", desc: "Title tags, meta descriptions, image alt tags, JSON-LD schema schemas, sitemaps, and indexing setup on launch day." }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-accent transition-colors"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent mb-4">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-primary font-display">{item.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Design Showcase */}
      <section className="section-y bg-white overflow-hidden">
        <div className="container-page text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={revealVariants}
            className="mx-auto max-w-2xl mb-12"
          >
            <span className="eyebrow">Portfolio</span>
            <h2 className="h2 mt-4 text-primary">Look at what we've shipped.</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              { name: "Calder Contracting", type: "Contractor", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop", stat: "3x form submissions" },
              { name: "Lakeland Millwork", type: "Millwork", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop", stat: "2.5x more design inquiries" },
              { name: "JEM HR", type: "Professional Services", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop", stat: "40% faster onboarding" }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl border border-border overflow-hidden bg-card text-left shadow-sm"
              >
                <img src={p.img} alt={p.name} className="aspect-[16/10] w-full object-cover" />
                <div className="p-4 flex items-center justify-between border-t border-border">
                  <div>
                    <h4 className="font-bold text-sm text-primary font-display">{p.name}</h4>
                    <span className="text-[10px] uppercase font-bold text-accent">{p.type}</span>
                  </div>
                  <span className="text-xs font-bold text-success font-mono">{p.stat}</span>
                </div>
              </motion.div>
            ))}
          </div>
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
            className="mx-auto max-w-2xl text-center mb-10"
          >
            <span className="eyebrow">
              <HelpCircle className="h-4 w-4" /> FAQ
            </span>
            <h2 className="h2 mt-4 text-primary">Web Design Services FAQ</h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl border border-border rounded-2xl bg-card divide-y divide-border"
          >
            {WEBSITES_FAQ.map((faq, index) => (
              <details key={index} className="group p-6 focus:outline-none">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-primary hover:text-accent font-display text-lg">
                  <span>{faq.question}</span>
                  <span className="text-accent font-mono text-xl transition group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
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
            <h2 className="h2 text-white">Get a website that works for your business.</h2>
            <p className="mt-3 text-white/80">
              Book a free Google Meet. We design a bespoke mockup of your homepage within 48 hours of our meeting, 100% free.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/free-homepage-design" className="btn-cta text-base">
                Get My Free Mockup Design
              </Link>
              <Link to="/discovery-call" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/30 px-6 text-base font-semibold text-white hover:bg-white/10 transition-colors">
                Book a Discovery Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
