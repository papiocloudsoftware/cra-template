import React, { AnchorHTMLAttributes, PropsWithChildren } from "react";

export function SignInLink(props: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  return <a {...props}>{props.children}</a>;
}
