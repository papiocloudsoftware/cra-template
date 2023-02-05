import React, { forwardRef, HTMLAttributes, Ref, useCallback, useState } from "react";

import { SignOutConfirmation } from "./sign-out-confirmation";

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

  const closeConfirmation = useCallback(() => {
    setState((prevState) => ({ ...prevState, signingOut: false }));
  }, []);
  const signOutCallback = useCallback(() => {
    setState((prevState) => ({ ...prevState, signingOut: true }));
  }, []);

  return (
    <>
      <div {...props.actionProps} onClick={signOutCallback} ref={props.innerRef} />
      <SignOutConfirmation visible={state.signingOut} onClose={closeConfirmation} />
    </>
  );
}

export const SignOutAction = forwardRef<HTMLDivElement, SignOutActionProps>((props, ref) => {
  return <InternalAction innerRef={ref} actionProps={props} />;
});

SignOutAction.displayName = "SignOutAction";
