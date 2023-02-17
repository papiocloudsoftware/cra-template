import React from "react";
import { Route } from "react-router-dom";

import { sampleTool2Path, SampleTool2Route } from "./sample-tool2-route";
import { subtoolPath, SubtoolRoute } from "./subtool-route";

export * from "./sample-tool2-route";
export * from "./subtool-route";

const routes: { [key: string]: JSX.Element } = {
  [subtoolPath]: <SubtoolRoute />,
  // `${consolAssistPath}/*` must be last
  [`${sampleTool2Path}/*`]: <SampleTool2Route />
};

export const AllRoutes = Object.keys(routes).map((key) => {
  return <Route key={key} path={key} element={routes[key]} />;
});
