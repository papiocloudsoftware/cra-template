import { MenuOpenOutlined, MenuOutlined } from "@mui/icons-material";
import { Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

import { SquareLogo } from "../logos";
import { StyledTooltip } from "../styled/styled-tooltip";
import { HomeLink } from "./links";

const useStyles = makeStyles({
  toolbar: {
    paddingLeft: "6px !important",
    "& > *": {
      marginLeft: "12px"
    }
  },
  toolbarNavigationItems: {
    width: "100%"
  },
  toolbarUserItems: {
    width: "100px",
    marginRight: 0,
    marginLeft: "auto"
  },
  menuIcon: {
    color: "white",
    "&:hover": {
      cursor: "pointer"
    }
  },
  logo: {
    verticalAlign: "middle",
    height: "48px"
  }
});

/**
 * Props for the Header component
 */
export interface HeaderProps {
  readonly toggleMenu: () => void;
  readonly menuVisible: boolean;
}

export function Header(props: HeaderProps) {
  const styles = useStyles();

  const MenuIcon = props.menuVisible ? MenuOpenOutlined : MenuOutlined;

  return (
    <Toolbar className={styles.toolbar}>
      <StyledTooltip title={props.menuVisible ? "Hide navigation menu" : "Show navigation menu"}>
        <MenuIcon className={styles.menuIcon} onClick={props.toggleMenu} />
      </StyledTooltip>
      <HomeLink>
        <SquareLogo className={styles.logo} />
      </HomeLink>
      <div className={styles.toolbarNavigationItems}></div>
      <div className={styles.toolbarUserItems}></div>
    </Toolbar>
  );
}
