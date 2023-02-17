import React, { PropsWithChildren, useCallback, useContext, useState } from "react";

import { StyledOverlayProps } from "../components/styled/styled-overlay";

export type ShowModalFunction = (modalData: ModalData, stack?: boolean) => void;

/**
 * Modal data, includes props for overlay and element to render
 */
export interface ModalData {
  readonly id: string;
  readonly props?: Omit<StyledOverlayProps, "visible">;
  readonly element: JSX.Element;
}

/**
 * State data for the currently logged in user
 */
export interface ModalState {
  readonly modalStack: ModalData[];
  readonly showModal: ShowModalFunction;
  readonly hideModal: (id: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const emptyFunction = () => {
  console.log("Empty function!");
};

const ModalContext = React.createContext<ModalState>({
  modalStack: [],
  showModal: emptyFunction,
  hideModal: emptyFunction
});

export function useModalState(): ModalState {
  return useContext(ModalContext);
}

export function ModalStateProvider(props: PropsWithChildren<unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const [state, setState] = useState<ModalState>({
    modalStack: [],
    showModal: emptyFunction,
    hideModal: emptyFunction
  });
  const showModal = useCallback((modalData: ModalData, stack?: boolean) => {
    setState((prevState) => {
      const newStack = prevState.modalStack.filter((e) => e.id !== modalData.id);
      if (stack === true || newStack.length === 0) {
        newStack.push(modalData);
      } else {
        newStack[newStack.length - 1] = modalData;
      }
      return {
        ...prevState,
        modalStack: newStack
      };
    });
  }, []);
  const hideModal = useCallback((id: string) => {
    setState((prevState) => {
      const newStack = prevState.modalStack.filter((e) => e.id !== id);
      return {
        ...prevState,
        modalStack: newStack
      };
    });
  }, []);

  if (state.showModal === emptyFunction || state.hideModal === emptyFunction) {
    setState((prevState) => ({ ...prevState, showModal, hideModal }));
  }

  return <ModalContext.Provider value={state}>{props.children}</ModalContext.Provider>;
}
