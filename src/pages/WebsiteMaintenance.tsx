import { Link } from "react-router-dom";
import { Check, Star, ShieldCheck, Server, Lock, Database, Activity, RefreshCw, SquarePen, AlertTriangle } from "lucide-react";

const MAINTENANCE_FAQ = [
  {
    q: "Do you maintain websites that you didn't build?",
    a: "No. Maintenance, security hosting, and support are strictly bundled with custom platforms built by Buildora on our Lovable + Cloudflare stack. If you have an existing site elsewhere, we specialize in rebuilding it from scratch, which is usually cheaper than inheriting and fixing a legacy codebase."
  },
  {
    q: "What if my site goes down?",
    a: "We monitor uptime 24/7. In the rare event of a node outage, we get instant alerts and usually resolve the server issue within 1 hour."
  },
  {
    q: "How do I request text or photo changes?",
    a: "Simply email your edits directly to Scott. Minor text, price, or photo changes are handled and deployed same-day, included under your plan's monthly updates window."
  },
  {
    q: "Can I cancel my maintenance plan?",
    a: "Yes. All maintenance hosting agreements are month-to-month with 30 days notice. If you choose to leave, we export your source files and hand them over. No migration penalty, no locks."
  }
];

export default function WebsiteMaintenance() {
  return (
    <div className="pt-14 text-primary select-text">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container-page py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/pricing" className="hover:text-accent">Services</Link>
          <span className="mx-2">/</span>
          <span>Website Maintenance</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white py-12 lg:py-16">
        <div className="absolute inset-0 -z-10 opacity-55" style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(255,107,53,0.12), transparent 70%)" }}></div>
        <div className="container-page text-center max-w-3xl">
          <span className="eyebrow">
            <Server className="h-3.5 w-3.5" /> High-Performance Care Plans
          </span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-primary lg:text-5xl font-display">
            Bespoke Website Maintenance & Edge Hosting
          </h1>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            Secure, global CDN hosting, SSL certificate renewals, automated daily backups, round-the-clock uptime monitoring, and minor content edits — all handled in one simple plan. No code updates to worry about. Plans from $69/month.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/free-homepage-design" className="btn-cta text-sm">
              Get a Free Homepage Mockup
            </Link>
          </div>
        </div>
      </section>

      {/* Why maintenance is not optional */}
      <section className="section-y bg-surface">
        <div className="container-page max-w-3xl">
          <div className="rounded-2xl border-2 border-primary/20 bg-card p-6 md:p-8 flex gap-4 items-start shadow-sm">
            <AlertTriangle className="h-10 w-10 text-accent shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-primary font-display">Unmaintained sites decay.</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                A website is active software. Left unmaintained, software dependencies accumulate security vulnerabilities, images bloat, and loading speeds degrade. Google penalizes slow, unsecured websites, dropping your search visibility over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Deliverables */}
      <section className="section-y bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <span className="eyebrow">What is Covered</span>
            <h2 className="h2 mt-4 text-primary">Our technical essentials care checklist.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              { icon: Server, title: "Edge CDN Hosting", desc: "Your site is cached on Cloudflare's global edge network, keeping load times under 2 seconds." },
              { icon: Lock, title: "SSL Certification", desc: "Auto-renewing HTTPS encryption fully managed and checked quarterly." },
              { icon: Database, title: "Automated Backups", desc: "We run scheduled database and asset backups so your site can be restored instantly if required." },
              { icon: ShieldCheck, title: "Security Patching", desc: "Continuous monitoring for malicious node attacks, dependency audits, and firewall patches." },
              { icon: Activity, title: "Uptime Monitoring", desc: "We run ping checks every 60 seconds and receive instant SMS alerts in the event of an outage." },
              { icon: SquarePen, title: "Minor Content Edits", desc: "Text, hours, staff, or photo updates applied and deployed safely by Scott same-day." }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex gap-4 rounded-xl border border-border bg-card p-5 hover:border-accent transition-colors">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent shrink-0">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary font-display">{item.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plan Card Pricing */}
      <section className="section-y bg-surface border-t border-border">
        <div className="container-page">
          <div className="text-center mb-12">
            <span className="eyebrow">Plans</span>
            <h2 className="h2 mt-4 text-primary">Simple, contract-free support plans.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-primary font-display">Starter Care</h3>
                <div className="mt-2 text-2xl font-extrabold text-primary">$69<span className="text-xs text-muted-foreground font-normal">/mo</span></div>
                <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground border-t border-border pt-4">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> CDN Edge Hosting</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> SSL Management</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Monthly Backups</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Uptime monitoring</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> 30 min updates/mo</li>
                </ul>
              </div>
              <Link to="/contact" className="btn-outline h-10 py-0 text-xs font-bold mt-6 w-full">Choose Plan</Link>
            </div>

            {/* Professional */}
            <div className="rounded-2xl border-2 border-accent bg-card p-6 shadow-md flex flex-col justify-between relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[10px] font-bold uppercase text-white">Recommended</span>
              <div>
                <h3 className="text-lg font-bold text-primary font-display">Professional Care</h3>
                <div className="mt-2 text-2xl font-extrabold text-primary">$129<span className="text-xs text-muted-foreground font-normal">/mo</span></div>
                <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground border-t border-border pt-4">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Everything in Starter</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Daily Backups</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Priority same-day support</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> 1 hour updates/mo</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Software auditing</li>
                </ul>
              </div>
              <Link to="/contact" className="btn-cta h-10 py-0 text-xs font-bold mt-6 w-full">Choose Plan</Link>
            </div>

            {/* Custom */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-primary font-display">Custom Care</h3>
                <div className="mt-2 text-2xl font-extrabold text-primary">$199<span className="text-xs text-muted-foreground font-normal">/mo</span></div>
                <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground border-t border-border pt-4">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Everything in Professional</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> 2 hours updates/mo</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Integration audits (CRM, SMS)</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Monthly speed check</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-success" /> Strategic roadmap advice</li>
                </ul>
              </div>
              <Link to="/contact" className="btn-outline h-10 py-0 text-xs font-bold mt-6 w-full">Choose Plan</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance FAQ */}
      <section className="section-y bg-white border-t border-border">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="h2 text-primary font-display">Maintenance Frequently Asked Questions</h2>
          </div>
          <div className="mx-auto max-w-3xl border border-border rounded-2xl bg-card divide-y divide-border shadow-sm">
            {MAINTENANCE_FAQ.map((faq, index) => (
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
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container-page">
          <h2 className="h2 text-white font-display">Get a custom website with maintenance bundled.</h2>
          <p className="mt-3 text-white/80">Every Buildora project goes live with safe secure hosting and backups pre-configured.</p>
          <div className="mt-8">
            <Link to="/free-homepage-design" className="btn-cta text-base">
              Get My Free Mockup Design
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
