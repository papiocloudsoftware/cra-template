import { MenuOpenOutlined, MenuOutlined } from "@mui/icons-material";
import { Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useLocation } from "react-router-dom";

import { RouteDetails } from "../../routes";
import { ColorPalette } from "../../style/color-palete";
import { SquareLogo } from "../logos";
import { StyledTooltip } from "../styled/styled-tooltip";
import { HomeLink } from "./links";

const useStyles = makeStyles({
  group: {
    paddingLeft: "6px !important",
    "&:first-child": {
      marginLeft: "12px"
    },
    "& > *": {
      marginLeft: "6px",
      marginRight: "6px"
    }
  },
  toolbarNavigationItems: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    "& > *": {
      marginLeft: "10px",
      paddingLeft: "13px",
      marginRight: "10px",
      paddingRight: "13px"
    }
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
  },
  route: {
    display: "flex",
    borderBottomStyle: "solid",
    borderBottomWidth: "0px",
    borderBottomColor: ColorPalette.primaryColorLight,
    borderTopStyle: "solid",
    borderTopWidth: "0px",
    borderTopColor: `${ColorPalette.primaryColorLight}00`,
    height: "calc(100% - 6px)",
    alignItems: "center",
    paddingTop: "4px",
    paddingBottom: "4px"
  },
  activeRoute: {
    display: "flex",
    borderBottomStyle: "solid",
    borderBottomWidth: "4px",
    borderBottomColor: ColorPalette.primaryColorLight,
    borderTopStyle: "solid",
    borderTopWidth: "4px",
    borderTopColor: `${ColorPalette.primaryColorLight}00`,
    height: "calc(100% - 6px)",
    alignItems: "center",
    paddingTop: "4px",
    paddingBottom: "4px"
  }
});

function NavigationItems() {
  const location = useLocation();
  const styles = useStyles();

  return (
    <div className={styles.toolbarNavigationItems}>
      {Object.keys(RouteDetails)
        .filter((key) => key !== "Home")
        .map((key) => {
          const routeDetail = RouteDetails[key];
          const className = location.pathname.startsWith(routeDetail.Path) ? styles.activeRoute : styles.route;
          return (
            <div key={key} className={className} style={{ transition: "border 0.5s" }}>
              <routeDetail.Link>{routeDetail.Text}</routeDetail.Link>
            </div>
          );
        })}
    </div>
  );
}

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
    <Toolbar className={styles.group}>
      <StyledTooltip title={props.menuVisible ? "Hide navigation menu" : "Show navigation menu"}>
        <MenuIcon className={styles.menuIcon} onClick={props.toggleMenu} />
      </StyledTooltip>
      <HomeLink>
        <SquareLogo className={styles.logo} />
      </HomeLink>
      <NavigationItems />
      <div className={styles.toolbarUserItems}></div>
    </Toolbar>
  );
}
