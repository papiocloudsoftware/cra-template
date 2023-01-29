import { MenuOpenOutlined, MenuOutlined } from "@mui/icons-material";
import { Toolbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useLocation } from "react-router-dom";

import { RouteDetails } from "../../routes";
import { ColorPalette } from "../../style/color-palete";
import { SquareLogo } from "../logos";
import { HeaderAction } from "./header-action";
import { HomeLink } from "./links";
import { UserManagement } from "./user-management";

const useStyles = makeStyles({
  group: {
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
  menuIcon: {
    color: "inherit",
    "&:hover": {
      cursor: "pointer"
    }
  },
  logo: {
    verticalAlign: "middle",
    height: "48px"
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
  }
});

interface NavigationItemsProps {
  readonly activeRoute?: string;
}

function NavigationItems(props: NavigationItemsProps) {
  const styles = useStyles();
  const spacing = " ".repeat(2);
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
      <HeaderAction
        onClick={props.toggleMenu}
        description={props.menuVisible ? "Hide navigation menu" : "Show navigation menu"}
      >
        <MenuIcon className={styles.menuIcon} />
      </HeaderAction>
      <HeaderAction
        className={homeLinkClasses.join(" ")}
        description={RouteDetails.Home.Details}
        style={{ paddingLeft: "4px", paddingRight: "4px" }}
      >
        <HomeLink className={styles.routeLink}>
          <SquareLogo className={styles.logo} />
        </HomeLink>
      </HeaderAction>
      <NavigationItems activeRoute={activeRouteKey} />
      <div className={styles.toolbarUserItems}>
        <UserManagement />
      </div>
    </Toolbar>
  );
}
