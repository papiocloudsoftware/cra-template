import React, { forwardRef, HTMLAttributes, Ref, useCallback, useState } from "react";

import { useCurrentUserState } from "../../hooks/use-current-user-state";
import { UserService } from "../../service/user-service";
import { StyledConfirmation } from "../styled/styled-confirmation";

/**
 * Props to create SignOutAction
 */
export interface SignOutActionProps extends HTMLAttributes<HTMLDivElement> {}

interface SignOutActionState {
  readonly signingOut: boolean;
}

interface InternalActionProps {
  readonly innerRef: Ref<HTMLDivElement>;
  readonly actionProps: SignOutActionProps;
}

function InternalAction(props: InternalActionProps) {
  const [state, setState] = useState<SignOutActionState>({ signingOut: false });
  const userService = new UserService(useCurrentUserState());

  const closeConfirmation = useCallback(() => {
    setState((prevState) => ({ ...prevState, signingOut: false }));
  }, []);
  const signOutCallback = useCallback(() => {
    setState((prevState) => ({ ...prevState, signingOut: true }));
  }, []);
  const doSignOut = useCallback(async () => {
    await userService.logout();
    closeConfirmation();
  }, [userService]);
  return (
    <>
      <div {...props.actionProps} onClick={signOutCallback} ref={props.innerRef} />
      <StyledConfirmation
        title="Sign Out"
        message="Are you sure you want to sign out?"
        confirmText="Sign Out"
        visible={state.signingOut}
        onConfirm={doSignOut}
        onCancel={closeConfirmation}
      />
    </>
  );
}

export const SignOutAction = forwardRef<HTMLDivElement, SignOutActionProps>((props, ref) => {
  return <InternalAction innerRef={ref} actionProps={props} />;
});

SignOutAction.displayName = "SignOutAction";
