import { c as createLucideIcon, e as useAuth, h as useActor, i as useQueryClient, u as useQuery, r as reactExports, j as jsxRuntimeExports, G as GraduationCap, f as Link, a as Button, B as BookOpen, L as LoadingSpinner, k as createActor } from "./index-Dr1RbTL8.js";
import { B as Badge } from "./badge-CJhb3eiL.js";
import { m as motion, C as Card } from "./proxy-pgrf710f.js";
import { S as Skeleton } from "./skeleton-CoMKRjPQ.js";
import { g as getLevelLabel } from "./types-DHh7mi64.js";
import { u as useMutation } from "./useMutation-BeUdWC28.js";
import { S as Sparkles } from "./sparkles-MmiA3Sc4.js";
import { C as Clock } from "./clock-CndwHgy9.js";
import { C as CirclePlay } from "./circle-play-Bq5KR4co.js";
import { C as CircleCheck } from "./circle-check-BgBa_u1w.js";
import { C as ChevronDown } from "./chevron-down-CO0XXOMd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
const Layers = createLucideIcon("layers", __iconNode);
function adaptProgressStatus(s) {
  return { __kind__: s };
}
function adaptCourseLevel(l) {
  return {
    __kind__: l
  };
}
function adaptEnrollments(raw) {
  return raw.map((e) => ({
    ...e,
    progressStatus: adaptProgressStatus(e.progressStatus)
  }));
}
function adaptCourses(raw) {
  return raw.map((c) => ({
    ...c,
    level: adaptCourseLevel(c.level)
  }));
}
const progressConfig = {
  NotStarted: {
    label: "Not Started",
    variant: "secondary",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3 h-3" }),
    color: "text-muted-foreground"
  },
  InProgress: {
    label: "In Progress",
    variant: "default",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
    color: "text-primary"
  },
  Completed: {
    label: "Completed",
    variant: "outline",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
    color: "text-accent-foreground"
  }
};
const PROGRESS_OPTIONS = [
  "NotStarted",
  "InProgress",
  "Completed"
];
function CourseCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-44" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 flex-1" })
      ] })
    ] })
  ] });
}
function ProgressDropdown({
  courseId,
  current,
  onUpdate,
  isUpdating
}) {
  const [open, setOpen] = reactExports.useState(false);
  const cfg = progressConfig[current.__kind__];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: "gap-1.5 text-xs",
        onClick: () => setOpen((v) => !v),
        disabled: isUpdating,
        "data-ocid": "progress-dropdown-trigger",
        "aria-label": "Change progress status",
        "aria-expanded": open,
        children: isUpdating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cfg.color, children: cfg.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cfg.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              className: `w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`
            }
          )
        ] })
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute right-0 top-full mt-1 z-10 bg-card border border-border rounded-md shadow-elevated overflow-hidden min-w-36",
        onBlur: () => setOpen(false),
        children: PROGRESS_OPTIONS.map((opt) => {
          const optCfg = progressConfig[opt];
          const isActive = current.__kind__ === opt;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: `w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors duration-150 hover:bg-muted ${isActive ? "bg-muted font-medium" : ""}`,
              onClick: () => {
                onUpdate(courseId, opt);
                setOpen(false);
              },
              "data-ocid": `progress-option-${opt.toLowerCase()}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: optCfg.color, children: optCfg.icon }),
                optCfg.label,
                isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 ml-auto text-primary" })
              ]
            },
            opt
          );
        })
      }
    )
  ] });
}
function EnrolledCourseCard({
  course,
  enrollment,
  onUpdateProgress,
  isUpdating,
  index
}) {
  const cfg = progressConfig[enrollment.progressStatus.__kind__];
  const level = getLevelLabel(course.level);
  const progressPercent = enrollment.progressStatus.__kind__ === "Completed" ? 100 : enrollment.progressStatus.__kind__ === "InProgress" ? 50 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: index * 0.07, ease: "easeOut" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden card-hover group flex flex-col h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-muted h-44", children: [
          course.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: course.thumbnailUrl,
              alt: course.title,
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center hero-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-12 h-12 text-primary/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-card/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-primary transition-all duration-700",
              style: { width: `${progressPercent}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: cfg.variant,
              className: "flex items-center gap-1 text-xs backdrop-blur-sm",
              "data-ocid": "course-progress-badge",
              children: [
                cfg.icon,
                cfg.label
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col flex-1 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold text-foreground leading-snug line-clamp-2 mb-1", children: course.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-3.5 h-3.5" }),
                level
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                Number(course.durationHours),
                "h"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
                Number(course.modulesCount),
                " modules"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProgressDropdown,
              {
                courseId: course.id,
                current: enrollment.progressStatus,
                onUpdate: onUpdateProgress,
                isUpdating
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: course.videoUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex-1",
                "data-ocid": "continue-course-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "default",
                    size: "sm",
                    className: "w-full gap-1.5 text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-3.5 h-3.5" }),
                      "Continue"
                    ]
                  }
                )
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function StudentDashboardPage() {
  const { identity, principal } = useAuth();
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const isReady = !!actor && !isFetching;
  const { data: enrollments = [], isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["myEnrollments", principal == null ? void 0 : principal.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return adaptEnrollments(await actor.getMyEnrollments());
    },
    enabled: isReady && !!identity
  });
  const { data: allCourses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      return adaptCourses(await actor.listCourses());
    },
    enabled: isReady
  });
  const [updatingCourseId, setUpdatingCourseId] = reactExports.useState(null);
  const updateProgressMutation = useMutation({
    mutationFn: async ({
      courseId,
      status
    }) => {
      if (!actor) throw new Error("Not authenticated");
      const backendStatus = status;
      return actor.updateMyProgressStatus(courseId, backendStatus);
    },
    onMutate: ({ courseId }) => setUpdatingCourseId(courseId),
    onSettled: () => {
      setUpdatingCourseId(null);
      queryClient.invalidateQueries({ queryKey: ["myEnrollments"] });
    }
  });
  const handleUpdateProgress = (courseId, status) => {
    updateProgressMutation.mutate({ courseId, status });
  };
  const courseMap = new Map(allCourses.map((c) => [c.id.toString(), c]));
  const enrolledCourses = enrollments.map((e) => ({
    enrollment: e,
    course: courseMap.get(e.courseId.toString())
  })).filter(
    (item) => item.course !== void 0
  );
  const isLoading = enrollmentsLoading || coursesLoading;
  const displayName = principal ? `${principal.toString().slice(0, 5)}...${principal.toString().slice(-3)}` : "Student";
  const completedCount = enrolledCourses.filter(
    (ec) => ec.enrollment.progressStatus.__kind__ === "Completed"
  ).length;
  const inProgressCount = enrolledCourses.filter(
    (ec) => ec.enrollment.progressStatus.__kind__ === "InProgress"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: "easeOut" },
        className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Learning Dashboard" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground", children: "My Courses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 font-mono truncate max-w-xs", children: displayName })
          ] }),
          !isLoading && enrolledCourses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 sm:gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground font-display", children: enrolledCourses.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enrolled" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-primary font-display", children: inProgressCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "In Progress" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold text-foreground font-display", children: completedCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Completed" })
            ] })
          ] })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
        "data-ocid": "courses-loading",
        children: ["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCardSkeleton, {}, id))
      }
    ) : enrolledCourses.length === 0 ? (
      // Empty state
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4 },
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl hero-gradient flex items-center justify-center mb-5 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-9 h-9 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "You haven't enrolled in any courses yet." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 max-w-sm", children: "Explore our catalog and find a course that sparks your curiosity." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "data-ocid": "browse-catalog-link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
              "Browse courses"
            ] }) })
          ]
        }
      )
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
        "data-ocid": "enrolled-courses-grid",
        children: enrolledCourses.map(({ course, enrollment }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          EnrolledCourseCard,
          {
            course,
            enrollment,
            onUpdateProgress: handleUpdateProgress,
            isUpdating: updatingCourseId === course.id,
            index: idx
          },
          course.id.toString()
        ))
      }
    ) })
  ] });
}
export {
  StudentDashboardPage as default
};
