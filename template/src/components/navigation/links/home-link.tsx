import React from "react";

import { PublicRouteLinkProps, RouteLink } from "./route-link";

export const homePath = "/";

export function HomeLink(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={homePath} />;
}
