import { Review, FAQ, PricingPlan } from "./types";

export const WEBSITES_FAQ: FAQ[] = [
  {
    question: "Why is web design separate from SEO?",
    answer: "Because they're different services. The SEO in your build is one-time foundational setup at launch: meta tags, schema, sitemap, GBP claim if you're local, on-page optimization for the pages we build. For ongoing rankings work, content creation, and the stuff that actually moves your map pack and organic positions month over month, see our SEO Retainer plans. Pretending they're the same thing is how agencies hide costs and underdeliver."
  },
  {
    question: "Do you guarantee specific Google rankings?",
    answer: "No. We sell SEO process and effort, not guaranteed rankings. Results vary based on competition, your site's history, and time. Most clients see meaningful improvement in 3–6 months. I can't promise specific positions. Anyone who does is lying."
  },
  {
    question: "Do I have to take an SEO retainer?",
    answer: "Not at all. The Launch SEO Setup that comes with every web design plan is enough for plenty of small businesses, especially in less competitive markets. Clients usually add a retainer when they want to actively grow rankings and outpace competitors who are also investing in SEO."
  },
  {
    question: "What does the monthly web design fee cover?",
    answer: "Hosting on Cloudflare's global CDN, SSL renewal, daily backups, security patches, uptime monitoring, priority same-day support, plus content edits. The monthly fee starts the moment your site is published. Major updates, such as new pages or new functionality, are billed at $100/hour. It does not include ongoing SEO work. That's what the SEO Retainer is for."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes. We can split the setup fee into 2–3 monthly payments for Professional and Custom plans. 50% to start, balance over the next 1–2 months."
  },
  {
    question: "What if I want to cancel?",
    answer: "You can cancel anytime with 30 days notice on any monthly plan: web design, SEO retainer, or social. You keep your domain and we transfer all files to you, including the source code. No ransom, no migration fees."
  },
  {
    question: "How many revisions are included on web design?",
    answer: "Unlimited revisions on every plan. We keep refining until you are happy with the site. Feedback is best sent in one consolidated batch so we can move fast, but there is no cap on rounds or changes."
  },
  {
    question: "What about my domain and email?",
    answer: "We help you set up or transfer your domain. Domain registration ($15–$20/year) and email hosting (Google Workspace at ~$7.20/user/mo) are separate from our pricing because they go directly to those providers. We don't mark them up."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No. The prices on this page are the prices you pay. No setup surprises, no contract lock-in fees, no 'project management surcharges.' If anything is ever out of scope, we tell you the number first and you decide."
  },
  {
    question: "Do you charge HST?",
    answer: "Yes. We're a Canadian business. Invoices for Canadian clients include HST (13% in Ontario). US and international clients are not charged HST."
  }
];

export const PLANS: PricingPlan[] = [
  {
    name: "Starter",
    setupPrice: "499",
    monthlyPrice: "69",
    bestFor: "Solo operators and brand-new small businesses that need a clean web presence.",
    features: [
      "Up to 3 pages",
      "Custom mobile-responsive design",
      "Copywriting included (written by Scott)",
      "Launch SEO Setup: technical SEO, schema, sitemap, GBP claim if local (one-time at launch)",
      "Contact form with notifications",
      "Google Maps integration"
    ],
    slug: "starter"
  },
  {
    name: "Professional",
    setupPrice: "1,895",
    monthlyPrice: "129",
    bestFor: "Most established small businesses, salons, restaurants, contractors, professional services that need to compete on Google.",
    features: [
      "Up to 10 pages",
      "Conversion-optimized custom design",
      "Copywriting included (written by Scott)",
      "Launch SEO Setup + on-page optimization for all 10 pages (one-time at launch)",
      "Lead capture forms",
      "Blog setup + first post",
      "Advanced animations",
      "Priority same-day support"
    ],
    slug: "professional"
  },
  {
    name: "Custom",
    setupPrice: "2,895",
    monthlyPrice: "199",
    bestFor: "Multi-location businesses, e-commerce, and complex booking or membership builds.",
    features: [
      "Multi-location ready",
      "Fully custom design and build",
      "Copywriting included (written by Scott)",
      "Advanced technical SEO + competitive on-page strategy (one-time at launch)",
      "E-commerce / booking integration",
      "CRM, scheduling, payment integrations",
      "Advanced animations & custom interactions",
      "Same-day dedicated emergency support"
    ],
    slug: "custom"
  }
];

export const SOCIAL_PLANS = [
  {
    name: "Starter Social",
    price: "400",
    setup: "300",
    bestFor: "Single-platform consistency for solo operators and new small businesses.",
    features: [
      "1 platform",
      "12 posts/month",
      "Custom captions + branded graphics",
      "Hashtag research",
      "Monthly performance report",
      "Unlimited revisions"
    ],
    slug: "starter-social"
  },
  {
    name: "Growth Social",
    price: "800",
    setup: "400",
    bestFor: "Established small businesses ready to compound on 2 platforms with Reels.",
    features: [
      "2 platforms",
      "20 posts/month",
      "4 Reels/month (you provide clips)",
      "Stories content",
      "Light community management",
      "Monthly strategy call",
      "Performance metrics review",
      "Social ads consulting"
    ],
    slug: "growth-social"
  },
  {
    name: "Authority Social",
    price: "1,500",
    setup: "500",
    bestFor: "Multi-platform brand presence for businesses ready to scale.",
    features: [
      "3 platforms",
      "30 posts/month",
      "8 Reels/month (you provide clips)",
      "Bi-weekly strategy calls",
      "Competitor deep-dives",
      "Priority support",
      "Full community interaction",
      "Custom analytics dashboard"
    ],
    slug: "authority-social"
  }
];

