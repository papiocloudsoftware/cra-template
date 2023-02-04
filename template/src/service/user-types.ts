import { ApplicationSettings } from "./application-types";

/**
 * Information needed to contact a user
 */
export interface ContactInfo {
  /** Contact person's first name */
  readonly firstName?: string;
  /** Contact person's first name */
  readonly lastName?: string;
  /** Contact person's email address */
  readonly email?: string;
}

/** Identifies a user */
export interface User {
  readonly userId?: string;
  readonly username?: string;
}

/**
 * Payload data stored in the access token
 */
export interface AccessTokenPayload extends User {}

/**
 * Data about a user
 */
export interface UserData extends User {
  readonly contactInfo?: ContactInfo;
  readonly applicationSettings?: ApplicationSettings;
}

/**
 * Currently logged in user data
 */
export interface CurrentUser {
  readonly requestedTime?: Date;
  readonly userData?: UserData;
  readonly authTokens?: AuthTokens;
}

/**
 * Response data for a successful login
 */
export interface AuthTokens {
  readonly token_type?: string;
  readonly access_token?: string;
  readonly expires_in?: number;
  readonly id_token?: string;
  readonly expires_in_id?: number;
  readonly refresh_token?: string;
  readonly expires_in_refresh?: number;
}

/**
 * POST body for /login
 */
export interface LoginPostBody {
  readonly username?: string;
  readonly password?: string;
}
