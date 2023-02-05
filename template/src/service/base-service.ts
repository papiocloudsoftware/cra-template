import { CurrentUserState } from "../hooks/use-current-user-state";
import { AuthTokens } from "./user-types";

export abstract class BaseService {
  static readonly AUTHORIZATION_KEY = "authorization";
  static readonly API_BASE_PATH = "/api";
  readonly currentUserState: CurrentUserState;

  protected constructor(currentUserState: CurrentUserState) {
    this.currentUserState = currentUserState;
  }

  protected async fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const requestProps = init || {};
    const mergedHeaders: HeadersInit = { ...this.commonHeaders(), ...(requestProps.headers || {}) };
    const response = await fetch(input, { ...requestProps, headers: mergedHeaders });
    if (response.status === 401 && "Authorization" in mergedHeaders) {
      await this.refreshToken();
      // Try again after refresh
      const newMergedHeaders: HeadersInit = { ...this.commonHeaders(), ...(requestProps.headers || {}) };
      return fetch(input, { ...requestProps, headers: newMergedHeaders });
    } else {
      return response;
    }
  }

  protected commonHeaders(): { [key: string]: string } {
    const headers: HeadersInit = {
      Accept: "applicaiton/json",
      ["Content-Type"]: "application/json"
    };

    const authTokensJson = localStorage.getItem(BaseService.AUTHORIZATION_KEY);
    if (authTokensJson) {
      const authTokens = JSON.parse(authTokensJson);
      if (authTokens?.token_type && authTokens?.access_token) {
        headers.Authorization = `${authTokens.token_type} ${authTokens.access_token}`;
      }
    }
    return headers;
  }

  protected async refreshToken(): Promise<void> {
    const response = await fetch(`${BaseService.API_BASE_PATH}/refresh-token`, {
      method: "POST",
      headers: this.commonHeaders()
    });
    if (response.ok) {
      await this.storeAuthTokens(response);
    }
  }

  protected async storeAuthTokens(response: Response) {
    const authTokens = (await response.json()) as AuthTokens;
    if (authTokens.access_token) {
      localStorage.setItem(BaseService.AUTHORIZATION_KEY, JSON.stringify(authTokens));
    }
  }
}
