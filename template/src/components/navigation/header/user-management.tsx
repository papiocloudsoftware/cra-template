import { makeStyles } from "@mui/styles";
import React, { HTMLAttributes } from "react";

import { useCurrentUser } from "../../../hooks/use-current-user";
import { CurrentUser } from "../../../service/user-types";
import { SignInAction } from "../../user/sign-in-action";
import { SignInIcon } from "../../user/sign-in-icon";
import { UserIcon } from "../../user/user-icon";
import { HeaderAction } from "./header-action";

const useStyles = makeStyles({
  action: {
    paddingRight: "16px"
  }
});

function userDetailsText(currentUser: CurrentUser): string {
  const contactInfo = currentUser.userData.contactInfo || {};
  return `${contactInfo.firstName} ${contactInfo.lastName}`;
}

/** Props to create UserManagement */
export interface UserManagementProps extends HTMLAttributes<HTMLDivElement> {}

export function UserManagement(props: UserManagementProps) {
  const styles = useStyles();
  const currentUser = useCurrentUser();

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
        <HeaderAction description={"Click to manage your account"} className={styles.action}>
          {userDetails}
          <UserIcon style={{ marginLeft: "12px" }} />
        </HeaderAction>
      </div>
    );
  }
}
