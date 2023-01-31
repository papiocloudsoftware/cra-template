import { KeyboardArrowLeft, MenuOpenOutlined, MenuOutlined } from "@mui/icons-material";
import { Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useLocation } from "react-router-dom";

import { RouteDetails } from "../../../routes";
import { ColorPalette } from "../../../style/color-palete";
import { SquareLogo } from "../../logos";
import { HeaderAction } from "./header-action";
import { UserManagement } from "./user-management";

const useStyles = makeStyles({
  toolbar: {
    paddingLeft: "0px !important",
    paddingRight: "0px !important"
  },
  toolbarNavigationItems: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  toolbarUserItems: {
    display: "flex",
    height: "100%",
    marginRight: 0,
    marginLeft: "auto"
  },
  logo: {
    verticalAlign: "middle",
    height: "48px",
    marginLeft: "6px",
    marginRight: "6px"
  },
  route: {
    borderStyle: "solid !important",
    borderBottomWidth: "0px",
    borderBottomColor: ColorPalette.primaryColorLight,
    borderTopWidth: "0px",
    borderTopColor: `${ColorPalette.primaryColorLight}00 !important`,
    height: "calc(100% - 12px) !important",
    alignItems: "center",
    paddingTop: "4px",
    paddingBottom: "4px",
    transition: "border 0.5s, background-color 0.25s !important"
  },
  activeRoute: {
    borderBottomWidth: "4px !important",
    borderBottomColor: `${ColorPalette.primaryColorLight} !important`,
    borderTopWidth: "4px !important"
  },
  routeLink: {
    display: "flex",
    height: "100%",
    alignItems: "center"
  },
  menuIndicator: {
    fontSize: "20px",
    marginLeft: "-18px",
    transition: "opacity 0.5s, transform 0.5s !important"
  }
});

function NavigationItems() {
  const location = useLocation();
  const styles = useStyles();
  const activeRouteKey = Object.keys(RouteDetails)
    .reverse()
    .find((key) => location.pathname.startsWith(RouteDetails[key].Path));

  const spacing = " ".repeat(2);
  return (
    <div className={styles.toolbarNavigationItems}>
      {Object.keys(RouteDetails).map((key) => {
        const routeDetail = RouteDetails[key];
        const classes = [styles.route];
        if (key === activeRouteKey) {
          classes.push(styles.activeRoute);
        }
        return (
          <HeaderAction key={key} className={classes.join(" ")} description={routeDetail.Details}>
            <routeDetail.Link className={styles.routeLink}>
              <span style={{ whiteSpace: "pre-wrap" }}>
                {spacing}
                {routeDetail.Text}
                {spacing}
              </span>
            </routeDetail.Link>
          </HeaderAction>
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
  return (
    <Toolbar className={styles.toolbar}>
      <HeaderAction
        onClick={props.toggleMenu}
        description={props.menuVisible ? "Hide navigation menu" : "Show navigation menu"}
      >
        <SquareLogo className={styles.logo} />
        <KeyboardArrowLeft
          className={styles.menuIndicator}
          style={{ opacity: props.menuVisible ? 1.0 : 0.0, transform: `rotate(${props.menuVisible ? 0.0 : 180.0}deg)` }}
        />
      </HeaderAction>
      <NavigationItems />
      <UserManagement className={styles.toolbarUserItems} />
    </Toolbar>
  );
}
