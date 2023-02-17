import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { HTMLAttributes, PropsWithChildren } from "react";

import { useClasses } from "../../../hooks/use-classes";
import { StyledTooltip } from "../../styled/styled-tooltip";

const useStyles = makeStyles({
  action: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    transition: "background-color 0.25s",
    minWidth: "0 !important",
    "&:hover": {
      backgroundColor: "#0000000a !important"
    },
    whiteSpace: "nowrap"
  }
});

/** Props to create a HeaderAction */
export interface HeaderActionProps extends HTMLAttributes<HTMLElement> {
  readonly description: string;
}

export function HeaderAction(props: PropsWithChildren<HeaderActionProps>) {
  const styles = useStyles();
  const classes = useClasses(props, styles.action);
  return (
    <StyledTooltip title={props.description}>
      <Button size={"large"} {...props} className={classes} color={"inherit"} sx={{ borderRadius: 0 }}>
        {props.children}
      </Button>
    </StyledTooltip>
  );
}
