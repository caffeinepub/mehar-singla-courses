import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as BookOpen, G as GraduationCap, X, a as Button, L as LoadingSpinner, u as useQuery } from "./index-Dr1RbTL8.js";
import { C as CourseCard } from "./CourseCard-BtNWdLEd.js";
import { U as Users, I as Input } from "./input-fEUXF24t.js";
import { u as useBackend } from "./useBackend-D5R7FEgv.js";
import { m as motion } from "./proxy-pgrf710f.js";
import { S as Sparkles } from "./sparkles-MmiA3Sc4.js";
import "./types-DHh7mi64.js";
import "./clock-CndwHgy9.js";
import "./chart-no-axes-column-B6fv-3SS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const LEVEL_FILTERS = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced"
];
const STATS = [
  { icon: BookOpen, label: "Courses", value: "20+" },
  { icon: Users, label: "Students", value: "5,000+" },
  { icon: GraduationCap, label: "Certified", value: "2,000+" }
];
function useListCourses() {
  const { actor, isReady } = useBackend();
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.listCourses();
      return raw.map((c) => ({
        ...c,
        level: {
          __kind__: String(c.level)
        }
      }));
    },
    enabled: isReady,
    staleTime: 3e4
  });
}
function CourseCatalogPage() {
  const [search, setSearch] = reactExports.useState("");
  const [levelFilter, setLevelFilter] = reactExports.useState("All");
  const { data: courses = [], isLoading } = useListCourses();
  const filtered = reactExports.useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch = search.trim() === "" || c.title.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = levelFilter === "All" || c.level.__kind__ === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [courses, search, levelFilter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "hero-gradient border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-6xl px-4 py-20 sm:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row items-center gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex-1 text-center lg:text-left",
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-semibold mb-6 border border-primary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }),
              "Technical Training by Mehar Singla"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-5", children: [
              "Learn with",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Expert Guidance" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed", children: [
              "I'm ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Mehar Singla" }),
              ", a Technical Trainer helping developers master modern technologies through hands-on, project-based courses."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 justify-center lg:justify-start", children: STATS.map(({ icon: Icon, label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2.5 bg-card border border-border rounded-xl px-4 py-2.5 shadow-subtle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
                ]
              },
              label
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "flex-shrink-0 hidden lg:block",
          initial: { opacity: 0, x: 32 },
          animate: { opacity: 1, x: 0 },
          transition: {
            duration: 0.6,
            delay: 0.15,
            ease: [0.4, 0, 0.2, 1]
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-72 h-72 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 border border-primary/20 shadow-elevated flex flex-col items-center justify-center gap-6 p-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-20 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-foreground", children: "Mehar Singla" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: "Technical Trainer" })
            ] })
          ] })
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14 sm:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto max-w-6xl px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center mb-10",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-3", children: "Browse All Courses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-lg mx-auto", children: "From beginner fundamentals to advanced mastery — find the right course for your skill level." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search courses by title…",
              className: "pl-10 pr-10 bg-card border-input h-11",
              "data-ocid": "course-search",
              "aria-label": "Search courses"
            }
          ),
          search && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearch(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
              "aria-label": "Clear search",
              "data-ocid": "course-search-clear",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex items-center gap-2 flex-wrap",
            "aria-label": "Filter by level",
            children: LEVEL_FILTERS.map((lvl) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: levelFilter === lvl ? "default" : "outline",
                size: "sm",
                onClick: () => setLevelFilter(lvl),
                className: levelFilter === lvl ? "bg-primary text-primary-foreground" : "border-input text-muted-foreground hover:text-foreground",
                "data-ocid": `filter-${lvl.toLowerCase()}`,
                children: lvl
              },
              lvl
            ))
          }
        )
      ] }),
      !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: filtered.length === 0 ? "No courses found" : `${filtered.length} course${filtered.length !== 1 ? "s" : ""} found` }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-col items-center justify-center py-24 gap-4",
          "data-ocid": "courses-loading",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", message: "Loading courses…" })
        }
      ),
      !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          "data-ocid": "course-grid",
          children: filtered.map((course, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4, delay: i * 0.07 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCard, { course })
            },
            String(course.id)
          ))
        }
      ),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex flex-col items-center justify-center py-24 gap-6 text-center",
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.35 },
          "data-ocid": "courses-empty",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "size-10 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "No courses match your search" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Try adjusting your search term or level filter to find what you're looking for." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                onClick: () => {
                  setSearch("");
                  setLevelFilter("All");
                },
                "data-ocid": "courses-empty-reset",
                children: "Clear filters"
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-t border-border py-14 sm:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto max-w-6xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center gap-10 md:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "w-36 h-36 md:w-48 md:h-48 flex-shrink-0 rounded-full bg-gradient-to-br from-primary/25 to-accent/25 border-4 border-primary/20 flex items-center justify-center shadow-elevated",
          initial: { opacity: 0, scale: 0.8 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { duration: 0.5 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-16 md:size-20 text-primary" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: 0.1 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground mb-4", children: "About Mehar Singla" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4 max-w-2xl", children: "I'm a passionate Technical Trainer with years of experience teaching developers how to build real-world applications. My courses focus on hands-on, project-based learning to ensure you gain practical skills that you can apply immediately in your career." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed max-w-2xl", children: "Whether you're just starting out or looking to level up your expertise, I have a course designed to take you to the next stage." })
          ]
        }
      )
    ] }) }) })
  ] });
}
export {
  CourseCatalogPage as default
};
