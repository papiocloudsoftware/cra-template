import { Help } from "@mui/icons-material";
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { HTMLAttributes, useCallback, useState } from "react";

import { useCurrentUser } from "../../../hooks/use-current-user";
import { useModals } from "../../../hooks/use-modals";
import { CurrentUser } from "../../../service/user-types";
import { SignInAction } from "../../user/sign-in-action";
import { SignInIcon } from "../../user/sign-in-icon";
import { SignOutIcon } from "../../user/sign-out-icon";
import { UserIcon } from "../../user/user-icon";
import { HeaderAction } from "./header-action";

const useStyles = makeStyles({
  action: {
    paddingRight: "16px",
    height: "100%"
  },
  menu: {
    marginTop: "-6px"
  }
});

function userDetailsText(currentUser: CurrentUser): string {
  const contactInfo = currentUser.userData.contactInfo || {};
  return `${contactInfo.firstName} ${contactInfo.lastName}`;
}

function UserMenu(props: MenuProps) {
  const styles = useStyles();
  const modals = useModals();

  const signOut = useCallback(() => modals.signOut(), [modals.signOut]);

  return (
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
      <MenuItem onClick={signOut}>
        <ListItemIcon>
          <SignOutIcon />
        </ListItemIcon>
        <ListItemText>Sign Out</ListItemText>
      </MenuItem>
    </Menu>
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

  const openMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Opening user menu!");
    setState((prevState) => ({ ...prevState, menuAnchorElement: event.currentTarget }));
  }, []);
  const closeMenu = useCallback(() => {
    console.log("Closing user menu!");
    setState((prevState) => ({ ...prevState, menuAnchorElement: null }));
  }, []);

  if (!currentUser) {
    return (
      <div {...props}>
        <SignInAction style={{ height: "100%" }}>
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
        <UserMenu
          anchorEl={state.menuAnchorElement}
          open={state.menuAnchorElement !== null}
          onClose={closeMenu}
          onBlur={closeMenu}
        />
      </div>
    );
  }
}
