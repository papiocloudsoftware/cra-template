import React from "react";

import { PublicRouteLinkProps, RouteLink } from "../../../components/navigation/links/route-link";
import { sampleTool1Path } from "./sample-tool1-route";

export function SubtoolRoute() {
  return <div>TODO: Sample Tool 1 - Sub Tool</div>;
}

export const subtoolPath = `${sampleTool1Path}/sub-tool`;

export function CreateAnalysisLink(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={subtoolPath} />;
}
