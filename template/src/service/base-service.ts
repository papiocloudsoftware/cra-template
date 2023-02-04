import { CurrentUserState } from "../hooks/use-current-user-state";

export abstract class BaseService {
  static readonly API_BASE_PATH = "/api";
  readonly currentUserState: CurrentUserState;

  protected constructor(currentUserState: CurrentUserState) {
    this.currentUserState = currentUserState;
  }

  protected async fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const requestProps = init || {};
    const mergedHeaders = { ...this.commonHeaders(), ...(requestProps.headers || {}) };
    return fetch(input, { ...requestProps, headers: mergedHeaders });
  }

  protected commonHeaders(): { [key: string]: string } {
    const headers: HeadersInit = {
      Accept: "applicaiton/json",
      ["Content-Type"]: "application/json"
    };

    const authTokens = this.currentUserState.currentUser?.authTokens;
    if (authTokens?.token_type && authTokens?.access_token) {
      headers.Authorization = `${authTokens?.token_type} ${authTokens?.access_token}`;
    }
    return headers;
  }
}
