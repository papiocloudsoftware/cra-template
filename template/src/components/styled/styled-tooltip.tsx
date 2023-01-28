import { Tooltip } from "@mui/material";
import { TooltipProps } from "@mui/material/Tooltip/Tooltip";
import React from "react";
import { PropsWithChildren } from "react";

export function StyledTooltip(props: PropsWithChildren<TooltipProps>) {
  return (
    <Tooltip enterDelay={500} {...props}>
      {props.children}
    </Tooltip>
  );
}
