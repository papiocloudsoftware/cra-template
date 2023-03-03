import React from 'react';

import {
  PublicRouteLinkProps,
  RouteLink,
} from '../components/navigation/links/route-link';

export function SupportRoute() {
  return <div>TODO: Support</div>;
}

export const supportPath = '/support';

export function SupportLink(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={supportPath} />;
}
