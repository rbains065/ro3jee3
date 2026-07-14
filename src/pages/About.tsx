import { Link } from "react-router-dom";
import { Award, Zap, Eye, Target, Heart, Check, Info } from "lucide-react";

export default function About() {
  return (
    <div className="pt-14 text-primary select-text">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container-page py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <span>About</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-white py-10 lg:py-14 border-b border-border">
        <div className="absolute inset-0 -z-10 opacity-50" style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(255,107,53,0.1), transparent 70%)" }}></div>
        <div className="container-page text-center max-w-3xl">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Our Story</span>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-primary lg:text-5xl font-display">
            We Build Websites That Work. Here Is Why.
          </h1>
          <p className="mx-auto mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            Buildora was born out of a simple idea: small businesses deserve custom-coded, high-performance websites at transparent prices. Not $20,000 agency overheads, not $99 template clones.
          </p>
          <div className="mt-6 flex justify-center">
            <Link to="/free-homepage-design" className="btn-cta text-sm">
              Get a Free Mockup Design
            </Link>
          </div>
        </div>
      </section>

      {/* Main Narrative / Bio */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            
            {/* Bio Photo Placeholder - Text-Only Metadata Card, No Image */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-accent/30 to-primary/10 blur-xl"></div>
              <div className="w-full rounded-2xl bg-card border border-border flex flex-col p-8 text-left shadow-md space-y-6">
                <div>
                  <h3 className="text-2xl font-bold font-display text-primary">Scott Martin</h3>
                  <p className="text-sm text-accent font-semibold mt-1">Founder & Developer</p>
                </div>
                <div className="space-y-3 pt-4 border-t border-border text-xs text-muted-foreground leading-relaxed">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-primary/70 tracking-wider">Education</span>
                    <span className="text-primary font-medium">Toronto Metropolitan University (TMU) • Software Engineering</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-primary/70 tracking-wider">Focus</span>
                    <span className="text-primary font-medium">Custom React Apps & Local SEO Optimization</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-primary/70 tracking-wider">Experience</span>
                    <span className="text-primary font-medium">20+ production-grade builds launched</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative text */}
            <div className="lg:col-span-7 space-y-5">
              <span className="eyebrow">Founder Profile</span>
              <h2 className="h2 text-primary">Hi, I'm Scott Martin.</h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                I'm a Toronto-based web developer and Software Engineering graduate of Toronto Metropolitan University (TMU) who established Buildora to build high-performance websites for local businesses without the bloated agency fees.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I started writing custom code during my time at TMU, first helping family, then partnering with local shops and trades around the Greater Toronto Area who needed to strengthen their local search rankings. While studying software engineering, I spent my evenings optimization-testing, developing bespoke layouts, and building lightweight solutions that search engines love and mobile devices load instantly.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I noticed a frustrating trend: agencies quoting five-figure packages to support high downtown rent and physical sales reps, while DIY platforms left owners with clunky, slow sites that fail Core Web Vitals. Buildora exists to offer a reliable, professional alternative: clean custom code, honest pricing, and direct communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist Philosophy */}
      <section className="section-y bg-white">
        <div className="container-page max-w-3xl">
          <span className="eyebrow">Our Philosophy</span>
          <h2 className="h2 mt-4 text-primary">The web agency model is broken.</h2>
          <div className="mt-6 space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>
              <strong>The traditional agency approach:</strong> They charge $15,000 for a site, take months to write it, route every change through an account manager, and deliver a complex system you can't edit without paying their high hourly retainer. Much of your budget pays for their physical overhead and marketing.
            </p>
            <p>
              <strong>The DIY page-builder approach:</strong> Wix, Squarespace, GoDaddy. You spend 40 hours of your own time dragging components around. The result looks identical to every other template, loads slowly on mobile, fails Google's Core Web Vitals, and doesn't claim local map packs properly.
            </p>
            <p>
              Buildora represents the modern approach. Custom-coded, fast React SPAs starting at CA$499, shipped in 3–10 business days. Direct developer emails. Compounding local SEO retainer packages. 100% owned by you.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="text-center mb-12">
            <span className="eyebrow">Our Values</span>
            <h2 className="h2 mt-4 text-primary">What we stand for.</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-accent transition-all">
              <Zap className="h-8 w-8 text-accent" />
              <h3 className="mt-5 text-lg font-bold text-primary font-display">Speed</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                We launch websites in 3 to 10 days. We don't drag projects out to justify bloated invoices. Lean execution only.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-accent transition-all">
              <Eye className="h-8 w-8 text-accent" />
              <h3 className="mt-5 text-lg font-bold text-primary font-display">Transparency</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Pricing is posted publicly. No discovery fees to get a quote, no locked-in long-term contracts.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-accent transition-all">
              <Target className="h-8 w-8 text-accent" />
              <h3 className="mt-5 text-lg font-bold text-primary font-display">Results</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Layouts, headings, and SEO markup are optimized for conversion: turning Google searchers into active appointments.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-accent transition-all">
              <Heart className="h-8 w-8 text-accent" />
              <h3 className="mt-5 text-lg font-bold text-primary font-display">Partnership</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                We answer our own phone calls and handle updates same-day. We support your business for the long term.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Difference List Grid */}
      <section className="section-y bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="h2 text-primary">How we are different from big agencies</h2>
          </div>

          <div className="mx-auto max-w-3xl divide-y divide-border border border-border rounded-2xl bg-card">
            {[
              { label: "Pricing", elevate: "$499 – $2,895 transparent build cost", agency: "$8,000 – $25,000 with complex scope worksheets" },
              { label: "Timeline", elevate: "3 – 10 business days from layout signoff", agency: "8 – 16 week sluggish dev phases" },
              { label: "Backends", elevate: "Custom, lightweight React framework builds", agency: "Rigid theme setups or heavy CMS software overrides" },
              { label: "SEO Campaign", elevate: "Foundational SEO included; detailed GBP audit", agency: "CA$2,000+ extra package at launch" },
              { label: "Communication", elevate: "Direct Slack or email link to Scott", agency: "Account manager routing emails slowly" }
            ].map((item, idx) => (
              <div key={idx} className="grid gap-4 px-6 py-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-success">{item.label} (Buildora)</div>
                    <div className="text-sm font-semibold text-primary mt-1">{item.elevate}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:border-l sm:border-border sm:pl-6">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface text-muted-foreground">×</span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.label} (Agency)</div>
                    <div className="text-sm text-muted-foreground mt-1">{item.agency}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-4xl font-extrabold text-accent font-display md:text-5xl">20+</div>
              <div className="mt-2 text-sm text-white/80">Websites Shipped</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-4xl font-extrabold text-accent font-display md:text-5xl">99.9%</div>
              <div className="mt-2 text-sm text-white/80">Average Uptime</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-4xl font-extrabold text-accent font-display md:text-5xl">3-10 days</div>
              <div className="mt-2 text-sm text-white/80">Average delivery</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-4xl font-extrabold text-accent font-display md:text-5xl">100%</div>
              <div className="mt-2 text-sm text-white/80">Owner-managed</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
