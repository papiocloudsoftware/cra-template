import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import React, { CSSProperties, forwardRef, HTMLAttributes, Ref, useCallback } from "react";

import { useModals } from "../../hooks/use-modals";

enum AuthMode {
  GOOGLE,
  SERVER
}

const AUTH_MODE: AuthMode = AuthMode.SERVER;
const GOOGLE_AUTH_CLIENT_ID = "<insert-here>";

/** Props to create SignInAction */
export interface SignInActionProps extends HTMLAttributes<HTMLDivElement> {
  readonly onClose?: () => void;
  readonly stack?: boolean;
}

interface ServerAuthActionProps extends SignInActionProps {
  readonly innerRef: Ref<HTMLDivElement>;
}

function ServerAuthAction(props: ServerAuthActionProps) {
  const modals = useModals();

  const { onClose, stack, innerRef, ...divProps } = props;

  const onClick = useCallback(() => {
    modals.signIn(onClose, stack);
  }, [modals.signIn, onClose]);

  const style: CSSProperties = { display: "inline", ...(divProps.style || {}) };

  return <div {...divProps} style={style} onClick={onClick} ref={innerRef} />;
}

interface GoogleOAuthActionProps extends Omit<SignInActionProps, "stack" | "onClose"> {
  readonly innerRef: Ref<HTMLDivElement>;
}

function GoogleOAuthInternalAction(props: GoogleOAuthActionProps) {
  const { innerRef, ...divProps } = props;

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(JSON.stringify(tokenResponse));
    },
    onError: (tokenResponse) => {
      console.log(JSON.stringify(tokenResponse));
    },
    onNonOAuthError: (nonOAuthError) => {
      console.log(JSON.stringify(nonOAuthError));
    },
    prompt: "select_account"
  });

  const onClick = useCallback(() => {
    login();
  }, [login]);

  const style: CSSProperties = { display: "inline", ...(divProps.style || {}) };

  return <div {...divProps} style={style} onClick={onClick} ref={innerRef} />;
}

function GoogleOAuthAction(props: GoogleOAuthActionProps) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_AUTH_CLIENT_ID}>
      <GoogleOAuthInternalAction {...props} />
    </GoogleOAuthProvider>
  );
}

export const SignInAction = forwardRef<HTMLDivElement, SignInActionProps>((props, ref) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return AUTH_MODE === AuthMode.GOOGLE ? (
    <GoogleOAuthAction innerRef={ref} {...props} />
  ) : (
    <ServerAuthAction innerRef={ref} {...props} />
  );
});

SignInAction.displayName = "SignInAction";
