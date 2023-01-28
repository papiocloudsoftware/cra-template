import React from "react";
import { Link, LinkProps } from "react-router-dom";

import { useClasses } from "../../hooks/use-classes";
import { useStyles } from "../../hooks/use-styles";

export function StyledLink(props: LinkProps) {
  const styles = useStyles();
  const className = useClasses(props, styles.link);
  return <Link {...props} className={className} />;
}
