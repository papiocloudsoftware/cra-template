import { DrawerProps, Toolbar } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import React from "react";

import { MenuItems } from "./menu-items";

const useStyles = makeStyles({
  menu: {
    "& a": {
      "&:hover": { textDecoration: "none" },
      "&:link": { textDecoration: "none" },
      "&:visited": { textDecoration: "none" },
      "&:active": { textDecoration: "none" }
    }
  }
});

interface MenuProps extends Pick<DrawerProps, "variant"> {
  readonly visible: boolean;
  readonly width: number;
  readonly onClose?: () => void;
}

export function Menu(props: MenuProps) {
  const styles = useStyles();

  return (
    <Drawer
      variant={props.variant}
      onClose={props.onClose}
      className={styles.menu}
      open={props.visible}
      sx={{
        width: `${props.width}px`,
        zIndex: 1,
        [`& .MuiDrawer-paper`]: { width: `${props.width}px`, boxSizing: "border-box", zIndex: 1 }
      }}
    >
      <Toolbar />
      <MenuItems onNavigate={props.variant === "temporary" ? props.onClose : undefined} />
    </Drawer>
  );
}
