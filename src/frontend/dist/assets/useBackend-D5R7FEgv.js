import { h as useActor, z as useInternetIdentity, k as createActor } from "./index-Dr1RbTL8.js";
function useBackend() {
  const { actor, isFetching } = useActor(createActor);
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  return {
    actor,
    isReady: !!actor && !isFetching,
    isFetching,
    isAuthenticated
  };
}
export {
  useBackend as u
};
