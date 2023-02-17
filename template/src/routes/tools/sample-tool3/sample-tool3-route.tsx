import React from "react";

import { PublicRouteLinkProps, RouteLink } from "../../../components/navigation/links/route-link";

export const sampleTool3Path = "/sample-tool-3";

export function SampleTool3Route() {
  return <div>TODO: Sample Tool 3</div>;
}

export function SampleTool3Link(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={sampleTool3Path} />;
}
