import React, { HTMLAttributes, KeyboardEvent, PropsWithChildren, useCallback } from "react";

/**
 * Props to create KeyPressAction
 */
export interface KeyPressActionProps extends HTMLAttributes<HTMLDivElement> {
  readonly actions: { [key: string]: () => void };
}

export function KeyPressAction(props: PropsWithChildren<KeyPressActionProps>) {
  const { actions, ...divProps } = props;

  const onKeyUp = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const action = props.actions[e.key];
      if (action) {
        action();
      } else if (props.onKeyUp) {
        props.onKeyUp(e);
      }
    },
    [actions, props.onKeyUp]
  );

  return <div {...divProps} onKeyUp={onKeyUp} />;
}
