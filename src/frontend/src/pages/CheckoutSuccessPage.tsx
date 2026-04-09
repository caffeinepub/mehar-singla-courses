import { PageLoader } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useBackend } from "@/hooks/useBackend";
import type { Course } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  LayoutDashboard,
} from "lucide-react";
import { useEffect } from "react";

export default function CheckoutSuccessPage() {
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();

  const search = useSearch({ strict: false }) as Record<string, string>;
  const courseIdStr = search?.courseId ?? "";
  const sessionId = search?.session_id ?? "";

  const courseId = courseIdStr ? BigInt(courseIdStr) : null;

  const enrollMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !courseId || !sessionId) return;
      await actor.enrollAfterPayment(courseId, sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrolled"] });
      queryClient.invalidateQueries({ queryKey: ["myEnrollments"] });
    },
  });

  const { mutate: doEnroll, isPending, isSuccess, isError } = enrollMutation;

  useEffect(() => {
    if (
      isReady &&
      sessionId &&
      courseId &&
      !isPending &&
      !isSuccess &&
      !isError
    ) {
      doEnroll();
    }
  }, [isReady, sessionId, courseId, isPending, isSuccess, isError, doEnroll]);

  const { data: course, isLoading: courseLoading } = useQuery<Course | null>({
    queryKey: ["course", courseIdStr],
    queryFn: async () => {
      if (!actor || !courseId) return null;
      return actor.getCourse(courseId) as Promise<Course | null>;
    },
    enabled: isReady && !!courseId,
  });

  if (!isReady || courseLoading) return <PageLoader />;

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 bg-background">
      <div className="w-full max-w-lg text-center">
        {/* Animated success ring */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div
            className="absolute w-28 h-28 rounded-full bg-primary/10 animate-ping"
            style={{ animationDuration: "2s" }}
          />
          <div className="relative w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl font-display font-bold text-foreground mb-3">
          You're Enrolled! 🎉
        </h1>

        {course && (
          <div className="my-6 px-6 py-4 rounded-2xl bg-card border border-border shadow-card">
            <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">
              Course
            </p>
            <p className="text-lg font-semibold text-foreground">
              {course.title}
            </p>
          </div>
        )}

        <p className="text-muted-foreground leading-relaxed mb-8">
          Your payment was successful and you now have full access to this
          course. Head to your dashboard to start learning.
        </p>

        {enrollMutation.isError && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive">
            Enrollment may be pending. Please visit your dashboard — if the
            course doesn't appear, contact support.
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard">
            <Button
              size="lg"
              className="gap-2 w-full sm:w-auto"
              data-ocid="go-to-dashboard-btn"
            >
              <LayoutDashboard className="w-4 h-4" />
              Go to Dashboard
            </Button>
          </Link>
          {course && courseIdStr && (
            <Link to="/courses/$id" params={{ id: courseIdStr }}>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 w-full sm:w-auto"
                data-ocid="start-learning-btn"
              >
                <BookOpen className="w-4 h-4" />
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          A confirmation of your purchase will appear in your dashboard.
        </p>
      </div>
    </div>
  );
}
