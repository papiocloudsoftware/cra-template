import { LinkBaseProps } from "@mui/material";
import React from "react";

import { useClasses } from "../../../hooks/use-classes";
import { StyledLink } from "../../styled/styled-link";

/**
 * Properties for an application link to a route
 */
export interface PublicRouteLinkProps extends Omit<LinkBaseProps, "to"> {
  readonly selectedClassName?: string;
}

interface RouteLinkProps extends PublicRouteLinkProps {
  readonly path: string;
}

export function RouteLink(props: RouteLinkProps) {
  const { selectedClassName, path, ...linkProps } = props;
  const className = useClasses(props, selectedClassName);
  return <StyledLink {...linkProps} to={path} className={className} />;
}
