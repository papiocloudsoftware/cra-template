import React from "react";

import { PublicRouteLinkProps, RouteLink } from "../components/navigation/links/route-link";

export function Route2() {
  return <div>Route 2</div>;
}

export const route2Path = "/route-2";

export function Route2Link(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={route2Path} />;
}
