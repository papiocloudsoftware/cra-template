import React from "react";

import { PublicRouteLinkProps, RouteLink } from "../components/navigation/links/route-link";

export function Route1() {
  return <div>Route 1</div>;
}

export const route1Path = "/route-1";

export function Route1Link(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={route1Path} />;
}
