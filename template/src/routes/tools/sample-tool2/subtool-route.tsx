import React from 'react';

import {
  PublicRouteLinkProps,
  RouteLink,
} from '../../../components/navigation/links/route-link';
import { sampleTool2Path } from './sample-tool2-route';

export function SubtoolRoute() {
  return <div>TODO: Sample Tool 2 - Sub Tool</div>;
}

export const subtoolPath = `${sampleTool2Path}/sub-tool`;

export function CreateAnalysisLink(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={subtoolPath} />;
}
