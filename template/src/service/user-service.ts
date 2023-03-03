import { CurrentUserState } from '../hooks/use-current-user-state';
import { BaseService } from './base-service';
import { LoginPostBody, ResetPasswordPostBody, UserData } from './user-types';

export class UserService extends BaseService {
  readonly currentUserState: CurrentUserState;

  constructor(currentUserState: CurrentUserState) {
    super();
    this.currentUserState = currentUserState;
  }

  async login(username: string, password: string): Promise<boolean> {
    const postBody: LoginPostBody = {
      username,
      password,
    };
    const response = await this.fetch(`${UserService.API_BASE_PATH}/login`, {
      method: 'POST',
      body: JSON.stringify(postBody),
    });
    if (response.ok) {
      await this.storeAuthTokens(response);
      const userData = await this.getUserData();
      if (userData) {
        this.currentUserState.setCurrentUser({
          userData,
          requestedTime: new Date(),
        });
        return true;
      }
    }
    return false;
  }

  async logout(): Promise<boolean> {
    const response = await fetch(`${UserService.API_BASE_PATH}/logout`, {
      method: 'POST',
    });
    if (response.ok) {
      localStorage.removeItem(UserService.AUTHORIZATION_KEY);
      this.currentUserState.setCurrentUser(undefined);
      return true;
    }
    return false;
  }

  async getUserData(): Promise<UserData | undefined> {
    const response = await this.fetch(`${UserService.API_BASE_PATH}/user`);
    if (response.ok) {
      return (await response.json()) as UserData;
    }
    return undefined;
  }

  async resetPassword(username: string): Promise<boolean> {
    const postBody: ResetPasswordPostBody = {
      username,
    };
    const response = await fetch(
      `${BaseService.API_BASE_PATH}/reset-password`,
      {
        method: 'POST',
        body: JSON.stringify(postBody),
      }
    );
    if (response.ok) {
      this.currentUserState.setCurrentUser(undefined);
      return true;
    }
    return false;
  }
}
