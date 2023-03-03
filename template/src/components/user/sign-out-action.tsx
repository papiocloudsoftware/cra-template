import React, { forwardRef, HTMLAttributes, Ref, useCallback } from 'react';

import { useModals } from '../../hooks/use-modals';

/**
 * Props to create SignOutAction
 */
export interface SignOutActionProps extends HTMLAttributes<HTMLDivElement> {
  readonly onClose?: () => void;
}

interface InternalActionProps {
  readonly onClose?: () => void;
  readonly innerRef: Ref<HTMLDivElement>;
  readonly actionProps: SignOutActionProps;
}

function InternalAction(props: InternalActionProps) {
  const modal = useModals();

  const signOut = useCallback(() => {
    modal.signOut(props.onClose);
  }, [props.onClose]);

  return <div {...props.actionProps} onClick={signOut} ref={props.innerRef} />;
}

export const SignOutAction = forwardRef<HTMLDivElement, SignOutActionProps>(
  (props, ref) => {
    return (
      <InternalAction
        onClose={props.onClose}
        innerRef={ref}
        actionProps={props}
      />
    );
  }
);

SignOutAction.displayName = 'SignOutAction';
