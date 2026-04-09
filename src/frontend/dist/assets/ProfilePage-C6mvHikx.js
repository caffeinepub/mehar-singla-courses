import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, s as shimExports, b as cn, e as useAuth, h as useActor, u as useQuery, a as Button, G as GraduationCap, B as BookOpen, i as useQueryClient, g as ue, X, L as LoadingSpinner, k as createActor } from "./index-Dr1RbTL8.js";
import { C as CourseCard } from "./CourseCard-BtNWdLEd.js";
import { u as useCallbackRef, a as useLayoutEffect2, L as Label, T as Textarea } from "./textarea-DUrhGgul.js";
import { P as Primitive } from "./index-C96b1Qjr.js";
import { B as Badge } from "./badge-CJhb3eiL.js";
import { m as motion, C as Card, a as CardContent } from "./proxy-pgrf710f.js";
import { U as Users, I as Input } from "./input-fEUXF24t.js";
import { S as Skeleton } from "./skeleton-CoMKRjPQ.js";
import { u as useMutation } from "./useMutation-BeUdWC28.js";
import { S as Star } from "./star-TPH1DmhR.js";
import { C as CircleCheck } from "./circle-check-BgBa_u1w.js";
import "./types-DHh7mi64.js";
import "./clock-CndwHgy9.js";
import "./chart-no-axes-column-B6fv-3SS.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
function useIsHydrated() {
  return shimExports.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
function subscribe() {
  return () => {
  };
}
var AVATAR_NAME = "Avatar";
var [createAvatarContext] = createContextScope(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, ...avatarProps } = props;
    const [imageLoadingStatus, setImageLoadingStatus] = reactExports.useState("idle");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      AvatarProvider,
      {
        scope: __scopeAvatar,
        imageLoadingStatus,
        onImageLoadingStatusChange: setImageLoadingStatus,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...avatarProps, ref: forwardedRef })
      }
    );
  }
);
Avatar$1.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, src, onLoadingStatusChange = () => {
    }, ...imageProps } = props;
    const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
    const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
    const handleLoadingStatusChange = useCallbackRef((status) => {
      onLoadingStatusChange(status);
      context.onImageLoadingStatusChange(status);
    });
    useLayoutEffect2(() => {
      if (imageLoadingStatus !== "idle") {
        handleLoadingStatusChange(imageLoadingStatus);
      }
    }, [imageLoadingStatus, handleLoadingStatusChange]);
    return imageLoadingStatus === "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.img, { ...imageProps, ref: forwardedRef, src }) : null;
  }
);
AvatarImage$1.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAvatar, delayMs, ...fallbackProps } = props;
    const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
    const [canRender, setCanRender] = reactExports.useState(delayMs === void 0);
    reactExports.useEffect(() => {
      if (delayMs !== void 0) {
        const timerId = window.setTimeout(() => setCanRender(true), delayMs);
        return () => window.clearTimeout(timerId);
      }
    }, [delayMs]);
    return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.span, { ...fallbackProps, ref: forwardedRef }) : null;
  }
);
AvatarFallback$1.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
  if (!image) {
    return "idle";
  }
  if (!src) {
    return "error";
  }
  if (image.src !== src) {
    image.src = src;
  }
  return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
  const isHydrated = useIsHydrated();
  const imageRef = reactExports.useRef(null);
  const image = (() => {
    if (!isHydrated) return null;
    if (!imageRef.current) {
      imageRef.current = new window.Image();
    }
    return imageRef.current;
  })();
  const [loadingStatus, setLoadingStatus] = reactExports.useState(
    () => resolveLoadingStatus(image, src)
  );
  useLayoutEffect2(() => {
    setLoadingStatus(resolveLoadingStatus(image, src));
  }, [image, src]);
  useLayoutEffect2(() => {
    const updateStatus = (status) => () => {
      setLoadingStatus(status);
    };
    if (!image) return;
    const handleLoad = updateStatus("loaded");
    const handleError = updateStatus("error");
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    if (typeof crossOrigin === "string") {
      image.crossOrigin = crossOrigin;
    }
    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
  }, [image, crossOrigin, referrerPolicy]);
  return loadingStatus;
}
var Root = Avatar$1;
var Image = AvatarImage$1;
var Fallback = AvatarFallback$1;
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
function adaptCourses(raw) {
  return raw;
}
function adaptProfile(raw) {
  return raw;
}
const STATS = [
  { icon: BookOpen, label: "Courses", value: "12+" },
  { icon: Users, label: "Students", value: "2,400+" },
  { icon: Star, label: "Avg. Rating", value: "4.9" },
  { icon: Trophy, label: "Years Exp.", value: "8+" }
];
function ProfileSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-8 items-center sm:items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-36 rounded-full shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-56" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-36" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: ["s1", "s2", "s3", "s4"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }, id)) })
  ] });
}
function PhotoUpload({ currentUrl, onUpload, disabled }) {
  const fileInputRef = reactExports.useRef(null);
  const [preview, setPreview] = reactExports.useState(currentUrl);
  const [uploading, setUploading] = reactExports.useState(false);
  const handleFileChange = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      ue.error("Please select an image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      ue.error("Image must be under 2 MB");
      return;
    }
    setUploading(true);
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      setPreview(dataUrl);
      onUpload(dataUrl);
      ue.success("Photo ready — save profile to apply");
    } catch {
      ue.error("Could not read the image — please try again");
    } finally {
      setUploading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "size-32 ring-4 ring-primary/20 ring-offset-2 ring-offset-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AvatarImage,
          {
            src: preview,
            alt: "Profile photo",
            className: "object-cover"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/10 text-primary text-4xl font-display font-bold", children: "MS" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            var _a;
            return (_a = fileInputRef.current) == null ? void 0 : _a.click();
          },
          disabled: disabled || uploading,
          "aria-label": "Change profile photo",
          className: "absolute inset-0 flex items-center justify-center rounded-full bg-foreground/40 opacity-0 group-hover:opacity-100 transition-smooth cursor-pointer disabled:cursor-not-allowed",
          children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "size-6 text-white" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          var _a;
          return (_a = fileInputRef.current) == null ? void 0 : _a.click();
        },
        disabled: disabled || uploading,
        className: "text-xs text-primary hover:underline transition-colors disabled:opacity-50",
        "data-ocid": "photo-upload-trigger",
        children: uploading ? "Processing…" : "Change photo"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: handleFileChange,
        "data-ocid": "photo-upload-input"
      }
    )
  ] });
}
function EditProfileForm({ profile, onClose }) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [name, setName] = reactExports.useState(profile.name);
  const [bio, setBio] = reactExports.useState(profile.bio);
  const [photoUrl, setPhotoUrl] = reactExports.useState(profile.photoUrl);
  const { mutate: saveProfile, isPending } = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.updateInstructorProfile(name.trim(), bio.trim(), photoUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructorProfile"] });
      ue.success("Profile updated!");
      onClose();
    },
    onError: () => {
      ue.error("Failed to save profile — please try again.");
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      ue.error("Name cannot be empty");
      return;
    }
    saveProfile();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.2 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-primary/20 shadow-elevated bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold text-foreground", children: "Edit Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: onClose,
              disabled: isPending,
              "aria-label": "Close edit form",
              "data-ocid": "edit-form-close",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PhotoUpload,
            {
              currentUrl: photoUrl,
              onUpload: setPhotoUrl,
              disabled: isPending
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-name", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "edit-name",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "Your full name",
                disabled: isPending,
                maxLength: 80,
                "data-ocid": "edit-name-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-bio", children: "Bio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "edit-bio",
                value: bio,
                onChange: (e) => setBio(e.target.value),
                placeholder: "Tell students about yourself...",
                rows: 5,
                disabled: isPending,
                maxLength: 600,
                className: "resize-none",
                "data-ocid": "edit-bio-input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
              bio.length,
              "/600"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: onClose,
                disabled: isPending,
                "data-ocid": "edit-form-cancel",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: isPending || !name.trim(),
                className: "gap-2",
                "data-ocid": "edit-form-save",
                children: [
                  isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4" }),
                  "Save Changes"
                ]
              }
            )
          ] })
        ] })
      ] }) })
    }
  );
}
function ProfilePage() {
  const { isAdmin } = useAuth();
  const { actor, isFetching } = useActor(createActor);
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const { data: rawProfile, isLoading: profileLoading } = useQuery({
    queryKey: ["instructorProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getInstructorProfile();
      return adaptProfile(result);
    },
    enabled: !!actor && !isFetching
  });
  const { data: rawCourses, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.listCourses();
      return adaptCourses(result);
    },
    enabled: !!actor && !isFetching
  });
  const courses = rawCourses ?? [];
  const isLoading = profileLoading || isFetching;
  const profile = rawProfile ?? {
    name: "Mehar Singla",
    bio: "Passionate technical trainer with 8+ years of industry experience. I specialise in making complex concepts approachable — from web fundamentals to advanced system design. My courses are project-driven, practical, and designed to get you job-ready fast.",
    photoUrl: ""
  };
  if (isLoading && !rawProfile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSkeleton, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "hero-gradient border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-8 items-center sm:items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4 },
          className: "shrink-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "size-36 ring-4 ring-primary/25 ring-offset-4 ring-offset-background shadow-elevated", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AvatarImage,
              {
                src: profile.photoUrl,
                alt: profile.name,
                className: "object-cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/10 text-primary text-5xl font-display font-bold", children: "MS" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -16 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4, delay: 0.1 },
          className: "flex-1 min-w-0 text-center sm:text-left",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: profile.name }),
              isAdmin && !isEditing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => setIsEditing(true),
                  className: "gap-1.5 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary shrink-0",
                  "data-ocid": "edit-profile-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "size-3.5" }),
                    "Edit Profile"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center sm:justify-start gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-4 text-accent shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-medium text-accent", children: "Technical Trainer" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "text-xs font-normal hidden sm:inline-flex",
                  children: "Instructor"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed max-w-2xl", children: profile.bio })
          ]
        }
      )
    ] }) }) }),
    isEditing && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditProfileForm,
      {
        profile,
        onClose: () => setIsEditing(false)
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, delay: 0.15 + i * 0.07 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-card text-center p-5 bg-background hover:shadow-elevated transition-smooth", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { className: "size-5 text-primary" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl font-bold text-foreground", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: stat.label })
        ] })
      },
      stat.label
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.35 },
          className: "mb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-bold text-foreground mb-1", children: [
              "Courses by ",
              profile.name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Practical, project-driven courses to accelerate your tech career." })
          ]
        }
      ),
      coursesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: ["g1", "g2", "g3", "g4", "g5", "g6"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-xl" }, id)) }) : courses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "no-courses-empty",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-16 rounded-full bg-muted flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "size-8 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-foreground mb-2", children: "No courses yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "Courses will appear here once they're published." }),
            isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                className: "mt-5 gap-2",
                "data-ocid": "create-course-cta",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/admin", children: "Create First Course" })
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
          "data-ocid": "courses-grid",
          children: courses.map((course, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.3, delay: i * 0.05 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CourseCard, { course })
            },
            String(course.id)
          ))
        }
      )
    ] }) })
  ] });
}
export {
  ProfilePage as default
};
