import * as icons from "@mui/icons-material";
import React from "react";

import * as links from "../components/navigation/links";
import { PublicRouteLinkProps } from "../components/navigation/links/route-link";
import * as routes from "./all-routes";

/**
 * Route for the application
 */
export interface AppRoute {
  readonly Text: string;
  readonly Route: React.FunctionComponent<any>;
  readonly Link: React.FunctionComponent<PublicRouteLinkProps>;
  readonly Icon: icons.SvgIconComponent;
  readonly Details: string;
  readonly Path: string;
}

export const RouteDetails: { [key: string]: AppRoute } = {
  Home: {
    Text: "Home",
    Route: routes.HomeRoute,
    Path: links.homePath,
    Link: links.HomeLink,
    Icon: icons.Home,
    Details: "Go to the home page"
  },
  Route1: {
    Text: "Route 1",
    Route: routes.Route1,
    Path: links.route1Path,
    Link: links.Route1Link,
    Icon: icons.Home,
    Details: "Go to the 1st route"
  },
  Route2: {
    Text: "Route 2",
    Route: routes.Route2,
    Path: links.route2Path,
    Link: links.Route2Link,
    Icon: icons.Home,
    Details: "Go to the 2nd route"
  },
  Route3: {
    Text: "Route 3",
    Route: routes.Route3,
    Path: links.route3Path,
    Link: links.Route3Link,
    Icon: icons.Home,
    Details: "Go to the 3rd route"
  }
};
