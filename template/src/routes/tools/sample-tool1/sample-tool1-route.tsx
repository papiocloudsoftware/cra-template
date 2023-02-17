import React from "react";

import { PublicRouteLinkProps, RouteLink } from "../../../components/navigation/links/route-link";

export const sampleTool1Path = "/sample-tool-1";

export function SampleTool1Route() {
  return <div>TODO: Sample Tool 1</div>;
}

export function SampleTool1Link(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={sampleTool1Path} />;
}
