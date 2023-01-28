import * as jose from "jose";
import { createServer, Request } from "miragejs";
import { AnyRegistry } from "miragejs/-types";
import Schema from "miragejs/orm/schema";

import { AccessTokenPayload, AuthTokens, LoginPostBody, UserData } from "./application-types";

export function mockServer() {
  createServer({
    routes() {
      this.post("/api/login", login);
      this.post("/api/logout", logout);

      this.get("/api/user", getUser);
    }
  });
}

const fakeKey = "FakeKey";

async function sign(payload: any) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(fakeKey));
}

async function verify(jwt: string): Promise<AccessTokenPayload> {
  const { payload } = await jose.jwtVerify(jwt, new TextEncoder().encode(fakeKey));
  return payload as AccessTokenPayload;
}

function logout() {
  return {};
}

async function login(schema: Schema<AnyRegistry>, request: Request): Promise<AuthTokens> {
  const body = JSON.parse(request.requestBody) as LoginPostBody;
  const accessTokenPayload: AccessTokenPayload = {
    userId: "10001",
    username: body.username
  };
  const idTokenPayload = {};
  const refreshTokenPayload = {};
  return {
    token_type: "Bearer",
    access_token: await sign(accessTokenPayload),
    expires_in: 3600,
    id_token: await sign(idTokenPayload),
    expires_in_id: 3600,
    refresh_token: await sign(refreshTokenPayload),
    expires_in_refresh: 3600
  };
}

async function validateUser(request: Request): Promise<AccessTokenPayload | undefined> {
  const authHeader = request.requestHeaders.Authorization;
  if (!authHeader) {
    return Promise.resolve(undefined);
  }

  const parts = authHeader.split(" ");
  if (parts.length != 2) {
    return Promise.resolve(undefined);
  }
  try {
    return await verify(parts[0]);
  } catch (e) {
    return Promise.resolve(undefined);
  }
}

async function getUser(schema: Schema<AnyRegistry>, request: Request): Promise<UserData | Response> {
  const userData = await validateUser(request);
  if (!userData?.username) {
    return new Response(undefined, { status: 401 });
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
