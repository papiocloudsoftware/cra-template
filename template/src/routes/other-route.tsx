import React from 'react';

import {
  PublicRouteLinkProps,
  RouteLink,
} from '../components/navigation/links/route-link';

export function OtherRoute() {
  return <div>TODO: Other</div>;
}

export const otherPath = '/other';

export function OtherLink(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={otherPath} />;
}
