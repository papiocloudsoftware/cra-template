import { makeStyles } from "@mui/styles";
import React from "react";
import { Link, LinkProps } from "react-router-dom";

import { useClasses } from "../../hooks/use-classes";

export const useStyles = makeStyles({
  link: {
    color: "inherit",
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer"
    }
  }
});

export function StyledLink(props: LinkProps) {
  const styles = useStyles();
  const className = useClasses(props, styles.link);
  return <Link {...props} className={className} />;
}
