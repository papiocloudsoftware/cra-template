import React from "react";

import { PublicRouteLinkProps, RouteLink } from "../components/navigation/links/route-link";

export function HomeRoute() {
  return <div>Home Route</div>;
}

export const homePath = "/";

export function HomeLink(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={homePath} />;
}
