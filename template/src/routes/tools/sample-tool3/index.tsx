import React from "react";
import { Route } from "react-router-dom";

import { sampleTool3Path, SampleTool3Route } from "./sample-tool3-route";
import { subtoolPath, SubtoolRoute } from "./subtool-route";

export * from "./sample-tool3-route";
export * from "./subtool-route";

const routes: { [key: string]: JSX.Element } = {
  [subtoolPath]: <SubtoolRoute />,
  // `${consolAssistPath}/*` must be last
  [`${sampleTool3Path}/*`]: <SampleTool3Route />
};

export const AllRoutes = Object.keys(routes).map((key) => {
  return <Route key={key} path={key} element={routes[key]} />;
});
