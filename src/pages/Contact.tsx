import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { createSubmission } from "../supabase";
import { sendConfirmationEmail } from "../emailjs";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("sending");
    try {
      await createSubmission({
        type: "contact",
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message
      });

      await sendConfirmationEmail({
        to_email: formData.email,
        to_name: formData.name,
        subject: "Message Received - Buildora",
        message: `Hi ${formData.name},\n\nThank you for reaching out to Buildora! We have successfully received your inquiry message:\n\n"${formData.message}"\n\nScott will review your message and email or call you shortly (usually within 2 hours).\n\nBest regards,\nScott Martin\nBuildora Team\ncontact@buildora.ca`
      });

      setStatus("success");
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("success");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-14 text-primary select-text overflow-hidden">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container-page py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <span>Contact</span>
        </div>
      </div>

      <section className="relative overflow-hidden bg-white py-12 lg:py-16">
        <div className="absolute inset-0 -z-10 opacity-55" style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(255,107,53,0.12), transparent 70%)" }}></div>
        
        <div className="container-page max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column info */}
            <motion.div 
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-6"
            >
              <span className="eyebrow">Get In Touch</span>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-primary font-display md:text-4xl">
                Let's Talk About Your Project
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Have questions about our setup timelines, monthly packages, or search ranking strategies? Send us a direct line and Scott will get back to you within 2 hours.
              </p>

              <div className="space-y-4 pt-6 border-t border-border">
                <div className="flex gap-3 text-sm">
                  <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Call or Text</div>
                    <a href="tel:+14378309393" className="text-accent hover:underline">(437) 830-9393</a>
                  </div>
                </div>

                <div className="flex gap-3 text-sm">
                  <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <a href="mailto:contact@buildora.ca" className="text-accent hover:underline">contact@buildora.ca</a>
                  </div>
                </div>

                <div className="flex gap-3 text-sm">
                  <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Office Base</div>
                    <span className="text-muted-foreground">East York, Toronto, Ontario</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column Form */}
            <motion.div 
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8"
            >
              {status === "success" ? (
                <div className="text-center py-12 space-y-4">
                  <div className="inline-flex h-12 w-12 place-items-center rounded-full bg-success/15 text-success justify-center">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-primary">Inquiry Sent Successfully!</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Hi {formData.name}, thank you for reaching out. We have received your inquiry and Scott will email you a response at <span className="font-semibold text-primary">{formData.email}</span> within 2 hours.
                  </p>
                  <p className="text-xs text-accent font-semibold mt-2 animate-pulse bg-accent/10 py-2.5 px-4 rounded-xl border border-accent/20">
                    ⚠️ Please check your **Spam or Junk folder** as our automated confirmation and initial replies may sometimes land there.
                  </p>
                  <Link to="/" className="btn-cta h-11 text-xs mt-6">
                    Return to Homepage
                  </Link>
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

                  <div>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary">Phone</span>
                      <input name="phone" value={formData.phone} onChange={handleInputChange} className="input-field" placeholder="(416) 555-1234" />
                    </label>
                  </div>

                  <div>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-primary">Message <span className="text-accent">*</span></span>
                      <textarea name="message" required value={formData.message} onChange={handleInputChange} className="input-field h-32 py-2 resize-none" placeholder="How can we help your business today?" />
                    </label>
                  </div>

                  <button type="submit" disabled={status === "sending"} className="btn-cta w-full shadow-none text-sm h-11 focus:outline-none">
                    {status === "sending" ? "Sending..." : "Send Message"}
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Free Homepage mockup alert bottom block */}
      <section className="bg-primary text-white py-16 text-center overflow-hidden">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="h2 text-white font-display">Get a custom mockup, free.</h2>
            <p className="mt-3 text-white/80">
              Within 48 hours of our meeting, we design and reveal a tailored custom homepage mockup of your new site.
            </p>
            <div className="mt-8">
              <Link to="/free-homepage-design" className="btn-cta text-base">
                Get My Free Mockup Design
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
