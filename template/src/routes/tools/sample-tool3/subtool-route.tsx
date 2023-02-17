import React from "react";

import { PublicRouteLinkProps, RouteLink } from "../../../components/navigation/links/route-link";
import { sampleTool3Path } from "./sample-tool3-route";

export function SubtoolRoute() {
  return <div>TODO: Sample Tool 3 - Sub Tool</div>;
}

export const subtoolPath = `${sampleTool3Path}/sub-tool`;

export function CreateAnalysisLink(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={subtoolPath} />;
}
