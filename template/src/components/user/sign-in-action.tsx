import React, { forwardRef, HTMLAttributes, Ref, useCallback, useState } from "react";

import { SignInOverlay } from "./sign-in-overlay";

/** Props to create SignInAction */
export interface SignInActionProps extends HTMLAttributes<HTMLDivElement> {}

interface InternalActionProps {
  readonly innerRef: Ref<HTMLDivElement>;
  readonly actionProps: SignInActionProps;
}

function InternalAction(props: InternalActionProps) {
  const [state, setState] = useState<SignInActionState>({ signingIn: false });

  const onClick = useCallback(() => setState((prevState) => ({ ...prevState, signingIn: true })), [setState]);
  const onClose = useCallback(() => setState((prevState) => ({ ...prevState, signingIn: false })), [setState]);
  return (
    <>
      <div {...props.actionProps} onClick={onClick} ref={props.innerRef} />
      <SignInOverlay visible={state.signingIn} onClose={onClose} />
    </>
  );
}

interface SignInActionState {
  readonly signingIn: boolean;
}

export const SignInAction = forwardRef<HTMLDivElement, SignInActionProps>((props, ref) => {
  return <InternalAction innerRef={ref} actionProps={props} />;
});

SignInAction.displayName = "SignInAction";
