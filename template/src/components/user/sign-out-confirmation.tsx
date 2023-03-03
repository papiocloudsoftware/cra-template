import React, { useCallback } from 'react';

import { useCurrentUserState } from '../../hooks/use-current-user-state';
import { UserService } from '../../service/user-service';
import {
  StyledConfirmation,
  StyledConfirmationProps,
} from '../styled/styled-confirmation';

/**
 * Props to create SignOutConfirmation
 */
export interface SignOutConfirmationProps
  extends Omit<
    StyledConfirmationProps,
    'title' | 'message' | 'confirmText' | 'onConfirm' | 'onCancel'
  > {
  readonly onClose: () => void;
}

export function SignOutConfirmation(props: SignOutConfirmationProps) {
  const currentUserState = useCurrentUserState();
  const onConfirm = useCallback(async () => {
    const userService = new UserService(currentUserState);
    await userService.logout();
    props.onClose();
  }, []);
  return (
    <StyledConfirmation
      title="Sign Out"
      message="Are you sure you want to sign out?"
      confirmText="Sign Out"
      onConfirm={onConfirm}
      onCancel={props.onClose}
      {...props}
    />
  );
}
