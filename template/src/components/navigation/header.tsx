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
    "& > *": {
      marginLeft: "6px",
      marginRight: "6px"
    }
  },
  toolbarNavigationItems: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center"
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
    paddingBottom: "4px",
    transition: "border 0.5s, background-color 0.25s",
    "&:hover": {
      backgroundColor: "#ffffff33"
    }
  },
  activeRoute: {
    borderBottomWidth: "4px !important",
    borderBottomColor: `${ColorPalette.primaryColorLight} !important`,
    borderTopWidth: "4px !important"
  },
  routeLink: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center"
  }
});

interface NavigationItemsProps {
  readonly activeRoute?: string;
}

function NavigationItems(props: NavigationItemsProps) {
  const styles = useStyles();
  return (
    <div className={styles.toolbarNavigationItems}>
      {Object.keys(RouteDetails)
        .filter((key) => key !== "Home")
        .map((key) => {
          const routeDetail = RouteDetails[key];
          const classes = [styles.route];
          if (key === props.activeRoute) {
            classes.push(styles.activeRoute);
          }
          return (
            <div key={key} className={classes.join(" ")}>
              <routeDetail.Link className={styles.routeLink}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {routeDetail.Text}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </routeDetail.Link>
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
  const location = useLocation();
  const styles = useStyles();
  const MenuIcon = props.menuVisible ? MenuOpenOutlined : MenuOutlined;

  const homeLinkClasses = [styles.route];
  const activeRouteKey = Object.keys(RouteDetails).find(
    (key) => key !== "Home" && location.pathname.startsWith(RouteDetails[key].Path)
  );
  console.log(activeRouteKey);
  if (!activeRouteKey) {
    homeLinkClasses.push(styles.activeRoute);
  }

  return (
    <Toolbar className={styles.group}>
      <StyledTooltip title={props.menuVisible ? "Hide navigation menu" : "Show navigation menu"}>
        <MenuIcon className={styles.menuIcon} onClick={props.toggleMenu} />
      </StyledTooltip>
      <div className={homeLinkClasses.join(" ")}>
        <HomeLink className={styles.routeLink}>
          <SquareLogo className={styles.logo} />
        </HomeLink>
      </div>
      <NavigationItems activeRoute={activeRouteKey} />
      <div className={styles.toolbarUserItems}></div>
    </Toolbar>
  );
}
