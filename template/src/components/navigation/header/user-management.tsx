import React, { HTMLAttributes } from "react";

import { useCurrentUser } from "../../../hooks/use-current-user";
import { SignInAction } from "../../sign-in/sign-in-action";
import { SignInIcon } from "../../sign-in/sign-in-icon";
import { HeaderAction } from "./header-action";

/** Props to create UserManagement */
export interface UserManagementProps extends HTMLAttributes<HTMLDivElement> {}

export function UserManagement(props: UserManagementProps) {
  const currentUser = useCurrentUser();

  if (!currentUser?.userData) {
    return (
      <div {...props}>
        <SignInAction>
          <HeaderAction description={"Sign in to begin"} style={{ paddingRight: "16px" }}>
            <SignInIcon style={{ marginRight: "12px" }} />
            Sign In
          </HeaderAction>
        </SignInAction>
      </div>
    );
  }
  return <>?</>;
}
