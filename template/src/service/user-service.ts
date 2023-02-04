import * as jose from "jose";

import { CurrentUserState } from "../hooks/use-current-user-state";
import { BaseService } from "./base-service";
import { AccessTokenPayload, AuthTokens, LoginPostBody } from "./user-types";

export class UserService extends BaseService {
  constructor(currentUserState: CurrentUserState) {
    super(currentUserState);
  }

  async login(username: string, password: string): Promise<boolean> {
    if (!this.currentUserState.setCurrentUser) {
      return false;
    }
    const postBody: LoginPostBody = {
      username,
      password
    };
    const response = await this.fetch(`${UserService.API_BASE_PATH}/login`, {
      method: "POST",
      body: JSON.stringify(postBody)
    });
    if (response.ok) {
      const authTokens = (await response.json()) as AuthTokens;
      if (authTokens.access_token) {
        const accessTokenData = jose.decodeJwt(authTokens.access_token) as AccessTokenPayload;
        this.currentUserState.setCurrentUser({ authTokens, userData: accessTokenData });
        return true;
      }
    }
    return false;
  }

  async logout(): Promise<boolean> {
    if (!this.currentUserState.setCurrentUser) {
      return false;
    }
    const response = await fetch(`${BaseService.API_BASE_PATH}/logout`, { method: "POST" });
    if (response.ok) {
      if (this.currentUserState.setCurrentUser) {
        this.currentUserState.setCurrentUser(undefined);
      }
      return true;
    }
    return false;
  }
}
