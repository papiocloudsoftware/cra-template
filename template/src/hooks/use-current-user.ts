import { CurrentUser } from "../service/user-types";
import { useCurrentUserState } from "./use-current-user-state";

export function useCurrentUser(): CurrentUser | undefined {
  const state = useCurrentUserState();
  return state.currentUser;
}
