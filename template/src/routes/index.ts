import * as icons from "@mui/icons-material";
import React from "react";

import * as links from "../components/navigation/links";
import { PublicRouteLinkProps } from "../components/navigation/links/route-link";
import { HomeRoute } from "./home-route";

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
    Route: HomeRoute,
    Path: links.homePath,
    Link: links.HomeLink,
    Icon: icons.Home,
    Details: "Go to the home page"
  }
};
