import { PageLoader } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useBackend } from "@/hooks/useBackend";
import { formatPrice, getLevelLabel } from "@/types";
import type { Course } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  BarChart2,
  BookOpen,
  ChevronRight,
  Clock,
  PlayCircle,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";
import { toast } from "sonner";

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "bg-primary/10 text-primary",
  Intermediate: "bg-accent/10 text-accent",
  Advanced: "bg-secondary text-secondary-foreground",
};

function CourseStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function CourseDetailPage() {
  const { id } = useParams({ from: "/courses/$id" });
  const { actor, isReady } = useBackend();
  const { isAuthenticated, login } = useAuth();

  const courseId = BigInt(id);

  const {
    data: course,
    isLoading: courseLoading,
    error: courseError,
  } = useQuery<Course | null>({
    queryKey: ["course", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCourse(courseId) as Promise<Course | null>;
    },
    enabled: isReady,
  });

  const { data: isEnrolled, isLoading: enrollLoading } = useQuery<boolean>({
    queryKey: ["enrolled", id, isAuthenticated],
    queryFn: async () => {
      if (!actor || !isAuthenticated) return false;
      return actor.isEnrolledInCourse(courseId);
    },
    enabled: isReady && isAuthenticated,
  });

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const origin = window.location.origin;
      const successUrl = `${origin}/checkout/success?courseId=${id}`;
      const cancelUrl = `${origin}/checkout/cancel?courseId=${id}`;
      return actor.createCourseCheckoutSession(courseId, successUrl, cancelUrl);
    },
    onSuccess: (checkoutUrl: string) => {
      window.location.href = checkoutUrl;
    },
    onError: () => {
      toast.error("Failed to start checkout. Please try again.");
    },
  });

  if (courseLoading || !isReady) return <PageLoader />;

  if (courseError || course === null || course === undefined) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-3">
            Course Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            This course doesn't exist or may have been removed.
          </p>
          <Link to="/">
            <Button variant="default" data-ocid="course-not-found-back">
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const levelLabel = getLevelLabel(course.level);
  const levelColorClass = LEVEL_COLORS[levelLabel] ?? LEVEL_COLORS.Beginner;

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground transition-colors">
              Courses
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground truncate max-w-xs">
              {course.title}
            </span>
          </nav>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left: Course Info */}
            <div className="lg:col-span-3 space-y-5">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColorClass}`}
                >
                  {levelLabel}
                </span>
                <div className="flex items-center gap-1 text-accent">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1 font-medium">
                    4.9
                  </span>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground leading-tight">
                {course.title}
              </h1>

              <p className="text-muted-foreground text-base leading-relaxed line-clamp-4">
                {course.description}
              </p>

              {/* Instructor */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Instructor</p>
                  <Link
                    to="/profile"
                    className="text-sm font-semibold text-primary hover:underline"
                    data-ocid="instructor-profile-link"
                  >
                    Mehar Singla
                  </Link>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <CourseStat
                  icon={Clock}
                  label="Duration"
                  value={`${Number(course.durationHours)}h`}
                />
                <CourseStat
                  icon={BookOpen}
                  label="Modules"
                  value={String(Number(course.modulesCount))}
                />
                <CourseStat icon={BarChart2} label="Level" value={levelLabel} />
              </div>
            </div>

            {/* Right: Enrollment Card */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-background shadow-elevated overflow-hidden sticky top-6">
                {/* Thumbnail */}
                {course.thumbnailUrl ? (
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-primary/40" />
                  </div>
                )}

                <div className="p-6 space-y-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-display font-bold text-foreground">
                      {formatPrice(course.price)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      One-time payment
                    </span>
                  </div>

                  {/* Action button */}
                  {!isAuthenticated ? (
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={login}
                      data-ocid="login-to-enroll-btn"
                    >
                      Login to Enroll
                    </Button>
                  ) : enrollLoading ? (
                    <Button className="w-full" size="lg" disabled>
                      Checking enrollment…
                    </Button>
                  ) : isEnrolled ? (
                    <a
                      href={course.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className="w-full"
                        size="lg"
                        data-ocid="access-course-btn"
                      >
                        <PlayCircle className="w-5 h-5 mr-2" />
                        Access Course
                      </Button>
                    </a>
                  ) : (
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => checkoutMutation.mutate()}
                      disabled={checkoutMutation.isPending}
                      data-ocid="enroll-now-btn"
                    >
                      {checkoutMutation.isPending
                        ? "Redirecting…"
                        : "Enroll Now"}
                    </Button>
                  )}

                  <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center pt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Secure checkout powered by Stripe</span>
                  </div>

                  <Separator />

                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      {Number(course.durationHours)} hours of on-demand content
                    </li>
                    <li className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary shrink-0" />
                      {Number(course.modulesCount)} structured modules
                    </li>
                    <li className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                      Lifetime access after enrollment
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="bg-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-8">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                About This Course
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base whitespace-pre-wrap">
                {course.description}
              </p>
            </div>

            <Separator />

            {/* About Instructor */}
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                Your Instructor
              </h2>
              <div className="flex items-start gap-5 p-6 rounded-2xl bg-card border border-border shadow-card">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div className="min-w-0">
                  <Link
                    to="/profile"
                    className="text-lg font-display font-semibold text-primary hover:underline"
                    data-ocid="instructor-section-link"
                  >
                    Mehar Singla
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    Technical Trainer & Course Creator
                  </p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    Mehar Singla is an experienced technical trainer
                    specializing in modern software development. With a passion
                    for teaching, Mehar has helped hundreds of students level up
                    their skills.
                  </p>
                  <Link to="/profile">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      data-ocid="view-instructor-profile-btn"
                    >
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
