import * as jose from "jose";
import { createServer, Request, Response } from "miragejs";
import { AnyRegistry } from "miragejs/-types";
import Schema from "miragejs/orm/schema";

import {
  AccessTokenPayload,
  AuthTokens,
  IdTokenPayload,
  LoginPostBody,
  RefreshTokenPayload,
  TokenPayload,
  UserData
} from "./user-types";

export function mockServer() {
  createServer({
    routes() {
      this.post("/api/login", login);
      this.post("/api/logout", logout);
      this.post("/api/reset-password", resetPassword);
      this.post("/api/refresh-token", refreshToken);
      this.get("/api/user", getUser);

      // Default Responses for /api/
      this.post("/api/*", () => new Response(404));
      this.get("/api/*", () => new Response(404));
      this.put("/api/*", () => new Response(404));
      this.head("/api/*", () => new Response(404));
      this.delete("/api/*", () => new Response(404));
      this.options("/api/*", () => new Response(404));
    }
  });
}

const refreshTokenCookieName = "refresh_token";

function getCookieValue(cookieName: string): string | undefined {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === cookieName) {
      return value;
    }
  }
  return undefined;
}

const fakeKey = "FakeKey";

async function sign<T extends TokenPayload>(payload: T, expiresIn: string) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(new TextEncoder().encode(fakeKey));
}

async function verify<T extends TokenPayload>(jwt: string, excludeExp = false): Promise<T> {
  const { payload } = await jose.jwtVerify(jwt, new TextEncoder().encode(fakeKey), {
    algorithms: ["HS256"],
    currentDate: excludeExp ? new Date(0) : undefined
  });
  return payload as T;
}

async function logout() {
  document.cookie = `${refreshTokenCookieName}=; domain=localhost; expires=${new Date(0)};`;
  return {};
}

async function login(schema: Schema<AnyRegistry>, request: Request): Promise<AuthTokens> {
  const body = JSON.parse(request.requestBody) as LoginPostBody;
  const accessTokenPayload: AccessTokenPayload = {
    type: "access",
    userId: "10001",
    username: body.username
  };

  const refreshTokenPayload: RefreshTokenPayload = {
    ...accessTokenPayload,
    type: "refresh"
  };

  // Simulate cookie setting (ensure domain=<fqdn>; path=/api/refresh-token; expires set, Secure; SameSite=Strict; HttpOnly
  const cookieValue = await sign(refreshTokenPayload, "1d");
  const cookieExpires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  document.cookie = `${refreshTokenCookieName}=${cookieValue}; domain=localhost; expires=${cookieExpires.toUTCString()};`;
  return authTokensResponse(accessTokenPayload);
}

async function authTokensResponse(accessTokenPayload: AccessTokenPayload): Promise<AuthTokens> {
  const idTokenPayload: IdTokenPayload = {
    ...accessTokenPayload,
    type: "id"
  };
  return {
    token_type: "Bearer",
    access_token: await sign(accessTokenPayload, "15m"),
    id_token: await sign(idTokenPayload, "15m")
  };
}

async function validateAccessToken(request: Request, excludeExp = false): Promise<AccessTokenPayload | undefined> {
  const authHeader = request.requestHeaders.Authorization;
  if (!authHeader) {
    return Promise.resolve(undefined);
  }

  const parts = authHeader.split(" ");
  if (parts.length != 2) {
    return Promise.resolve(undefined);
  }
  try {
    const token: TokenPayload = await verify(parts[1], excludeExp);
    if (token.type === "access") {
      return token as AccessTokenPayload;
    }
  } catch (e) {
    console.error(e);
    return Promise.resolve(undefined);
  }
}

async function getUser(schema: Schema<AnyRegistry>, request: Request): Promise<UserData | Response> {
  const userData = await validateAccessToken(request);
  if (!userData?.username) {
    return new Response(401, {}, { error: "Unauthorized" });
  }

  return {
    ...userData,
    contactInfo: {
      firstName: "Max",
      lastName: "Schenkelberg",
      email: "max@papiocloud.com"
    }
  };
}

async function resetPassword(): Promise<Response> {
  return new Response(200);
}

async function refreshToken(schema: Schema<AnyRegistry>, request: Request): Promise<AuthTokens | Response> {
  try {
    const accessToken = await validateAccessToken(request, true);
    const refreshTokenString = getCookieValue(refreshTokenCookieName);
    if (accessToken && refreshTokenString) {
      const refreshToken: RefreshTokenPayload = await verify(refreshTokenString);
      if (refreshToken.type === "refresh") {
        return await authTokensResponse(accessToken);
      }
    }
  } catch (e) {
    console.error(e);
  }
  return new Response(401);
}
