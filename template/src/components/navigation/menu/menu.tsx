import { Toolbar } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import React from "react";

import { ColorPalette } from "../../../style/color-palete";
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

interface MenuProps {
  readonly visible: boolean;
  readonly width: number;
}

export function Menu(props: MenuProps) {
  const styles = useStyles();
  return (
    <Drawer
      variant="persistent"
      className={styles.menu}
      open={props.visible}
      sx={{
        width: `${props.width}px`,
        zIndex: 1,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: `${props.width}px`, boxSizing: "border-box", zIndex: 1 },
        [`& .MuiListItemIcon-root`]: { minWidth: `36px`, color: ColorPalette.black }
      }}
    >
      <Toolbar />
      <MenuItems />
    </Drawer>
  );
}
