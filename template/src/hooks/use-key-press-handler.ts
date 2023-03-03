import { KeyboardEvent, KeyboardEventHandler, useCallback } from 'react';

export function useKeyPressHandler<T extends HTMLElement>(
  actions: { [key: string]: () => void },
  fallbackHandler?: KeyboardEventHandler<T>
): KeyboardEventHandler<T> {
  return useCallback(
    (e: KeyboardEvent<T>) => {
      const action = actions[e.key];
      if (action) {
        action();
      } else if (fallbackHandler) {
        fallbackHandler(e);
      }
    },
    [actions, fallbackHandler]
  );
}
