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
  LaunchPad: {
    Text: "Home",
    Route: routes.HomeRoute,
    Path: links.homePath,
    Link: links.HomeLink,
    Icon: icons.Home,
    Details: "Go to the home page"
  },
  Other: {
    Text: "Other",
    Route: routes.OtherRoute,
    Path: links.otherPath,
    Link: links.OtherLink,
    Icon: icons.AccountTreeOutlined,
    Details: "Some other main path"
  },
  Settings: {
    Text: "Settings",
    Route: routes.SettingsRoute,
    Path: links.settingsPath,
    Link: links.SettingsLink,
    Icon: icons.Settings,
    Details: "Managed your settings"
  },
  Support: {
    Text: "Support",
    Route: routes.SupportRoute,
    Path: links.supportPath,
    Link: links.SupportLink,
    Icon: icons.Help,
    Details: "Get support"
  }
};
