import { Star } from "lucide-react";
import { Review } from "../types";
import { REVIEWS } from "../data";

interface ReviewsListProps {
  limit?: number;
  featuredOnly?: boolean;
}

export default function ReviewsList({ limit, featuredOnly }: ReviewsListProps) {
  let reviewsToShow = REVIEWS;

  if (featuredOnly) {
    reviewsToShow = REVIEWS.filter((r) => r.badge);
  }

  if (limit) {
    reviewsToShow = reviewsToShow.slice(0, limit);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {reviewsToShow.map((rev) => (
        <article
          key={rev.id}
          className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex gap-0.5 text-accent">
              {Array.from({ length: rev.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{rev.timeAgo}</span>
          </div>

          <p className="mt-4 flex-1 text-[15px] leading-relaxed text-primary select-text">
            "{rev.text}"
          </p>

          {rev.badge && (
            <div className="mt-3 inline-flex w-fit rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">
              {rev.badge}
            </div>
          )}

          <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-bold text-white uppercase">
              {rev.author[0]}
            </div>
            <div className="text-sm">
              <div className="font-semibold text-primary">{rev.author}</div>
              <div className="text-xs text-muted-foreground">
                {rev.role} · {rev.timeAgo}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
