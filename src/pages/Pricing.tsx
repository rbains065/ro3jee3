import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Globe, Megaphone, Info, ArrowRight, Minus, Plus, Mail } from "lucide-react";
import CostCalculator from "../components/CostCalculator";
import { PLANS, ADD_ONS, WEBSITES_FAQ } from "../data";

export default function Pricing() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [emailValue, setEmailValue] = useState("");
  const [emailStatus, setEmailValueStatus] = useState<"idle" | "sending" | "success">("idle");

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue) return;
    setEmailValueStatus("sending");
    setTimeout(() => {
      setEmailValueStatus("success");
      setEmailValue("");
    }, 800);
  };

  return (
    <div className="pt-14">
      {/* breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container-page py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <span>Pricing</span>
        </div>
      </div>

      {/* Header */}
      <section className="relative overflow-hidden bg-white py-10 lg:py-14">
        <div className="absolute inset-0 -z-10 opacity-50" style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(255,107,53,0.1), transparent 70%)" }}></div>
        <div className="container-page text-center">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Pricing</span>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-primary lg:text-5xl font-display">
            Real Pricing. Real Numbers. Posted Online.
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Simple options, no fine print. One-time website setup with transparent monthly support plans. Month-to-month, cancel anytime.
          </p>
        </div>
      </section>

      {/* WEBSITES SECTION */}
      <section className="section-y bg-white scroll-mt-28" id="websites">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <span className="eyebrow">
              <Globe className="h-4 w-4" /> Category 1 · Websites
            </span>
            <h2 className="h2 mt-4 text-primary">Web design, one-time build + monthly maintenance.</h2>
            <p className="mt-3 text-muted-foreground">
              Custom websites, copywriting, hosting, plus technical launch SEO. Setup is a one-time fee. The monthly fee covers hosting, SSL, daily backups, and minor updates.
            </p>
          </div>

          <div className="grid gap-8 items-stretch lg:grid-cols-3">
            {PLANS.map((plan) => {
              const isPro = plan.slug === "professional";
              return (
                <div
                  key={plan.slug}
                  className={`relative flex h-full flex-col rounded-2xl border bg-card p-7 shadow-sm transition-all hover:shadow-md ${
                    isPro ? "border-accent lg:-translate-y-3 lg:scale-[1.02] shadow-md" : "border-border"
                  }`}
                >
                  {isPro && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-primary font-display">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-primary">CA${plan.setupPrice}</span>
                      <span className="text-sm text-muted-foreground">setup + ${plan.monthlyPrice}/mo</span>
                    </div>
                    <p className="mt-3 select-text border-l-2 border-accent/40 pl-3 text-xs text-muted-foreground leading-relaxed">
                      <span className="font-semibold uppercase tracking-wider text-primary/70">Best for: </span>
                      {plan.bestFor}
                    </p>
                  </div>

                  <div className="mt-6 flex-1">
                    <ul className="space-y-3 text-sm">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                          <span className="text-primary/95 leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to={`/free-homepage-design?plan=${plan.slug}`}
                    className={`mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg font-bold text-sm ${
                      isPro ? "bg-accent text-white shadow-lg hover:brightness-110" : "bg-primary text-white hover:brightness-110"
                    }`}
                  >
                    {isPro ? "Get My Pro Mockup →" : `Start at $${plan.setupPrice} →`}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Foundational SEO Info alert */}
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border-2 border-accent/40 bg-accent/5 p-6">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div className="text-sm leading-relaxed text-primary">
                <strong>The SEO included in your build is one-time foundational setup at launch.</strong> That covers technical optimization, sitemaps, indexing setup, schema markup, and GBP claims. This ensures your site has a solid foundation to rank locally on Google Maps and search.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COST CALCULATOR SECTION */}
      <section className="section-y bg-surface" id="calculator-section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <span className="eyebrow">Try It</span>
            <h2 className="h2 mt-4 text-primary">Build your own website quote.</h2>
            <p className="mt-3 text-muted-foreground">
              Calculate exact page setups and growth services in real-time. No sales call. No phone tag. The estimate updates live.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <CostCalculator />
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC BLOCK */}
      <section className="section-y bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="h2 text-primary">Not sure which website plan fits?</h2>
            <p className="mt-3 text-muted-foreground">Answer these three simple questions. The first "yes" is your plan.</p>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-accent">→ Starter</div>
              <p className="mt-2 text-base font-bold text-primary font-display">
                Do I just need a clean web presence so customers can find me, see services, and call?
              </p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Starter ($499 + $69/mo). 3 pages covers home, services list, and contact information perfectly. Solo trades and independent brands thrive here.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-accent">→ Professional</div>
              <p className="mt-2 text-base font-bold text-primary font-display">
                Do I need to actively compete for organic rankings, capture leads, and have a blog?
              </p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Professional ($1,895 + $129/mo). Up to 10 pages with optimized headings, schema, lead forms, and support. Most established clinics, contractors, and hospitality businesses use this plan.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-accent">→ Custom</div>
              <p className="mt-2 text-base font-bold text-primary font-display">
                Do I have multiple locations, an online shop, or complex booking integrations?
              </p>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Custom ($2,995+ + $199/mo). Custom scope tailored exactly to your booking CRM (e.g. Jane App, Mindbody, Boulevard) or inventory management setup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE SECTION */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="h2 text-primary">Buildora vs. Typical Agency vs. DIY.</h2>
            <p className="mt-3 text-muted-foreground">The honest numbers and tradeoffs that agencies hide behind contract lock-ins.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full min-w-[720px] text-sm text-left">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-6 py-4 font-bold text-primary">Feature Indicators</th>
                  <th className="px-6 py-4 font-bold text-accent">Buildora</th>
                  <th className="px-6 py-4 font-bold text-primary">Typical Agency</th>
                  <th className="px-6 py-4 font-bold text-primary">DIY (Wix / Fiverr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 font-semibold text-primary">Setup cost</td>
                  <td className="px-6 py-4 font-bold text-success">CA$499 – $2,895+</td>
                  <td className="px-6 py-4 text-muted-foreground">$8,000 – $30,000</td>
                  <td className="px-6 py-4 text-muted-foreground">$0 (or $50-500 on fiverr)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-primary">Monthly cost</td>
                  <td className="px-6 py-4 font-bold text-success">CA$69 – $199/mo</td>
                  <td className="px-6 py-4 text-muted-foreground">$200+ managed hosting</td>
                  <td className="px-6 py-4 text-muted-foreground">$30+/mo subscription</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-primary">Delivery speed</td>
                  <td className="px-6 py-4 font-bold text-success">3 – 10 business days</td>
                  <td className="px-6 py-4 text-muted-foreground">8 – 16 weeks (bloated)</td>
                  <td className="px-6 py-4 text-muted-foreground">30 – 80 hours of your labor</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-primary">SEO foundations</td>
                  <td className="px-6 py-4 font-bold text-success">Included at launch</td>
                  <td className="px-6 py-4 text-muted-foreground">CA$2,000+ upsell</td>
                  <td className="px-6 py-4 text-muted-foreground">Self-serve, usually broken</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-primary">Code ownership</td>
                  <td className="px-6 py-4 font-bold text-success">100% owned by you</td>
                  <td className="px-6 py-4 text-muted-foreground">Locked to agency CMS</td>
                  <td className="px-6 py-4 text-muted-foreground">Locked to platform</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-primary">Direct contact</td>
                  <td className="px-6 py-4 font-bold text-success">Yes, talk directly to Scott</td>
                  <td className="px-6 py-4 text-muted-foreground">Account managers forwarding mail</td>
                  <td className="px-6 py-4 text-muted-foreground">Forum threads & support bots</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ADD-ONS SECTION */}
      <section className="section-y bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="h2 text-primary">Add-on services.</h2>
            <p className="mt-3 text-muted-foreground">Extra services you can stack on top of your build.</p>
          </div>

          <div className="mx-auto max-w-3xl divide-y divide-border border border-border rounded-2xl bg-card">
            {ADD_ONS.map((addon) => (
              <div key={addon.name} className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-bold text-primary font-display">{addon.name}</div>
                  <div className="text-sm text-muted-foreground">{addon.desc}</div>
                </div>
                <div className="text-base font-bold text-accent font-mono sm:text-right shrink-0">
                  {addon.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator text */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.32_0.06_252)] p-8 text-center text-white shadow-lg md:p-12">
            <h2 className="h2 text-white">The math is simple.</h2>
            <p className="mt-5 text-lg md:text-xl leading-relaxed text-white/90">
              If your new website converts just <span className="font-bold text-accent">2 extra customer bookings per month</span>, and your average booking value is $500, that is <span className="font-bold text-accent">$12,000 in additional local revenue per year</span>. Your build pays for itself in the first month.
            </p>
          </div>
        </div>
      </section>

      {/* EMAIL REQUEST SECTION */}
      <section className="section-y bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-accent/30 bg-accent/5 p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/15 text-accent md:grid">
                <Mail className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-primary font-display md:text-3xl">
                  Want the pricing breakdown by email?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  We'll send you a 1-page PDF breakdown of all three service tiers, complete lists of page deliverables, and a no-cost checklist to guide your decision on which plan fits. No follow-up spam, no sales calls.
                </p>

                {emailStatus === "success" ? (
                  <div className="mt-6 rounded-lg bg-success/10 p-4 text-sm font-bold text-success">
                    ✓ Sent! Check your inbox in about 60 seconds.
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      required
                      placeholder="you@business.com"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    />
                    <button
                      type="submit"
                      disabled={emailStatus === "sending"}
                      className="btn-cta h-12 shadow-none py-0 whitespace-nowrap text-sm"
                    >
                      {emailStatus === "sending" ? "Sending..." : "Send the breakdown"}
                    </button>
                  </form>
                )}
                <p className="mt-3 text-xs text-muted-foreground">One email only. Unsubscribe instantly with one click.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING FAQ */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <div className="text-center mb-10">
            <h2 className="h2 text-primary">Pricing FAQ.</h2>
          </div>
          <div className="mx-auto max-w-3xl border border-border rounded-2xl bg-card divide-y divide-border">
            {WEBSITES_FAQ.map((faq, index) => {
              const isOpen = activeFAQ === index;
              return (
                <div key={index}>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-start justify-between gap-4 px-6 py-6 text-left transition hover:bg-surface focus:outline-none"
                    type="button"
                  >
                    <span className="text-base md:text-lg font-bold text-primary font-display">{faq.question}</span>
                    <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface text-primary transition-transform">
                      {isOpen ? <Minus className="h-4 w-4 text-accent" /> : <Plus className="h-4 w-4 text-accent" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-7 text-sm leading-relaxed text-muted-foreground select-text">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER CTA BLOCK */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container-page">
          <h2 className="h2 text-white">Not sure which plan fits?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Get a free custom homepage design mockup first, we'll recommend the optimal scope for your business.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/free-homepage-design" className="btn-cta text-base">
              Get My Free Homepage Mockup
            </Link>
            <Link to="/discovery-call" className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-white/30 px-6 text-base font-semibold text-white hover:bg-white/10 transition-colors">
              Book a Free Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
