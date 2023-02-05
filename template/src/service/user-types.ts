import { JWTPayload } from "jose";

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
 * Base payload stored in all tokens
 */
export interface TokenPayload extends JWTPayload, User {
  readonly type: "access" | "id" | "refresh";
}

/**
 * Payload data stored in the access token
 */
export interface AccessTokenPayload extends TokenPayload {
  readonly type: "access";
}

/**
 * Payload data stored in the id token
 */
export interface IdTokenPayload extends TokenPayload {
  readonly type: "id";
}

/**
 * Payload data stored in the refresh token
 */
export interface RefreshTokenPayload extends TokenPayload {
  readonly type: "refresh";
}

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
  readonly requestedTime: Date;
  readonly userData: UserData;
}

/**
 * Response data for a successful login
 */
export interface AuthTokens {
  readonly token_type?: string;
  readonly access_token?: string;
  readonly id_token?: string;
}

/**
 * POST body for /login
 */
export interface LoginPostBody {
  readonly username?: string;
  readonly password?: string;
}

/**
 * POST body for /reset-password
 */
export interface ResetPasswordPostBody {
  readonly username?: string;
}
