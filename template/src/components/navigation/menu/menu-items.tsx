import * as icons from "@mui/icons-material";
import { List, ListItemButton } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useCallback } from "react";

import { AppRoute, RouteDetails } from "../../../routes";
import { ColorPalette } from "../../../style/color-palete";
import { SignInAction } from "../../sign-in/sign-in-action";
import { SignInIcon } from "../../sign-in/sign-in-icon";
import { StyledTooltip } from "../../styled/styled-tooltip";

interface NavigationItemProps {
  readonly route: AppRoute;
}

function NavigationItem(props: NavigationItemProps) {
  const route = props.route;
  return (
    <StyledTooltip title={route.Details} placement={"right"}>
      <route.Link>
        <ListItemButton color={ColorPalette.primaryColorDark}>
          <ListItemIcon style={{ margin: "auto" }}>
            <route.Icon style={{ color: ColorPalette.primaryColorDark }} />
          </ListItemIcon>
          <ListItemText primary={route.Text} />
        </ListItemButton>
      </route.Link>
    </StyledTooltip>
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
  const menuRoutes: AppRoute[] = props.routes || Object.values(RouteDetails);

  const signInCallback = useCallback(() => {
    if (props.signInCallback) {
      props.signInCallback();
    }
  }, [props.signInCallback]);

  return (
    <Box className={""} sx={{ margin: "-3px 0", overflow: "auto" }}>
      <List sx={{ padding: "0" }}>
        {menuRoutes.map((route, index) => (
          <NavigationItem key={index} route={route} />
        ))}
      </List>
      <Divider />
      <List sx={{ padding: "0" }}>
        <SignInAction>
          <StyledTooltip title={"Sign in to begin"} placement={"right"}>
            <ListItemButton color={ColorPalette.primaryColorDark}>
              <ListItemIcon style={{ margin: "auto" }}>
                <SignInIcon style={{ color: ColorPalette.primaryColorDark }} />
              </ListItemIcon>
              <ListItemText primary={"Sign In"} />
            </ListItemButton>
          </StyledTooltip>
        </SignInAction>
      </List>
    </Box>
  );
}
