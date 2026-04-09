import { Button } from "@/components/ui/button";
import { Link, useSearch } from "@tanstack/react-router";
import { ArrowLeft, ShoppingCart, XCircle } from "lucide-react";

export default function CheckoutCancelPage() {
  const search = useSearch({ strict: false }) as Record<string, string>;
  const courseIdStr = search?.courseId ?? "";

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 bg-background">
      <div className="w-full max-w-md text-center">
        {/* Cancel icon */}
        <div className="inline-flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <XCircle className="w-10 h-10 text-muted-foreground" />
          </div>
        </div>

        <h1 className="text-3xl font-display font-bold text-foreground mb-3">
          Checkout Cancelled
        </h1>

        <p className="text-muted-foreground leading-relaxed mb-8">
          No worries — your payment was not processed and nothing has been
          charged. You can go back and complete your purchase whenever you're
          ready.
        </p>

        {/* Reassurance card */}
        <div className="p-5 rounded-2xl bg-muted/50 border border-border mb-8 text-left space-y-3">
          <p className="text-sm font-semibold text-foreground">
            What you can do next:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Return to the course page and try enrolling again
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              Browse the full course catalog and find other courses
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              No charges were made to your card
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {courseIdStr ? (
            <Link to="/courses/$id" params={{ id: courseIdStr }}>
              <Button
                size="lg"
                className="gap-2 w-full sm:w-auto"
                data-ocid="back-to-course-btn"
              >
                <ShoppingCart className="w-4 h-4" />
                Back to Course
              </Button>
            </Link>
          ) : (
            <Link to="/">
              <Button
                size="lg"
                className="gap-2 w-full sm:w-auto"
                data-ocid="browse-courses-btn"
              >
                <ShoppingCart className="w-4 h-4" />
                Browse Courses
              </Button>
            </Link>
          )}
          <Link to="/">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 w-full sm:w-auto"
              data-ocid="view-catalog-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              Course Catalog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
