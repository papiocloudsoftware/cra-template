import * as jose from "jose";

import { useCurrentUserState } from "../hooks/use-current-user-state";
import { AccessTokenPayload, AuthTokens, CurrentUser, LoginPostBody, UserData } from "./application-types";

const API_BASE_PATH = "/api";

function commonHeaders(): { [key: string]: string } {
  const currentUserState = useCurrentUserState();
  const headers: HeadersInit = {
    Accept: "applicaiton/json",
    ["Content-Type"]: "application/json"
  };

  const authTokens = currentUserState.currentUser?.authTokens;
  if (authTokens?.token_type && authTokens?.access_token) {
    headers.Authorization = `${authTokens?.token_type} ${authTokens?.access_token}`;
  }
  return headers;
}

export async function login(username?: string, password?: string): Promise<boolean> {
  const currentUserState = useCurrentUserState();
  if (!currentUserState.setCurrentUser) {
    return false;
  }
  const postBody: LoginPostBody = {
    username,
    password
  };
  const response = await fetch(`${API_BASE_PATH}/login`, {
    method: "POST",
    body: JSON.stringify(postBody),
    headers: commonHeaders()
  });
  if (response.ok) {
    const authTokens = (await response.json()) as AuthTokens;
    if (authTokens.access_token) {
      const accessTokenData = jose.decodeJwt(authTokens.access_token) as AccessTokenPayload;
      currentUserState.setCurrentUser({ authTokens, userData: accessTokenData });
      return true;
    }
  }
  return false;
}

/**
 * Logs the user out of the session
 */
export async function logout(): Promise<void> {
  const currentUserState = useCurrentUserState();
  await fetch(`${API_BASE_PATH}/logout`, { method: "POST", headers: commonHeaders() });
  if (currentUserState.setCurrentUser) {
    currentUserState.setCurrentUser({});
  }
}

/**
 * Retrieves he current logged-in user data for the application
 */
export async function getUserData(): Promise<UserData | undefined> {
  const currentUserState = useCurrentUserState();
  const requestedTime = currentUserState.currentUser?.requestedTime;
  const userData = currentUserState.currentUser?.userData;
  if (userData && requestedTime && new Date().getTime() - requestedTime.getTime() < 60_000) {
    return userData;
  }

  const response = await fetch(`${API_BASE_PATH}/user`, { method: "GET", headers: commonHeaders() });
  if (response.ok) {
    const userData = (await response.json()) as UserData;
    if (currentUserState.setCurrentUser) {
      currentUserState.setCurrentUser((currUser) => ({
        ...currUser,
        userData,
        requestedTime: new Date()
      }));
    }
    return userData;
  }
  if (currentUserState.setCurrentUser) {
    currentUserState.setCurrentUser({});
  }
  return undefined;
}
