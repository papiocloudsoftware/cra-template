import { List, ListItemButton, ListProps } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";

import { useCurrentUser } from "../../../hooks/use-current-user";
import { AppRoute, RouteDetails } from "../../../routes";
import { StyledTooltip } from "../../styled/styled-tooltip";
import { SignInAction } from "../../user/sign-in-action";
import { SignInIcon } from "../../user/sign-in-icon";
import { SignOutAction } from "../../user/sign-out-action";
import { SignOutIcon } from "../../user/sign-out-icon";

interface NavigationItemProps {
  readonly route: AppRoute;
  readonly onClick?: () => void;
}

function NavigationItem(props: NavigationItemProps) {
  const route = props.route;
  return (
    <StyledTooltip title={route.Details} placement={"right"}>
      <div>
        <route.Link>
          <ListItemButton onClick={props.onClick}>
            <ListItemIcon style={{ margin: "auto" }}>
              <route.Icon />
            </ListItemIcon>
            <ListItemText primary={route.Text} />
          </ListItemButton>
        </route.Link>
      </div>
    </StyledTooltip>
  );
}

interface SignedInItemsProps extends ListProps {
  readonly onNavigate?: () => void;
}

function SignedInItems(props: SignedInItemsProps) {
  const { onNavigate, ...listProps } = props;
  return (
    <List {...listProps}>
      <StyledTooltip title={"Done? Sign out to finish"} placement={"right"}>
        <SignOutAction onClose={onNavigate}>
          <ListItemButton>
            <ListItemIcon style={{ margin: "auto" }}>
              <SignInIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign Out"} />
          </ListItemButton>
        </SignOutAction>
      </StyledTooltip>
    </List>
  );
}

interface SignedOutItemsProps extends ListProps {
  readonly onNavigate?: () => void;
}

function SignedOutItems(props: SignedOutItemsProps) {
  const { onNavigate, ...listProps } = props;
  return (
    <List {...listProps}>
      <StyledTooltip title={"Sign in to begin"} placement={"right"}>
        <SignInAction onClose={onNavigate}>
          <ListItemButton>
            <ListItemIcon style={{ margin: "auto" }}>
              <SignOutIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign In"} />
          </ListItemButton>
        </SignInAction>
      </StyledTooltip>
    </List>
  );
}

/**
 * Properties for ListItemButtons
 */
export interface MenuItemsProps {
  readonly routes?: AppRoute[];
  readonly onNavigate?: () => void;
}

export function MenuItems(props: MenuItemsProps) {
  const currentUser = useCurrentUser();
  const menuRoutes: AppRoute[] = props.routes || Object.values(RouteDetails);

  const UserList = currentUser ? SignedInItems : SignedOutItems;

  return (
    <Box className={""} sx={{ margin: "-3px 0", overflow: "auto" }}>
      <List sx={{ padding: "0" }}>
        {menuRoutes.map((route, index) => (
          <NavigationItem key={index} route={route} onClick={props.onNavigate} />
        ))}
      </List>
      <Divider />
      <UserList sx={{ padding: "0" }} onNavigate={props.onNavigate} />
    </Box>
  );
}
