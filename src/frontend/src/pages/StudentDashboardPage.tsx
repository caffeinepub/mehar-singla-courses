import type { Backend } from "@/backend";
import {
  type CourseLevel as BackendCourseLevel,
  type ProgressStatus as BackendProgressStatus,
  createActor,
} from "@/backend";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import type { Course, Enrollment, ProgressStatus } from "@/types";
import { getLevelLabel } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock,
  GraduationCap,
  Layers,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ── adapters ──────────────────────────────────────────────────────────────────

function adaptProgressStatus(s: BackendProgressStatus): ProgressStatus {
  return { __kind__: s as unknown as ProgressStatus["__kind__"] };
}

function adaptCourseLevel(
  l: BackendCourseLevel,
): import("@/types").CourseLevel {
  return {
    __kind__: l as unknown as import("@/types").CourseLevel["__kind__"],
  };
}

function adaptEnrollments(raw: import("@/backend").Enrollment[]): Enrollment[] {
  return raw.map((e) => ({
    ...e,
    progressStatus: adaptProgressStatus(e.progressStatus),
  }));
}

function adaptCourses(raw: import("@/backend").Course[]): Course[] {
  return raw.map((c) => ({
    ...c,
    level: adaptCourseLevel(c.level),
  }));
}

// ── helpers ──────────────────────────────────────────────────────────────────

const progressConfig: Record<
  ProgressStatus["__kind__"],
  {
    label: string;
    variant: "default" | "secondary" | "outline";
    icon: React.ReactNode;
    color: string;
  }
> = {
  NotStarted: {
    label: "Not Started",
    variant: "secondary",
    icon: <BookOpen className="w-3 h-3" />,
    color: "text-muted-foreground",
  },
  InProgress: {
    label: "In Progress",
    variant: "default",
    icon: <Clock className="w-3 h-3" />,
    color: "text-primary",
  },
  Completed: {
    label: "Completed",
    variant: "outline",
    icon: <CheckCircle2 className="w-3 h-3" />,
    color: "text-accent-foreground",
  },
};

const PROGRESS_OPTIONS: ProgressStatus["__kind__"][] = [
  "NotStarted",
  "InProgress",
  "Completed",
];

// ── sub-components ────────────────────────────────────────────────────────────

function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full h-44" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 flex-1" />
        </div>
      </div>
    </Card>
  );
}

