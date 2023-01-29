import { Login } from "@mui/icons-material";
import React from "react";

import { useCurrentUser } from "../../hooks/use-current-user";
import { HeaderAction } from "./header-action";
import { SignInLink } from "./links";

/** Props to create UserManagement */
export interface UserManagementProps {}

export function UserManagement(props: UserManagementProps) {
  const currentUser = useCurrentUser();
  if (!currentUser?.userData) {
    return (
      <HeaderAction description={"Sign in to begin"}>
        <Login style={{ marginRight: "12px" }} />
        Sign In
      </HeaderAction>
    );
  }
  return <>?</>;
}
