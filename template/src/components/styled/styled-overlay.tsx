import { Close } from "@mui/icons-material";
import { Card, Fade, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { PropsWithChildren } from "react";

import { ColorPalette } from "../../style/color-palete";

const useStyles = makeStyles({
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    position: "relative",
    maxWidth: "90vw",
    maxHeight: "90vh",
    outline: "none",
    overflow: "scroll !important"
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    marginRight: "6px",
    marginTop: "6px",
    color: ColorPalette.primaryColorDark,
    opacity: "0.25",
    "&:hover": {
      cursor: "pointer",
      opacity: "1.0"
    }
  }
});

/** Props to create StyledOverlay */
export interface StyledOverlayProps {
  readonly visible: boolean;
  readonly onClose?: () => void;
  readonly closeButton?: boolean;
  readonly closeButtonColor?: string;
}

export function StyledOverlay(props: PropsWithChildren<StyledOverlayProps>) {
  const styles = useStyles();
  const closeButton = props.closeButton || props.closeButtonColor;
  const focusClose = closeButton ? undefined : props.onClose;

  let Content = <Card className={styles.content}>{props.children}</Card>;

  if (props.closeButton || props.closeButtonColor) {
    Content = (
      <div style={{ position: "relative", overflow: "scroll" }}>
        {Content}
        <Close
          style={{ color: props.closeButtonColor, transition: "opacity 0.25s" }}
          className={styles.closeButton}
          onClick={props.onClose}
        />
      </div>
    );
  }

  return (
    <Modal
      className={styles.overlay}
      open={props.visible}
      onClose={focusClose}
      closeAfterTransition
      slotProps={{ backdrop: { timeout: 250 } }}
    >
      <Fade in={props.visible} timeout={250}>
        {Content}
      </Fade>
    </Modal>
  );
}
