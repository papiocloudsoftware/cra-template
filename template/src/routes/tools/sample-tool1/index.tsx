import React from 'react';
import { Route } from 'react-router-dom';

import { sampleTool1Path, SampleTool1Route } from './sample-tool1-route';
import { subtoolPath, SubtoolRoute } from './subtool-route';

export * from './sample-tool1-route';
export * from './subtool-route';

const routes: { [key: string]: JSX.Element } = {
  [subtoolPath]: <SubtoolRoute />,
  // `${consolAssistPath}/*` must be last
  [`${sampleTool1Path}/*`]: <SampleTool1Route />,
};

export const AllRoutes = Object.keys(routes).map((key) => {
  return <Route key={key} path={key} element={routes[key]} />;
});
