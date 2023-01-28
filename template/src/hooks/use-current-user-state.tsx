import React, { PropsWithChildren, useContext, useState } from "react";

import { CurrentUser } from "../service/application-types";

type Callback = (prevState: CurrentUser) => CurrentUser;

/**
 * State data for the currently logged in user
 */
export interface CurrentUserState {
  readonly currentUser?: CurrentUser;
  readonly setCurrentUser?: (arg: CurrentUser | Callback) => void;
}

const CurrentUserContext = React.createContext<CurrentUserState>({});

export function useCurrentUserState(): CurrentUserState {
  return useContext(CurrentUserContext);
}

export function CurrentUserStateProvider(props: PropsWithChildren<unknown>) {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({});
  const currentUserState: CurrentUserState = {
    currentUser,
    setCurrentUser
  };
  return <CurrentUserContext.Provider value={currentUserState}>{props.children}</CurrentUserContext.Provider>;
}
