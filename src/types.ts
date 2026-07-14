export interface Review {
  id: string;
  author: string;
  role: string;
  badge?: string;
  text: string;
  rating: number;
  timeAgo: string;
  businessName: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PricingPlan {
  name: string;
  setupPrice: string;
  monthlyPrice: string;
  bestFor: string;
  features: string[];
  slug: string;
}
