import { Help } from "@mui/icons-material";
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { HTMLAttributes, useCallback, useState } from "react";

import { useCurrentUser } from "../../../hooks/use-current-user";
import { CurrentUser } from "../../../service/user-types";
import { SignInAction } from "../../user/sign-in-action";
import { SignInIcon } from "../../user/sign-in-icon";
import { SignOutConfirmation } from "../../user/sign-out-confirmation";
import { SignOutIcon } from "../../user/sign-out-icon";
import { UserIcon } from "../../user/user-icon";
import { HeaderAction } from "./header-action";

const useStyles = makeStyles({
  action: {
    paddingRight: "16px"
  },
  menu: {
    marginTop: "-6px"
  }
});

function userDetailsText(currentUser: CurrentUser): string {
  const contactInfo = currentUser.userData.contactInfo || {};
  return `${contactInfo.firstName} ${contactInfo.lastName}`;
}

interface UserMenuState {
  readonly signingOut: boolean;
}

function UserMenu(props: MenuProps) {
  const [state, setState] = useState<UserMenuState>({ signingOut: false });
  const styles = useStyles();

  const openSignOut = useCallback(() => setState((prevState) => ({ ...prevState, signingOut: true })), []);
  const closeSignOut = useCallback(() => setState((prevState) => ({ ...prevState, signingOut: false })), []);

  return (
    <>
      <SignOutConfirmation onClose={closeSignOut} visible={state.signingOut} />
      <Menu {...props} PopoverClasses={{ paper: styles.menu }}>
        <MenuItem>
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          <ListItemText>Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Help />
          </ListItemIcon>
          <ListItemText>Support</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={openSignOut}>
          <ListItemIcon>
            <SignOutIcon />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

/** Props to create UserManagement */
export interface UserManagementProps extends HTMLAttributes<HTMLDivElement> {}

interface UserManagementState {
  readonly menuAnchorElement: HTMLElement | null;
}

export function UserManagement(props: UserManagementProps) {
  const [state, setState] = useState<UserManagementState>({ menuAnchorElement: null });
  const styles = useStyles();
  const currentUser = useCurrentUser();

  const openMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setState((prevState) => ({ ...prevState, menuAnchorElement: event.currentTarget })),
    []
  );
  const closeMenu = useCallback(() => setState((prevState) => ({ ...prevState, menuAnchorElement: null })), []);

  console.log(state.menuAnchorElement?.className);

  if (!currentUser) {
    return (
      <div {...props}>
        <SignInAction>
          <HeaderAction description={"Sign in to begin"} className={styles.action}>
            <SignInIcon style={{ marginRight: "12px" }} />
            Sign In
          </HeaderAction>
        </SignInAction>
      </div>
    );
  } else {
    const userDetails = userDetailsText(currentUser);
    return (
      <div {...props}>
        <HeaderAction description={"Click to manage your account"} className={styles.action} onClick={openMenu}>
          {userDetails}
          <UserIcon style={{ marginLeft: "12px" }} />
        </HeaderAction>
        <UserMenu anchorEl={state.menuAnchorElement} open={state.menuAnchorElement !== null} onClose={closeMenu} />
      </div>
    );
  }
}
