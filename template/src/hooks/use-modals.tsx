import { Theme, useTheme } from '@mui/material/styles';
import React, { useCallback } from 'react';

import { SignInDialog } from '../components/user/sign-in-dialog';
import { SignOutConfirmation } from '../components/user/sign-out-confirmation';
import {
  ModalData,
  ModalState,
  ShowModalFunction,
  useModalState,
} from './use-modal-state';
import { useSxMerge } from './use-sx-merge';

/**
 * Object to manage modal components
 */
export interface Modals extends Omit<ModalState, 'modalStack'> {
  readonly showConfirmation: ShowModalFunction;
  readonly signIn: (onClose?: () => void, stack?: boolean) => void;
  readonly signOut: (onClose?: () => void) => void;
}

function showConfirmation(
  modalState: ModalState,
  theme: Theme,
  modalData: ModalData,
  stack?: boolean
) {
  const props = modalData.props || {};
  const sx = useSxMerge(
    theme,
    {
      maxWidth: '500px',
    },
    props.sx
  );
  modalState.showModal(
    {
      ...modalData,
      props: {
        ...props,
        sx,
      },
    },
    stack
  );
}

interface SignInModalProps {
  readonly onClose?: () => void;
}

function SignInModal(props: SignInModalProps) {
  const modalState = useModalState();
  const closeConfirmation = useCallback(() => {
    modalState.hideModal();
    if (props.onClose) {
      props.onClose();
    }
  }, [modalState.hideModal, props.onClose]);
  return <SignInDialog onClose={closeConfirmation} />;
}

function signIn(modalState: ModalState, onClose?: () => void, stack?: boolean) {
  modalState.showModal(
    {
      element: <SignInModal onClose={onClose} />,
    },
    stack
  );
}

interface SignOutModalProps {
  readonly onClose?: () => void;
}

function SignOutModal(props: SignOutModalProps) {
  const modalState = useModalState();
  const closeConfirmation = useCallback(() => {
    modalState.hideModal();
    if (props.onClose) {
      props.onClose();
    }
  }, [modalState.hideModal, props.onClose]);
  return <SignOutConfirmation onClose={closeConfirmation} />;
}

function signOut(modalState: ModalState, theme: Theme, onClose?: () => void) {
  showConfirmation(modalState, theme, {
    element: <SignOutModal onClose={onClose} />,
  });
}

export function useModals(): Modals {
  const modalState = useModalState();
  const theme = useTheme();
  const showConfirmationCallback = useCallback(
    (modalData: ModalData, stack?: boolean) => {
      showConfirmation(modalState, theme, modalData, stack);
    },
    [modalState]
  );
  const signInCallback = useCallback(
    (onClose?: () => void, stack?: boolean) => {
      signIn(modalState, onClose, stack);
    },
    [modalState]
  );
  const signOutCallback = useCallback(
    (onClose?: () => void) => {
      signOut(modalState, theme, onClose);
    },
    [modalState, theme]
  );
  return {
    showModal: modalState.showModal,
    hideModal: modalState.hideModal,
    showConfirmation: showConfirmationCallback,
    signIn: signInCallback,
    signOut: signOutCallback,
  };
}
