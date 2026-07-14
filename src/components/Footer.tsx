import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="group flex items-center gap-1 font-display font-extrabold tracking-tight text-white">
              <svg className="h-6 w-6 shrink-0" fill="none" stroke="#FF6B35" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M17 11 L12 6 L7 11" />
                <path d="M17 17 L12 12 L7 17" />
              </svg>
              <span className="text-white text-lg">
                Buildora
                <span className="text-accent">.</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Fast, custom websites and foundational SEO for small businesses in Canada and the US.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a className="hover:text-accent transition-colors" href="tel:+14378309393">
                  (437) 830-9393
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <a className="hover:text-accent transition-colors" href="mailto:contact@buildora.ca">
                  contact@buildora.ca
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link className="transition-colors hover:text-accent" to="/web-design-services">
                  Web Design Services
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-accent" to="/website-redesign">
                  Website Redesign
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-accent" to="/website-maintenance">
                  Website Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Industries
            </h3>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-white/70">
              {["Salons", "Barbershops", "Nail Salons", "Spas", "Restaurants", "Cafes", "Contractors", "Plumbers", "Electricians", "Dentists", "Lawyers", "Accountants"].map((ind) => (
                <li key={ind}>
                  <Link className="transition-colors hover:text-accent" to={`/websites-for-${ind.toLowerCase().replace(" ", "-")}`}>
                    {ind}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Locations */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Locations
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              {["Toronto", "Mississauga", "Brampton", "Calgary", "Ottawa"].map((loc) => (
                <li key={loc}>
                  <Link className="transition-colors hover:text-accent" to={`/web-design-${loc.toLowerCase()}`}>
                    {loc}
                  </Link>
                </li>
              ))}
              <li>
                <span className="text-white/40 text-xs">Serving Canada & US</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Company */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link className="transition-colors hover:text-accent" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-accent" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="transition-colors hover:text-accent" to="/free-homepage-design">
                  Free Homepage Design
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Referral notice */}
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/70">
          <p>
            Referring a client?{" "}
            <Link className="font-semibold text-accent hover:underline" to="/contact">
              Let's talk about our referral program
            </Link>{" "}
            — 10% on signed projects, paid immediately on final invoice.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 text-sm text-white/60 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-white/5 pt-4">
          <p>© {currentYear} Buildora. Toronto-based, serving small businesses across Canada and the US.</p>
          <p className="text-xs text-white/50 flex gap-2.5">
            <Link className="hover:text-accent" to="/privacy">Privacy</Link>
            <span>·</span>
            <Link className="hover:text-accent" to="/terms">Terms</Link>
            <span>·</span>
            <Link className="hover:text-accent text-accent font-semibold" to="/admin">Admin Panel</Link>
            <span>·</span>
            <Link className="hover:text-accent" to="/faq">FAQ</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
