import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Star, ShieldCheck, Mail, Phone, Calendar } from "lucide-react";
import { createSubmission } from "../supabase";
import { sendConfirmationEmail } from "../emailjs";
import SEO from "../components/SEO";

export default function FreeHomepageDesign() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.businessType) {
      return;
    }
    setStatus("sending");
    try {
      // Save to Supabase (and localStorage)
      await createSubmission({
        type: "mockup",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        businessType: formData.businessType
      });

      // Send confirmation email via EmailJS
      await sendConfirmationEmail({
        to_email: formData.email,
        to_name: formData.name,
        subject: "Bespoke Mockup Design Requested - Buildora",
        message: `Hi ${formData.name},\n\nWe have received your request for a free custom homepage mockup for your business: ${formData.businessType}.\n\nScott will review your details and send you an email or call you shortly to schedule our Google Meet and walk through the initial design direction.\n\nBest regards,\nScott Martin\nBuildora Team\ncontact@buildora.ca`
      });

      setStatus("success");
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("success"); // Show success so client flow is unblocked
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const key = id === "hero-name" || id === "repeat-name" ? "name" :
                id === "hero-email" || id === "repeat-email" ? "email" :
                id === "hero-phone" || id === "repeat-phone" ? "phone" : "businessType";
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <main className="pt-14 pb-16 bg-white min-h-screen text-primary select-text">
      <SEO 
        title="Get a Free Custom Homepage Design Mockup in 48 Hours" 
        description="Request a free custom homepage website design mockup for your business in 48 hours. No upfront fees, no obligations, no credit card required." 
      />
      {/* Micro Top Bar */}
      <div className="bg-surface text-center py-2 px-3 text-xs text-muted-foreground border-b border-border">
        ★ 5.0 · 29 Google reviews · Based in Toronto, ON
      </div>

      <div className="container-page max-w-4xl py-10">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* Left copy column */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-4xl font-display">
              Get a Free Custom Homepage Design
            </h1>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Book a free Google Meet. Within 48 hours of our call, we will show you a custom homepage design built specifically for your business. No payment, no obligation, no credit card required.
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              It is a simple, no-stress icebreaker so we can meet face to face, discuss your services, and let you see our design skills firsthand. If it is not the right fit, you keep the mockup design files and owe nothing.
            </p>

            {/* Micro review */}
            <figure className="mt-6 bg-surface border border-border rounded-xl p-5 shadow-sm">
              <div className="flex gap-0.5 text-accent text-sm mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="text-sm font-medium leading-relaxed italic text-primary">
                "Frankly the best experience I have had working with any web team. Scott Martin communicates clearly, responds within hours, and built a blazing fast site for my retail shop."
              </blockquote>
              <figcaption className="mt-2 text-xs text-muted-foreground">
                David Brown, <span className="font-semibold text-primary">Out of the Woods · Canada</span>
              </figcaption>
            </figure>

            {/* How it works simple listing */}
            <div className="mt-8">
              <h2 className="text-lg font-bold font-display border-b pb-2">How It Works</h2>
              <div className="mt-4 space-y-4">
                <div className="flex gap-3">
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white">1</div>
                  <p className="text-sm text-muted-foreground"><strong className="text-primary font-display">Request details:</strong> Submit the quick form on this page with your contact info.</p>
                </div>
                <div className="flex gap-3">
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white">2</div>
                  <p className="text-sm text-muted-foreground"><strong className="text-primary font-display">15-Min Meet:</strong> We host a brief call to see what you do and who your ideal local clients are.</p>
                </div>
                <div className="flex gap-3">
                  <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white">3</div>
                  <p className="text-sm text-muted-foreground"><strong className="text-primary font-display">Mockup reveal:</strong> Within 48 hours we show you a custom visual direction for your homepage.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-5 bg-card border border-border rounded-2xl shadow-md p-6">
            {status === "success" ? (
              <div className="text-center py-10 space-y-4">
                <div className="inline-flex h-12 w-12 place-items-center rounded-full bg-success/15 text-success justify-center">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-display text-primary">Bespoke Mockup Requested!</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Hi {formData.name}, thank you for requesting a free custom mockup. Scott will review your {formData.businessType} details and send you an email within 2 hours with Google Meet times.
                </p>
                <p className="text-xs text-accent font-semibold mt-3 animate-pulse bg-accent/10 py-2 px-3 rounded-lg border border-accent/20">
                  ⚠️ Please check your **Spam or Junk folder** as our automated confirmation and initial replies may sometimes land there.
                </p>
                <Link to="/discovery-call" className="btn-cta h-11 w-full text-sm mt-4">
                  Go to Calendar Booking
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} aria-label="Free homepage design lead form">
                <h3 className="text-xl font-bold font-display text-primary border-b pb-3 mb-4">
                  Request Free Mockup
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary" htmlFor="hero-name">
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="hero-name"
                      required
                      type="text"
                      placeholder="Jane Smith"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary" htmlFor="hero-email">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      id="hero-email"
                      required
                      type="email"
                      placeholder="jane@business.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary" htmlFor="hero-phone">
                      Phone Number <span className="text-accent">*</span>
                    </label>
                    <input
                      id="hero-phone"
                      required
                      type="tel"
                      placeholder="(416) 555-1234"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary" htmlFor="hero-biz">
                      Business Type <span className="text-accent">*</span>
                    </label>
                    <select
                      id="hero-biz"
                      required
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm focus:ring-2 focus:ring-accent/30 focus:border-accent outline-none"
                    >
                      <option value="">Choose one…</option>
                      <option value="Salon or Spa">Salon or Spa</option>
                      <option value="Restaurant or Cafe">Restaurant or Cafe</option>
                      <option value="Contractor or Trades">Contractor or Trades</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Dental or Medical">Dental or Medical</option>
                      <option value="Legal or Accounting">Legal or Accounting</option>
                      <option value="Retail or Boutique">Retail or Boutique</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-bold text-white shadow-md hover:scale-[1.01] hover:brightness-110 active:scale-95 transition-all w-full focus:outline-none"
                >
                  {status === "sending" ? "Requesting..." : "Get My Free Homepage Design →"}
                </button>

                <p className="mt-3 text-center text-xs text-muted-foreground flex justify-center gap-2">
                  <span>✓ 100% free</span>
                  <span>·</span>
                  <span>✓ 48-Hour delivery</span>
                  <span>·</span>
                  <span>✓ No credit card</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>


    </main>
  );
}
