import React, { CSSProperties, forwardRef, HTMLAttributes, Ref, useCallback } from "react";

import { useModals } from "../../hooks/use-modals";

/** Props to create SignInAction */
export interface SignInActionProps extends HTMLAttributes<HTMLDivElement> {
  readonly onClose?: () => void;
  readonly stack?: boolean;
}

interface InternalActionProps {
  readonly innerRef: Ref<HTMLDivElement>;
  readonly actionProps: SignInActionProps;
}

function InternalAction(props: InternalActionProps) {
  const modals = useModals();

  const { onClose, stack, ...divProps } = props.actionProps;

  const onClick = useCallback(() => {
    modals.signIn(onClose, stack);
  }, [modals.signIn, onClose]);

  const style: CSSProperties = { display: "inline", ...(divProps.style || {}) };

  return <div {...divProps} style={style} onClick={onClick} ref={props.innerRef} />;
}

export const SignInAction = forwardRef<HTMLDivElement, SignInActionProps>((props, ref) => {
  return <InternalAction innerRef={ref} actionProps={props} />;
});

SignInAction.displayName = "SignInAction";
