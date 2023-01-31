import React, { PropsWithChildren, useCallback, useState } from "react";

import { SignInOverlay } from "./sign-in-overlay";

/** Props to create SignInAction */
export interface SignInActionProps {}

interface SignInActionState {
  readonly signingIn: boolean;
}

export function SignInAction(props: PropsWithChildren<SignInActionProps>) {
  const [state, setState] = useState<SignInActionState>({ signingIn: false });

  const onClick = useCallback(() => setState((prevState) => ({ ...prevState, signingIn: true })), [setState]);
  const onClose = useCallback(() => setState((prevState) => ({ ...prevState, signingIn: false })), [setState]);
  return (
    <>
      <div onClick={onClick}>{props.children}</div>
      <SignInOverlay visible={state.signingIn} onClose={onClose} />
    </>
  );
}
