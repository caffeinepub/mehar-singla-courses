import { createActor } from "@/backend";
import type { Backend } from "@/backend";
import type { UserRole } from "@/types";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

export function useAuth() {
  const { login, clear, isLoginSuccess, identity } = useInternetIdentity();
  const { actor, isFetching: actorFetching } = useActor<Backend>(createActor);
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;

  const { data: roleData, isLoading: roleLoading } = useQuery<UserRole | null>({
    queryKey: ["userRole", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return null;
      try {
        const backendAny = actor as unknown as Record<
          string,
          () => Promise<unknown>
        >;
        if (typeof backendAny.getUserRole !== "function") return null;
        const role = await backendAny.getUserRole();
        return role as UserRole;
      } catch {
        return null;
      }
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
    retry: false,
  });

  const isAdmin = roleData?.__kind__ === "admin";

  const handleLogin = useCallback(async () => {
    try {
      await login();
    } catch (error: unknown) {
      const err = error as Error;
      if (err?.message === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [login, clear]);

  const handleLogout = useCallback(async () => {
    await clear();
    queryClient.clear();
  }, [clear, queryClient]);

  return {
    isAuthenticated,
    isLoginSuccess,
    isAdmin,
    isUser: !!identity,
    roleLoading,
    identity,
    login: handleLogin,
    logout: handleLogout,
    principal: identity?.getPrincipal(),
  };
}
