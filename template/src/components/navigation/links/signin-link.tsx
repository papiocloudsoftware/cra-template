import React, { AnchorHTMLAttributes, PropsWithChildren } from "react";

import { useClasses } from "../../../hooks/use-classes";
import { useStyles } from "../../../hooks/use-styles";

export function SignInLink(props: PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>) {
  const styles = useStyles();
  const className = useClasses(props, styles.link);
  return (
    <a {...props} className={className}>
      {props.children}
    </a>
  );
}
