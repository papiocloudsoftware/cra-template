import React from 'react';

import {
  PublicRouteLinkProps,
  RouteLink,
} from '../components/navigation/links/route-link';

export function SettingsRoute() {
  return <div>TODO: Settings</div>;
}

export const settingsPath = '/settings';

export function SettingsLink(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={settingsPath} />;
}
