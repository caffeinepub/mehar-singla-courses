import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Courses", icon: BookOpen },
  { to: "/profile", label: "About", icon: User },
  {
    to: "/dashboard",
    label: "My Learning",
    icon: LayoutDashboard,
    requiresAuth: true,
  },
];

export function NavBar() {
  const { isAuthenticated, isAdmin, login, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-xs"
      data-ocid="navbar"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="nav-brand"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs group-hover:bg-primary/90 transition-smooth">
            <GraduationCap className="size-4.5" />
          </div>
          <span className="font-display text-lg font-bold text-foreground tracking-tight hidden sm:block">
            Mehar Singla
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map(({ to, label, requiresAuth }) => {
            if (requiresAuth && !isAuthenticated) return null;
            return (
              <Link
                key={to}
                to={to}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-smooth"
                activeProps={{
                  className: "text-primary font-semibold bg-primary/5",
                }}
                data-ocid={`nav-link-${label.toLowerCase().replace(" ", "-")}`}
              >
                {label}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              to="/admin"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-smooth flex items-center gap-1.5"
              activeProps={{
                className: "text-primary font-semibold bg-primary/5",
              }}
              data-ocid="nav-link-admin"
            >
              <ShieldCheck className="size-3.5" />
              Admin
            </Link>
          )}
        </nav>

        {/* Auth Button + Mobile toggle */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="hidden md:flex gap-2"
              data-ocid="nav-logout"
            >
              <LogOut className="size-3.5" />
              Sign Out
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={login}
              className="hidden md:flex gap-2 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              data-ocid="nav-login"
            >
              <LogIn className="size-3.5" />
              Sign In
            </Button>
          )}

          <button
            type="button"
            className="md:hidden p-2 rounded-md hover:bg-muted/60 transition-smooth"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="nav-mobile-toggle"
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-1"
          data-ocid="nav-mobile-menu"
        >
          {navLinks.map(({ to, label, icon: Icon, requiresAuth }) => {
            if (requiresAuth && !isAuthenticated) return null;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-smooth"
                activeProps={{
                  className: "text-primary font-semibold bg-primary/5",
                }}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-smooth"
              activeProps={{
                className: "text-primary font-semibold bg-primary/5",
              }}
            >
              <ShieldCheck className="size-4" />
              Admin Dashboard
            </Link>
          )}
          <div className="pt-2 border-t border-border mt-1">
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="w-full gap-2"
                data-ocid="nav-mobile-logout"
              >
                <LogOut className="size-3.5" />
                Sign Out
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  login();
                  setMobileOpen(false);
                }}
                className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                data-ocid="nav-mobile-login"
              >
                <LogIn className="size-3.5" />
                Sign In with Internet Identity
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
