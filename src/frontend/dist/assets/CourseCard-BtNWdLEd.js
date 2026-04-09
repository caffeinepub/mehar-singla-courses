import { j as jsxRuntimeExports, B as BookOpen, a as Button, f as Link } from "./index-Dr1RbTL8.js";
import { C as Card, a as CardContent, b as CardFooter } from "./proxy-pgrf710f.js";
import { g as getLevelLabel, f as formatPrice } from "./types-DHh7mi64.js";
import { C as Clock } from "./clock-CndwHgy9.js";
import { C as ChartNoAxesColumn } from "./chart-no-axes-column-B6fv-3SS.js";
const levelColors = {
  Beginner: "bg-primary/10 text-primary border-primary/20",
  Intermediate: "bg-accent/10 text-accent border-accent/20",
  Advanced: "bg-secondary text-secondary-foreground border-border"
};
function CourseCard({ course }) {
  const level = getLevelLabel(course.level);
  const levelClass = levelColors[level] ?? "bg-secondary text-secondary-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "group flex flex-col overflow-hidden border border-border shadow-card hover:shadow-elevated transition-smooth hover:-translate-y-0.5 bg-card",
      "data-ocid": "course-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden aspect-video bg-muted", children: [
          course.thumbnailUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: course.thumbnailUrl,
              alt: course.title,
              className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "size-12 text-primary/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${levelClass}`,
              children: level
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col flex-1 p-5 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors", children: course.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 flex-1", children: course.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3.5" }),
              Number(course.durationHours),
              "h"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "size-3.5" }),
              Number(course.modulesCount),
              " modules"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "flex items-center justify-between px-5 pb-5 pt-0 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-bold text-foreground", children: formatPrice(course.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              size: "sm",
              className: "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold",
              "data-ocid": "course-card-cta",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses/$id", params: { id: String(course.id) }, children: "View Course" })
            }
          )
        ] })
      ]
    }
  );
}
export {
  CourseCard as C
};
