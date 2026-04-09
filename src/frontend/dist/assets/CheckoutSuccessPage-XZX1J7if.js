import { c as createLucideIcon, i as useQueryClient, x as useSearch, r as reactExports, u as useQuery, j as jsxRuntimeExports, P as PageLoader, f as Link, a as Button, y as LayoutDashboard, B as BookOpen } from "./index-Dr1RbTL8.js";
import { u as useBackend } from "./useBackend-D5R7FEgv.js";
import { u as useMutation } from "./useMutation-BeUdWC28.js";
import { C as CircleCheck } from "./circle-check-BgBa_u1w.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
function CheckoutSuccessPage() {
  const { actor, isReady } = useBackend();
  const queryClient = useQueryClient();
  const search = useSearch({ strict: false });
  const courseIdStr = (search == null ? void 0 : search.courseId) ?? "";
  const sessionId = (search == null ? void 0 : search.session_id) ?? "";
  const courseId = courseIdStr ? BigInt(courseIdStr) : null;
  const enrollMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !courseId || !sessionId) return;
      await actor.enrollAfterPayment(courseId, sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrolled"] });
      queryClient.invalidateQueries({ queryKey: ["myEnrollments"] });
    }
  });
  const { mutate: doEnroll, isPending, isSuccess, isError } = enrollMutation;
  reactExports.useEffect(() => {
    if (isReady && sessionId && courseId && !isPending && !isSuccess && !isError) {
      doEnroll();
    }
  }, [isReady, sessionId, courseId, isPending, isSuccess, isError, doEnroll]);
  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["course", courseIdStr],
    queryFn: async () => {
      if (!actor || !courseId) return null;
      return actor.getCourse(courseId);
    },
    enabled: isReady && !!courseId
  });
  if (!isReady || courseLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(PageLoader, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center py-16 px-4 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-flex items-center justify-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute w-28 h-28 rounded-full bg-primary/10 animate-ping",
          style: { animationDuration: "2s" }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-primary" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-3", children: "You're Enrolled! 🎉" }),
    course && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 px-6 py-4 rounded-2xl bg-card border border-border shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide", children: "Course" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-foreground", children: course.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-8", children: "Your payment was successful and you now have full access to this course. Head to your dashboard to start learning." }),
    enrollMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive", children: "Enrollment may be pending. Please visit your dashboard — if the course doesn't appear, contact support." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "lg",
          className: "gap-2 w-full sm:w-auto",
          "data-ocid": "go-to-dashboard-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "w-4 h-4" }),
            "Go to Dashboard"
          ]
        }
      ) }),
      course && courseIdStr && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses/$id", params: { id: courseIdStr }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "lg",
          className: "gap-2 w-full sm:w-auto",
          "data-ocid": "start-learning-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
            "Start Learning",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-xs text-muted-foreground", children: "A confirmation of your purchase will appear in your dashboard." })
  ] }) });
}
export {
  CheckoutSuccessPage as default
};