export const ADD_ONS = [
  { name: "Additional pages", desc: "Beyond your plan limit", price: "$150/page · $100/page when buying 3+" },
  { name: "Logo only", desc: "Single logo mark, ready for web and print", price: "$300" },
  { name: "Logo + brand identity", desc: "Logo, colour system, typography", price: "$500" },
  { name: "Full brand package", desc: "Logo system + brand guidelines + social templates", price: "$800" },
  { name: "Custom functionality", desc: "Booking, e-commerce, member portals, calculators, integrations", price: "$300+" },
  { name: "Rush delivery (under 5 days)", desc: "We push your project to the front of the queue", price: "+25% on setup" },
  { name: "Paid social ads management", desc: "Add-on to any Social plan", price: "$300/mo + ad spend" }
];

export const REVIEWS: Review[] = [
  {
    id: "rev1",
    author: "Arthur Collins",
    role: "Lakeland Millwork",
    badge: "2.5x increase in design inquiries",
    text: "Scott transformed our website into a streamlined, high-end digital portfolio. He not only elevated our look and branding but also made it extremely easy for custom builders to request quotes, drastically increasing our inquiry volume.",
    rating: 5,
    timeAgo: "37 weeks ago",
    businessName: "Lakeland Millwork · Muskoka"
  },
  {
    id: "rev2",
    author: "Erin Greaves",
    role: "Clinic Owner",
    badge: "Created an amazing clinic website",
    text: "I can't recommend Scott highly enough! He created an amazing website for my clinic that exceeded all of my expectations from start to finish. He was professional, incredibly responsive, and worked efficiently to have everything completed much faster than I expected. What really stood out was his ongoing support. Whenever I had questions or needed changes, Scott was always there to help and made the entire process stress-free.",
    rating: 5,
    timeAgo: "1 week ago",
    businessName: "Greaves Physiotherapy · Toronto"
  },
  {
    id: "rev3",
    author: "Filomena",
    role: "Small Business Owner",
    badge: "Quick turnaround on updates",
    text: "I've worked with Scott from Elevate Web to rebuild my website and appreciated the responsiveness and quick turnaround on updates. Changes are handled efficiently, with a willingness to incorporate feedback throughout the process. A good option for small business owners looking for an economical solution.",
    rating: 5,
    timeAgo: "4 weeks ago",
    businessName: "L'Unico Salon · Mississauga"
  },
  {
    id: "rev4",
    author: "Brynn McKintuck",
    role: "Small Business Owner",
    badge: "Delivered way faster than expected",
    text: "Hired Elevate Web to build our site and honestly couldn't be happier with how it turned out. Scott was easy to work with, understood what we needed without a ton of back and forth, and delivered way faster than we expected. The site looks clean and professional, and we've already had customers mention it. Would definitely recommend.",
    rating: 5,
    timeAgo: "7 weeks ago",
    businessName: "McKintuck Consulting · Calgary"
  },
  {
    id: "rev5",
    author: "Susan Morgan",
    role: "Small Business Owner",
    badge: "Ranking on page 1 of Google",
    text: "Scott completed a professional website that accurately reflected our brand. The website is ranking on the first page of google and we appreciate Elevate Web's hard work on this project.",
    rating: 5,
    timeAgo: "8 weeks ago",
    businessName: "Morgan Accountants · Toronto"
  },
  {
    id: "rev6",
    author: "John Borra",
    role: "John Borra Music",
    badge: "Highly professional service",
    text: "I'm very pleased with the work Scott did retooling my website. He is skilled, professional, reasonably priced and everything was done in a timely fashion. I would work with him again and refer him to others.",
    rating: 5,
    timeAgo: "5 weeks ago",
    businessName: "John Borra Music · Toronto"
  },
  {
    id: "rev7",
    author: "Michael Francis",
    role: "Small Business Owner",
    badge: "Super nice and immediate response",
    text: "Great experience! Always gets back to me right away. Super nice to deal with!",
    rating: 5,
    timeAgo: "7 weeks ago",
    businessName: "Francis Contractors · Ottawa"
  },
  {
    id: "rev8",
    author: "T G",
    role: "Local Guide",
    badge: "Outstanding experience and communication",
    text: "Elevate Web provided an outstanding experience from start to finish. Scott was professional, responsive, and delivered exactly what they promised. The website looks fantastic, performs well, and exceeded my expectations. Communication was excellent throughout the process.",
    rating: 5,
    timeAgo: "1 week ago",
    businessName: "Local Guide · Toronto"
  },
  {
    id: "rev9",
    author: "Derek Gu",
    role: "Small Business Owner",
    badge: "Fast execution",
    text: "Scott made sure to listen to my needs and provided me with a catered website that met them. Very professional yet personable who gets the job done fast.",
    rating: 5,
    timeAgo: "9 weeks ago",
    businessName: "Gu Trades · Toronto"
  },
  {
    id: "rev10",
    author: "David Brown",
    role: "Small Business Owner",
    badge: "Verified Google Rating",
    text: "Frankly the best experience I have had working with any web team. Scott communicates clearly, responds within hours, and built a blazing fast site for my retail shop.",
    rating: 5,
    timeAgo: "38 weeks ago",
    businessName: "Out of the Woods · Canada"
  }
];
