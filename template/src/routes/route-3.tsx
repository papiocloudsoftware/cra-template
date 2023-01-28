import React from "react";

import { PublicRouteLinkProps, RouteLink } from "../components/navigation/links/route-link";

export function Route3() {
  return <div>Route 3</div>;
}

export const route3Path = "/route-3";

export function Route3Link(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={route3Path} />;
}
