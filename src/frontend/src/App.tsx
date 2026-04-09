import { AdminRoute } from "@/components/AdminRoute";
import { Layout } from "@/components/Layout";
import { PageLoader } from "@/components/LoadingSpinner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const CourseCatalogPage = lazy(() => import("@/pages/CourseCatalogPage"));
const CourseDetailPage = lazy(() => import("@/pages/CourseDetailPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const StudentDashboardPage = lazy(() => import("@/pages/StudentDashboardPage"));
const AdminDashboardPage = lazy(() => import("@/pages/AdminDashboardPage"));
const CheckoutSuccessPage = lazy(() => import("@/pages/CheckoutSuccessPage"));
const CheckoutCancelPage = lazy(() => import("@/pages/CheckoutCancelPage"));

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CourseCatalogPage,
});

const courseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/courses/$id",
  component: CourseDetailPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <StudentDashboardPage />
    </ProtectedRoute>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AdminRoute>
      <AdminDashboardPage />
    </AdminRoute>
  ),
});

const checkoutSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout/success",
  component: CheckoutSuccessPage,
});

const checkoutCancelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout/cancel",
  component: CheckoutCancelPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  courseDetailRoute,
  profileRoute,
  dashboardRoute,
  adminRoute,
  checkoutSuccessRoute,
  checkoutCancelRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
