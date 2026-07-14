import { useState, useEffect } from "react";
import { Calculator, Check, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

export default function CostCalculator() {
  const [currency, setCurrency] = useState<"CAD" | "USD">("CAD");
  const [plan, setPlan] = useState<"starter" | "professional" | "custom">("professional");
  const [pages, setPages] = useState(10);
  const [showGrowth, setShowGrowth] = useState(false);
  const [showAddons, setShowAddons] = useState(false);

  // Growth Retainers
  const [socialRetainer, setSocialRetainer] = useState<"none" | "starter" | "growth">("none");

  // One-time Add-ons
  const [logoOption, setLogoOption] = useState<"none" | "logo" | "brand">("none");
  const [customFeatures, setCustomFeatures] = useState(false);

  // Totals
  const [setupTotal, setSetupTotal] = useState(1895);
  const [monthlyTotal, setMonthlyTotal] = useState(129);

  const rate = currency === "USD" ? 0.74 : 1.0;
  const symbol = currency === "USD" ? "US$" : "CA$";

  // Calculate whenever anything changes
  useEffect(() => {
    let baseSetup = 1895;
    let baseMonthly = 129;
    let planIncludedPages = 10;

    if (plan === "starter") {
      baseSetup = 499;
      baseMonthly = 69;
      planIncludedPages = 3;
    } else if (plan === "professional") {
      baseSetup = 1895;
      baseMonthly = 129;
      planIncludedPages = 10;
    } else if (plan === "custom") {
      baseSetup = 2895;
      baseMonthly = 199;
      planIncludedPages = 10;
    }

    // Extra page calculations
    let extraPages = Math.max(0, pages - planIncludedPages);
    let pageCost = 0;
    if (extraPages > 0) {
      if (extraPages >= 3) {
        pageCost = extraPages * 100;
      } else {
        pageCost = extraPages * 150;
      }
    }

    // Add Social retainer
    let socialCost = 0;
    if (socialRetainer === "starter") socialCost = 400;
    else if (socialRetainer === "growth") socialCost = 800;

    // Add Logo or Brand Package
    let brandCost = 0;
    if (logoOption === "logo") brandCost = 300;
    else if (logoOption === "brand") brandCost = 800;

    // Custom features
    let customCost = customFeatures ? 400 : 0;

    setSetupTotal(Math.round((baseSetup + pageCost + brandCost + customCost) * rate));
    setMonthlyTotal(Math.round((baseMonthly + socialCost) * rate));
  }, [currency, plan, pages, socialRetainer, logoOption, customFeatures, rate]);

  const handlePlanChange = (selected: "starter" | "professional" | "custom") => {
    setPlan(selected);
    if (selected === "starter") {
      setPages(3);
    } else {
      setPages(10);
    }
  };

  return (
    <div className="rounded-2xl border-2 border-accent/40 bg-card shadow-lg p-6 md:p-8">
      <div className="flex items-center gap-2 text-accent">
        <Calculator className="h-5 w-5" />
        <span className="text-xs font-bold uppercase tracking-wider">
          Live Cost Calculator
        </span>
      </div>
      <h3 className="mt-2 font-extrabold text-primary text-2xl md:text-3xl">
        Build Your Website Quote
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Pick your page counts and ongoing packages. No sales call, no email wall. Hosting and support are included.
      </p>

      {/* Currency Select */}
      <div className="mt-5 inline-flex rounded-full border border-border bg-surface p-1 text-xs font-bold">
        <button
          onClick={() => setCurrency("CAD")}
          className={`rounded-full px-3 py-1 transition ${currency === "CAD" ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
        >
          CAD ($)
        </button>
        <button
          onClick={() => setCurrency("USD")}
          className={`rounded-full px-3 py-1 transition ${currency === "USD" ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
        >
          USD ($)
        </button>
      </div>

      {/* Plans Selection */}
      <fieldset className="mt-5">
        <legend className="text-sm font-bold text-primary">Pick your starting plan</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <button
            onClick={() => handlePlanChange("starter")}
            className={`rounded-xl border-2 px-3 py-3 text-left transition ${plan === "starter" ? "border-accent bg-accent/5" : "border-border bg-card hover:border-accent/40"}`}
          >
            <div className="text-sm font-bold text-primary">Starter</div>
            <div className="mt-0.5 text-xs text-muted-foreground">Up to 3 pages</div>
            <div className="mt-1 text-sm font-bold text-accent">{symbol}{Math.round(499 * rate)}</div>
          </button>
          <button
            onClick={() => handlePlanChange("professional")}
            className={`rounded-xl border-2 px-3 py-3 text-left transition ${plan === "professional" ? "border-accent bg-accent/5" : "border-border bg-card hover:border-accent/40"}`}
          >
            <div className="text-sm font-bold text-primary">Professional</div>
            <div className="mt-0.5 text-xs text-muted-foreground">Up to 10 pages</div>
            <div className="mt-1 text-sm font-bold text-accent">{symbol}{Math.round(1895 * rate)}</div>
          </button>
          <button
            onClick={() => handlePlanChange("custom")}
            className={`rounded-xl border-2 px-3 py-3 text-left transition ${plan === "custom" ? "border-accent bg-accent/5" : "border-border bg-card hover:border-accent/40"}`}
          >
            <div className="text-sm font-bold text-primary">Custom Scope</div>
            <div className="mt-0.5 text-xs text-muted-foreground">Tailored custom</div>
            <div className="mt-1 text-sm font-bold text-accent">{symbol}{Math.round(2895 * rate)}+</div>
          </button>
        </div>
      </fieldset>

      {/* Pages Selector */}
      <fieldset className="mt-5">
        <legend className="text-sm font-bold text-primary">Total custom pages</legend>
        <div className="mt-3">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3">
            <div className="text-xs text-muted-foreground">
              {plan === "starter"
                ? "Starter includes 3 · extra pages $150/page"
                : "Professional includes 10 · extras $150/page ($100 at 3+)"}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPages(Math.max(1, pages - 1))}
                className="h-9 w-9 rounded-lg border border-border bg-card text-lg font-bold text-primary hover:border-accent"
              >
                −
              </button>
              <span className="w-8 text-center text-base font-bold text-primary">
                {pages}
              </span>
              <button
                onClick={() => setPages(pages + 1)}
                className="h-9 w-9 rounded-lg border border-border bg-card text-lg font-bold text-primary hover:border-accent"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Growth Services Expandable */}
      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-surface/50">
        <button
          onClick={() => setShowGrowth(!showGrowth)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-surface focus:outline-none"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-accent">
              Growth retainers (Optional)
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Ongoing social media strategy to compound results.
            </p>
          </div>
          {showGrowth ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-primary" />}
        </button>

        {showGrowth && (
          <div className="p-4 border-t border-border bg-card space-y-4">
            {/* Social Retainer */}
            <div>
              <div className="text-sm font-semibold text-primary mb-2">Social Media Management</div>
              <div className="grid gap-2 grid-cols-3">
                <button
                  onClick={() => setSocialRetainer("none")}
                  className={`px-3 py-2 text-xs font-bold rounded-lg border ${socialRetainer === "none" ? "bg-primary text-white border-primary" : "bg-card text-primary border-border hover:border-accent"}`}
                >
                  No social
                </button>
                <button
                  onClick={() => setSocialRetainer("starter")}
                  className={`px-3 py-2 text-xs font-bold rounded-lg border ${socialRetainer === "starter" ? "bg-primary text-white border-primary" : "bg-card text-primary border-border hover:border-accent"}`}
                >
                  Starter Social (+{symbol}{Math.round(400 * rate)}/mo)
                </button>
                <button
                  onClick={() => setSocialRetainer("growth")}
                  className={`px-3 py-2 text-xs font-bold rounded-lg border ${socialRetainer === "growth" ? "bg-primary text-white border-primary" : "bg-card text-primary border-border hover:border-accent"}`}
                >
                  Growth Social (+{symbol}{Math.round(800 * rate)}/mo)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add-ons Expandable */}
      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface/50">
        <button
          onClick={() => setShowAddons(!showAddons)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-surface focus:outline-none"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-accent">
              One-time Add-ons (Optional)
            </div>
          </div>
          {showAddons ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-primary" />}
        </button>

        {showAddons && (
          <div className="p-4 border-t border-border bg-card space-y-4">
            {/* Brand/Logo Design */}
            <div>
              <div className="text-sm font-semibold text-primary mb-2">Branding Package</div>
              <div className="grid gap-2 grid-cols-3">
                <button
                  onClick={() => setLogoOption("none")}
                  className={`px-3 py-2 text-xs font-bold rounded-lg border ${logoOption === "none" ? "bg-primary text-white border-primary" : "bg-card text-primary border-border hover:border-accent"}`}
                >
                  Have logo already
                </button>
                <button
                  onClick={() => setLogoOption("logo")}
                  className={`px-3 py-2 text-xs font-bold rounded-lg border ${logoOption === "logo" ? "bg-primary text-white border-primary" : "bg-card text-primary border-border hover:border-accent"}`}
                >
                  Logo Only (+{symbol}{Math.round(300 * rate)})
                </button>
                <button
                  onClick={() => setLogoOption("brand")}
                  className={`px-3 py-2 text-xs font-bold rounded-lg border ${logoOption === "brand" ? "bg-primary text-white border-primary" : "bg-card text-primary border-border hover:border-accent"}`}
                >
                  Full Brand Package (+{symbol}{Math.round(800 * rate)})
                </button>
              </div>
            </div>

            {/* Custom Interactive features */}
            <div className="flex items-center justify-between border-t border-border pt-3">
              <div>
                <div className="text-sm font-semibold text-primary">Custom Interactive Features</div>
                <div className="text-xs text-muted-foreground">E-commerce, member portals, custom calendars, etc.</div>
              </div>
              <input
                type="checkbox"
                checked={customFeatures}
                onChange={(e) => setCustomFeatures(e.target.checked)}
                className="h-5 w-5 border-border rounded text-accent focus:ring-accent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Estimate Total Card */}
      <div className="mt-7 rounded-2xl bg-primary p-6 text-white">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-white/60">One-time Setup</div>
            <div className="mt-1 text-4xl font-extrabold text-accent">
              {symbol}{setupTotal.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-white/60">Then Per Month</div>
            <div className="mt-1 text-2xl font-bold text-white">
              {symbol}{monthlyTotal.toLocaleString()}
              <span className="text-sm font-normal text-white/70">/mo</span>
            </div>
          </div>
        </div>

        {/* Dynamic breakdown */}
        <div className="mt-5 space-y-2 rounded-xl bg-white/5 p-4 text-xs font-mono">
          <div className="flex justify-between gap-3 text-white/80">
            <span>{plan.toUpperCase()} web plan setup:</span>
            <span>{symbol}{(plan === "starter" ? 499 : plan === "professional" ? 1895 : 2895) * rate}</span>
          </div>
          {pages > (plan === "starter" ? 3 : 10) && (
            <div className="flex justify-between gap-3 text-white/80">
              <span>Extra pages ({pages - (plan === "starter" ? 3 : 10)}):</span>
              <span>{symbol}{(setupTotal - ((plan === "starter" ? 499 : plan === "professional" ? 1895 : 2895) + (logoOption === "logo" ? 300 : logoOption === "brand" ? 800 : 0) + (customFeatures ? 400 : 0)) * rate)}</span>
            </div>
          )}
          {logoOption !== "none" && (
            <div className="flex justify-between gap-3 text-white/80">
              <span>Branding ({logoOption === "logo" ? "Logo only" : "Full brand package"}):</span>
              <span>{symbol}{(logoOption === "logo" ? 300 : 800) * rate}</span>
            </div>
          )}
          {customFeatures && (
            <div className="flex justify-between gap-3 text-white/80">
              <span>Custom features & integrations:</span>
              <span>{symbol}{400 * rate}</span>
            </div>
          )}
          <div className="flex justify-between gap-3 text-white border-t border-white/10 pt-2 font-bold">
            <span>Monthly hosting, backup & support:</span>
            <span>{symbol}{monthlyTotal}/mo</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm">
          <Check className="h-4 w-4 shrink-0 text-accent" />
          <span>
            Recommended plan: <strong className="capitalize text-accent">{plan}</strong>
            <span className="ml-1 text-xs text-white/60">· No locked-in contracts</span>
          </span>
        </div>

        <a
          href={`/free-homepage-design?plan=${plan}&pages=${pages}&currency=${currency}`}
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg text-base font-bold text-white shadow-lg bg-accent transition-all hover:scale-[1.01] hover:brightness-110 active:scale-95"
        >
          Lock In This Estimate
          <ArrowRight className="h-4 w-4" />
        </a>
        <p className="mt-3 text-center text-xs text-white/60">
          Estimates are ±10% accurate. Scope and details finalized on your free mockup call.
        </p>
      </div>
    </div>
  );
}
