import { createActor } from "@/backend";
import type { Backend } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";

/**
 * Returns the backend actor for authenticated calls.
 * When the user is not authenticated, actor will be null.
 */
export function useBackend() {
  const { actor, isFetching } = useActor<Backend>(createActor);
  const { identity } = useInternetIdentity();

  const isAuthenticated = !!identity;

  return {
    actor,
    isReady: !!actor && !isFetching,
    isFetching,
    isAuthenticated,
  };
}
