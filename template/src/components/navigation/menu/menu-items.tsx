import * as icons from "@mui/icons-material";
import { List, ListItemButton } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useCallback } from "react";

import { AppRoute, RouteDetails } from "../../../routes";
import { SignInLink } from "../links";

interface NavigationItemProps {
  readonly text: string;
  readonly icon: icons.SvgIconComponent;
}

function NavigationItem(props: NavigationItemProps) {
  return (
    <ListItemButton>
      <ListItemIcon style={{ margin: "auto" }}>{<props.icon />}</ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItemButton>
  );
}

/**
 * Properties for MenuItems
 */
export interface MenuItemsProps {
  readonly routes?: AppRoute[];
  readonly signInCallback?: () => void;
}

export function MenuItems(props: MenuItemsProps) {
  const menuRoutes: AppRoute[] = props.routes || [RouteDetails.Home];

  const signInCallback = useCallback(() => {
    if (props.signInCallback) {
      props.signInCallback();
    }
  }, [props.signInCallback]);

  return (
    <Box className={""} sx={{ margin: "-3px 0", overflow: "auto" }}>
      <List sx={{ padding: "0" }}>
        {menuRoutes.map((route, index) => (
          <route.Link key={index}>
            <NavigationItem text={route.Text} icon={route.Icon} />
          </route.Link>
        ))}
      </List>
      <Divider />
      <List sx={{ padding: "0" }}>
        <SignInLink onClick={signInCallback}>
          <NavigationItem text={"Sign In"} icon={icons.Login} />
        </SignInLink>
      </List>
    </Box>
  );
}
