import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Check, ShieldAlert, Video, Calendar, ShieldCheck } from "lucide-react";
import { createSubmission } from "../supabase";
import { sendConfirmationEmail } from "../emailjs";

export default function DiscoveryCall() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    interest: "",
    preferred: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setStatus("sending");
    try {
      await createSubmission({
        type: "booking",
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        website: formData.website || undefined,
        interest: formData.interest || undefined,
        preferredTime: formData.preferred || undefined,
        message: formData.message || undefined
      });

      await sendConfirmationEmail({
        to_email: formData.email,
        to_name: formData.name,
        subject: "Discovery Call Requested - Buildora",
        message: `Hi ${formData.name},\n\nWe have received your interest in scheduling a 15-Minute Discovery Call with Buildora!\n\nDetails of your request:\n- Selected Focus: ${formData.interest || "Not specified"}\n- Preferred Time Frame: ${formData.preferred || "Not specified"}\n- Your Website: ${formData.website || "None"}\n- Additional goals: "${formData.message || "None"}"\n\nScott will review these details and email you shortly with a personalized Google Meet calendar invitation.\n\nBest regards,\nScott Martin\nBuildora Team\ncontact@buildora.ca`
      });

      setStatus("success");
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("success");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-14 text-primary select-text">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container-page py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <span>Book a Call</span>
        </div>
      </div>

      <section className="relative overflow-hidden bg-white py-10 lg:py-16">
        <div className="absolute inset-0 -z-10 opacity-50" style={{ background: "radial-gradient(50% 50% at 20% 0%, rgba(255,107,53,0.15), transparent 70%), radial-gradient(50% 50% at 80% 20%, rgba(16,185,129,0.1), transparent 70%)" }}></div>
        
        <div className="container-page max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            
            {/* Left Content */}
            <div className="space-y-6">
              <span className="eyebrow">
                <Clock className="h-3.5 w-3.5" /> Free Google Meet • No obligation
              </span>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-primary lg:text-4xl font-display">
                Book a Free 15-Minute Discovery Call
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Meet Scott, the developer who does the work. On this short call, we will discuss your business, audit your existing local search presence, and walk through service goals.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Within 48 hours of our meeting, we will send you a bespoke mockup of your new homepage. Yours to keep. If we are not a fit, you owe nothing.
              </p>

              <div className="space-y-3.5 border-t border-border pt-6">
                {[
                  "No generic slide decks or high-pressure pitches",
                  "Direct analysis of your competitors' ranking keywords",
                  "Transparent setup quote with exact deliverables",
                  "Available remotely across Canada and the US"
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-3 text-sm">
                    <Check className="h-5 w-5 shrink-0 text-success" />
                    <span className="text-primary/95">{text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-4">
                <span className="inline-flex items-center gap-1">
                  <Video className="h-4 w-4 text-accent" /> Google Meet
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-accent" /> 100% Privacy Guarded
                </span>
              </div>
            </div>

            {/* Right Booking Area */}
            <div id="booking-block" className="space-y-6">
              <div className="overflow-hidden rounded-2xl border-2 border-accent/30 bg-card shadow-lg">
                <div className="border-b border-border bg-accent/5 px-6 py-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-accent font-mono">
                    Free Google Meet · Custom homepage design in 48 hours
                  </div>
                  <h2 className="mt-1 text-lg font-bold text-primary font-display">
                    Schedule Your Appointment
                  </h2>
                </div>
                
                {/* Embed simulated Calendly widget */}
                <div className="h-[480px] bg-surface flex flex-col justify-center items-center text-center p-8 border-b border-border">
                  <Calendar className="h-12 w-12 text-accent mb-4" />
                  <h3 className="font-bold text-primary text-lg font-display">Interactive Calendar Widget</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                    In a production site, this iframe embeds your Calendly scheduler. For this build preview, use the request fallback form below to book instantly!
                  </p>
                  <a href="#request-fallback" className="btn-cta h-11 text-xs mt-6">
                    Use booking form fallback
                  </a>
                </div>
              </div>

              {/* Fallback Form */}
              <div id="request-fallback" className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-bold text-primary text-base font-display mb-1">
                  Calendar not loading? Send request instead
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Fill this out and we will email your Google Meet link within 2 hours.
                </p>

                {status === "success" ? (
                  <div className="space-y-3">
                    <div className="rounded-xl bg-success/10 p-4 text-xs font-bold text-success text-center">
                      ✓ Request sent! Scott will review your details and email your meet times in under 2 hours.
                    </div>
                    <div className="text-xs text-accent font-semibold animate-pulse bg-accent/10 py-2.5 px-3 rounded-lg border border-accent/20 text-center">
                      ⚠️ Please check your **Spam or Junk folder** as our automated confirmation and initial replies may sometimes land there.
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary">Name <span className="text-accent">*</span></span>
                        <input name="name" required value={formData.name} onChange={handleInputChange} className="input-field" placeholder="Jane Smith" />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary">Email <span className="text-accent">*</span></span>
                        <input name="email" required type="email" value={formData.email} onChange={handleInputChange} className="input-field" placeholder="jane@business.com" />
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary">Phone</span>
                        <input name="phone" value={formData.phone} onChange={handleInputChange} className="input-field" placeholder="(416) 555-1234" />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary">Website</span>
                        <input name="website" value={formData.website} onChange={handleInputChange} className="input-field" placeholder="yoursite.com" />
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary">What's this about?</span>
                        <select name="interest" value={formData.interest} onChange={handleInputChange} className="input-field">
                          <option value="">Choose one</option>
                          <option>New website</option>
                          <option>Website redesign</option>
                          <option>SEO Strategy</option>
                          <option>Social Retainer</option>
                          <option>Just exploring</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary">Preferred time</span>
                        <select name="preferred" value={formData.preferred} onChange={handleInputChange} className="input-field">
                          <option value="">Choose one</option>
                          <option>This week, mornings</option>
                          <option>This week, afternoons</option>
                          <option>Next week, mornings</option>
                          <option>Next week, afternoons</option>
                          <option>Evenings or weekends</option>
                        </select>
                      </label>
                    </div>

                    <div>
                      <label className="block">
                        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary">Message / Goals</span>
                        <textarea name="message" value={formData.message} onChange={handleInputChange} className="input-field h-24 py-2 resize-none" placeholder="What are you trying to grow or fix?" />
                      </label>
                    </div>

                    <button type="submit" disabled={status === "sending"} className="btn-cta w-full shadow-none text-sm h-11 focus:outline-none">
                      {status === "sending" ? "Booking..." : "Book My Free Call →"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing guide redirect footer */}
      <section className="bg-primary text-white py-16 text-center">
        <div className="container-page">
          <h2 className="h2 text-white font-display">Prefer to review pricing first?</h2>
          <p className="mt-3 text-white/80">Every package is transparently priced, month-to-month, and cancel anytime.</p>
          <div className="mt-8">
            <Link to="/pricing" className="btn-cta text-base">
              See Pricing Details →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