function ProgressDropdown({
  courseId,
  current,
  onUpdate,
  isUpdating,
}: {
  courseId: bigint;
  current: ProgressStatus;
  onUpdate: (courseId: bigint, status: ProgressStatus["__kind__"]) => void;
  isUpdating: boolean;
}) {
  const [open, setOpen] = useState(false);
  const cfg = progressConfig[current.__kind__];

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 text-xs"
        onClick={() => setOpen((v) => !v)}
        disabled={isUpdating}
        data-ocid="progress-dropdown-trigger"
        aria-label="Change progress status"
        aria-expanded={open}
      >
        {isUpdating ? (
          <LoadingSpinner size="sm" />
        ) : (
          <>
            <span className={cfg.color}>{cfg.icon}</span>
            <span>{cfg.label}</span>
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </>
        )}
      </Button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1 z-10 bg-card border border-border rounded-md shadow-elevated overflow-hidden min-w-36"
          onBlur={() => setOpen(false)}
        >
          {PROGRESS_OPTIONS.map((opt) => {
            const optCfg = progressConfig[opt];
            const isActive = current.__kind__ === opt;
            return (
              <button
                key={opt}
                type="button"
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors duration-150 hover:bg-muted ${
                  isActive ? "bg-muted font-medium" : ""
                }`}
                onClick={() => {
                  onUpdate(courseId, opt);
                  setOpen(false);
                }}
                data-ocid={`progress-option-${opt.toLowerCase()}`}
              >
                <span className={optCfg.color}>{optCfg.icon}</span>
                {optCfg.label}
                {isActive && (
                  <CheckCircle2 className="w-3 h-3 ml-auto text-primary" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EnrolledCourseCard({
  course,
  enrollment,
  onUpdateProgress,
  isUpdating,
  index,
}: {
  course: Course;
  enrollment: Enrollment;
  onUpdateProgress: (
    courseId: bigint,
    status: ProgressStatus["__kind__"],
  ) => void;
  isUpdating: boolean;
  index: number;
}) {
  const cfg = progressConfig[enrollment.progressStatus.__kind__];
  const level = getLevelLabel(course.level);

  const progressPercent =
    enrollment.progressStatus.__kind__ === "Completed"
      ? 100
      : enrollment.progressStatus.__kind__ === "InProgress"
        ? 50
        : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
    >
      <Card className="overflow-hidden card-hover group flex flex-col h-full">
        {/* Thumbnail */}
        <div className="relative overflow-hidden bg-muted h-44">
          {course.thumbnailUrl ? (
            <img
              src={course.thumbnailUrl}
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center hero-gradient">
              <GraduationCap className="w-12 h-12 text-primary/40" />
            </div>
          )}
          {/* progress bar overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-card/40">
            <div
              className="h-full bg-primary transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {/* Status badge overlay */}
          <div className="absolute top-2 right-2">
            <Badge
              variant={cfg.variant}
              className="flex items-center gap-1 text-xs backdrop-blur-sm"
              data-ocid="course-progress-badge"
            >
              {cfg.icon}
              {cfg.label}
            </Badge>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          <div className="flex-1">
            <h3 className="font-display text-base font-semibold text-foreground leading-snug line-clamp-2 mb-1">
              {course.title}
            </h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                {level}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {Number(course.durationHours)}h
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {Number(course.modulesCount)} modules
              </span>
            </div>
          </div>

          {/* Actions row */}
          <div className="flex items-center gap-2 pt-1">
            <ProgressDropdown
              courseId={course.id}
              current={enrollment.progressStatus}
              onUpdate={onUpdateProgress}
              isUpdating={isUpdating}
            />
            <a
              href={course.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
              data-ocid="continue-course-btn"
            >
              <Button
                variant="default"
                size="sm"
                className="w-full gap-1.5 text-xs"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                Continue
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ── main page ─────────────────────────────────────────────────────────────────

export default function StudentDashboardPage() {
  const { identity, principal } = useAuth();
  const { actor, isFetching } = useActor<Backend>(createActor);
  const queryClient = useQueryClient();

  const isReady = !!actor && !isFetching;

  // Fetch enrollments
  const { data: enrollments = [], isLoading: enrollmentsLoading } = useQuery<
    Enrollment[]
  >({
    queryKey: ["myEnrollments", principal?.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return adaptEnrollments(await actor.getMyEnrollments());
    },
    enabled: isReady && !!identity,
  });

  // Fetch all courses
  const { data: allCourses = [], isLoading: coursesLoading } = useQuery<
    Course[]
  >({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      return adaptCourses(await actor.listCourses());
    },
    enabled: isReady,
  });

  // Update progress mutation
  const [updatingCourseId, setUpdatingCourseId] = useState<bigint | null>(null);

  const updateProgressMutation = useMutation({
    mutationFn: async ({
      courseId,
      status,
    }: {
      courseId: bigint;
      status: ProgressStatus["__kind__"];
    }) => {
      if (!actor) throw new Error("Not authenticated");
      const backendStatus = status as unknown as BackendProgressStatus;
      return actor.updateMyProgressStatus(courseId, backendStatus);
    },
    onMutate: ({ courseId }) => setUpdatingCourseId(courseId),
    onSettled: () => {
      setUpdatingCourseId(null);
      queryClient.invalidateQueries({ queryKey: ["myEnrollments"] });
    },
  });

  const handleUpdateProgress = (
    courseId: bigint,
    status: ProgressStatus["__kind__"],
  ) => {
    updateProgressMutation.mutate({ courseId, status });
  };

  // Merge enrollments with course data
  const courseMap = new Map(allCourses.map((c) => [c.id.toString(), c]));
  const enrolledCourses = enrollments
    .map((e) => ({
      enrollment: e,
      course: courseMap.get(e.courseId.toString()),
    }))
    .filter(
      (item): item is { enrollment: Enrollment; course: Course } =>
        item.course !== undefined,
    );

  const isLoading = enrollmentsLoading || coursesLoading;

  const displayName = principal
    ? `${principal.toString().slice(0, 5)}...${principal.toString().slice(-3)}`
    : "Student";

  const completedCount = enrolledCourses.filter(
    (ec) => ec.enrollment.progressStatus.__kind__ === "Completed",
  ).length;
  const inProgressCount = enrolledCourses.filter(
    (ec) => ec.enrollment.progressStatus.__kind__ === "InProgress",
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Learning Dashboard</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                My Courses
              </h1>
              <p className="text-sm text-muted-foreground mt-1 font-mono truncate max-w-xs">
                {displayName}
              </p>
            </div>

            {/* Stats */}
            {!isLoading && enrolledCourses.length > 0 && (
              <div className="flex gap-4 sm:gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground font-display">
                    {enrolledCourses.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Enrolled</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary font-display">
                    {inProgressCount}
                  </p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground font-display">
                    {completedCount}
                  </p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="courses-loading"
          >
            {(["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((id) => (
              <CourseCardSkeleton key={id} />
            ))}
          </div>
        ) : enrolledCourses.length === 0 ? (
          // Empty state
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="empty-state"
          >
            <div className="w-20 h-20 rounded-2xl hero-gradient flex items-center justify-center mb-5 shadow-card">
              <Sparkles className="w-9 h-9 text-primary" />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              You haven't enrolled in any courses yet.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Explore our catalog and find a course that sparks your curiosity.
            </p>
            <Link to="/" data-ocid="browse-catalog-link">
              <Button className="gap-2">
                <BookOpen className="w-4 h-4" />
                Browse courses
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="enrolled-courses-grid"
          >
            {enrolledCourses.map(({ course, enrollment }, idx) => (
              <EnrolledCourseCard
                key={course.id.toString()}
                course={course}
                enrollment={enrollment}
                onUpdateProgress={handleUpdateProgress}
                isUpdating={updatingCourseId === course.id}
                index={idx}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
