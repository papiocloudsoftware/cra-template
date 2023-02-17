import React from "react";

import { PublicRouteLinkProps, RouteLink } from "../../../components/navigation/links/route-link";

export const sampleTool2Path = "/sample-tool-2";

export function SampleTool2Route() {
  return <div>TODO: Sample Tool 2</div>;
}

export function SampleTool2Link(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={sampleTool2Path} />;
}
