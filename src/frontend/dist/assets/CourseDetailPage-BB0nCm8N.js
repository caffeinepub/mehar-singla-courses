import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as cn, d as useParams, e as useAuth, u as useQuery, P as PageLoader, f as Link, a as Button, U as User, B as BookOpen, S as ShieldCheck, g as ue } from "./index-Dr1RbTL8.js";
import { P as Primitive } from "./index-C96b1Qjr.js";
import { u as useBackend } from "./useBackend-D5R7FEgv.js";
import { g as getLevelLabel, f as formatPrice } from "./types-DHh7mi64.js";
import { u as useMutation } from "./useMutation-BeUdWC28.js";
import { S as Star } from "./star-TPH1DmhR.js";
import { C as Clock } from "./clock-CndwHgy9.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-B6fv-3SS.js";
import { C as CirclePlay } from "./circle-play-Bq5KR4co.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const LEVEL_COLORS = {
  Beginner: "bg-primary/10 text-primary",
  Intermediate: "bg-accent/10 text-accent",
  Advanced: "bg-secondary text-secondary-foreground"
};
function CourseStat({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: value })
    ] })
  ] });
}
function CourseDetailPage() {
  const { id } = useParams({ from: "/courses/$id" });
  const { actor, isReady } = useBackend();
  const { isAuthenticated, login } = useAuth();
  const courseId = BigInt(id);
  const {
    data: course,
    isLoading: courseLoading,
    error: courseError
  } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCourse(courseId);
    },
    enabled: isReady
  });
  const { data: isEnrolled, isLoading: enrollLoading } = useQuery({
    queryKey: ["enrolled", id, isAuthenticated],
    queryFn: async () => {
      if (!actor || !isAuthenticated) return false;
      return actor.isEnrolledInCourse(courseId);
    },
    enabled: isReady && isAuthenticated
  });
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const origin = window.location.origin;
      const successUrl = `${origin}/checkout/success?courseId=${id}`;
      const cancelUrl = `${origin}/checkout/cancel?courseId=${id}`;
      return actor.createCourseCheckoutSession(courseId, successUrl, cancelUrl);
    },
    onSuccess: (checkoutUrl) => {
      window.location.href = checkoutUrl;
    },
    onError: () => {
      ue.error("Failed to start checkout. Please try again.");
    }
  });
  if (courseLoading || !isReady) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {});
  if (courseError || course === null || course === void 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center py-24 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-destructive" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground mb-3", children: "Course Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "This course doesn't exist or may have been removed." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", "data-ocid": "course-not-found-back", children: "Browse Courses" }) })
    ] }) });
  }
  const levelLabel = getLevelLabel(course.level);
  const levelColorClass = LEVEL_COLORS[levelLabel] ?? LEVEL_COLORS.Beginner;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-sm text-muted-foreground mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate max-w-xs", children: course.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `px-3 py-1 rounded-full text-xs font-semibold ${levelColorClass}`,
                children: levelLabel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-accent", children: [
              [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 fill-current" }, i)),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1 font-medium", children: "4.9" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl lg:text-4xl font-display font-bold text-foreground leading-tight", children: course.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base leading-relaxed line-clamp-4", children: course.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Instructor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/profile",
                  className: "text-sm font-semibold text-primary hover:underline",
                  "data-ocid": "instructor-profile-link",
                  children: "Mehar Singla"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CourseStat,
              {
                icon: Clock,
                label: "Duration",
                value: `${Number(course.durationHours)}h`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CourseStat,
              {
                icon: BookOpen,
                label: "Modules",
                value: String(Number(course.modulesCount))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CourseStat, { icon: ChartNoAxesColumn, label: "Level", value: levelLabel })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-background shadow-elevated overflow-hidden sticky top-6", children: [
          course.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: course.thumbnailUrl,
              alt: course.title,
              className: "w-full h-full object-cover"
            }
          ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-16 h-16 text-primary/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-display font-bold text-foreground", children: formatPrice(course.price) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "One-time payment" })
            ] }),
            !isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full",
                size: "lg",
                onClick: login,
                "data-ocid": "login-to-enroll-btn",
                children: "Login to Enroll"
              }
            ) : enrollLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", size: "lg", disabled: true, children: "Checking enrollment…" }) : isEnrolled ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: course.videoUrl,
                target: "_blank",
                rel: "noopener noreferrer",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    className: "w-full",
                    size: "lg",
                    "data-ocid": "access-course-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-5 h-5 mr-2" }),
                      "Access Course"
                    ]
                  }
                )
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "w-full",
                size: "lg",
                onClick: () => checkoutMutation.mutate(),
                disabled: checkoutMutation.isPending,
                "data-ocid": "enroll-now-btn",
                children: checkoutMutation.isPending ? "Redirecting…" : "Enroll Now"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground justify-center pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secure checkout powered by Stripe" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-primary shrink-0" }),
                Number(course.durationHours),
                " hours of on-demand content"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary shrink-0" }),
                Number(course.modulesCount),
                " structured modules"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4 text-primary shrink-0" }),
                "Lifetime access after enrollment"
              ] })
            ] })
          ] })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-4", children: "About This Course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-base whitespace-pre-wrap", children: course.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-6", children: "Your Instructor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5 p-6 rounded-2xl bg-card border border-border shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/profile",
                className: "text-lg font-display font-semibold text-primary hover:underline",
                "data-ocid": "instructor-section-link",
                children: "Mehar Singla"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Technical Trainer & Course Creator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3 leading-relaxed", children: "Mehar Singla is an experienced technical trainer specializing in modern software development. With a passion for teaching, Mehar has helped hundreds of students level up their skills." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "mt-4",
                "data-ocid": "view-instructor-profile-btn",
                children: "View Profile"
              }
            ) })
          ] })
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  CourseDetailPage as default
};
