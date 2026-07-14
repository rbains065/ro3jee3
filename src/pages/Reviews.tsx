import { Link } from "react-router-dom";
import { Star, MessageSquare, ArrowRight, ExternalLink } from "lucide-react";
import ReviewsList from "../components/ReviewsList";

export default function Reviews() {
  return (
    <div className="pt-14">
      {/* breadcrumb */}
      <div className="border-b border-border bg-surface">
        <div className="container-page py-3 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-accent">Home</Link>
          <span className="mx-2">/</span>
          <span>Reviews</span>
        </div>
      </div>

      {/* Header section */}
      <section className="bg-primary text-white py-16 md:py-24 text-center">
        <div className="container-page max-w-3xl">
          <span className="eyebrow !bg-accent/20">Verified Google Reviews</span>
          <h1 className="h1 mt-4 text-white">29 small businesses, 5.0★ average.</h1>
          <p className="mt-5 text-base md:text-lg text-white/85 leading-relaxed">
            Every review below represents verified, unedited feedback from small business owners across Canada and the US. Click through to read them on our public Google Business Profile.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold">
              <span className="flex text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </span>
              <span>5.0 Average · 29 Reviews</span>
            </div>
            <a
              href="https://www.google.com/search?q=Elevate+Web+Design+Toronto+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 underline decoration-accent hover:text-white underline-offset-4"
            >
              View profile on Google
              <ExternalLink className="h-4 w-4 shrink-0 text-accent" />
            </a>
          </div>
        </div>
      </section>

      {/* Full reviews grid */}
      <section className="section-y bg-white">
        <div className="container-page space-y-12">
          
          <ReviewsList />

          {/* Sticky middle helper widget */}
          <div className="rounded-2xl border border-border bg-surface/50 p-6 sm:p-8 text-center max-w-3xl mx-auto">
            <p className="text-lg font-bold text-primary font-display">
              Want results like these for your business?
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Book a free Google Meet. Within 48 hours of our call, we will reveal a bespoke homepage design built around your services. No deposit, no contracts.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Link to="/free-homepage-design" className="btn-cta text-sm h-11">
                Get My Free Mockup
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/discovery-call" className="btn-outline text-sm h-11 py-0">
                Or book design call →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compounding results section */}
      <section className="section-y bg-surface">
        <div className="container-page text-center">
          <h2 className="h2 text-primary">Ready to be our next 5-star review?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
            Fast custom websites starting at CA$499, live in 3 to 10 days. Compounding local map pack SEO, and offline-ready social setups. Month-to-month cancel anytime.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/free-homepage-design" className="btn-cta text-base">
              Get a Free Homepage Mockup
            </Link>
            <Link to="/discovery-call" className="btn-outline text-base">
              Or Book a Free Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
