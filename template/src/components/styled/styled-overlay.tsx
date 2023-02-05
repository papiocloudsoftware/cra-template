import { Close } from "@mui/icons-material";
import { Card, CardProps, Fade, Modal } from "@mui/material";
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
export interface StyledOverlayProps extends CardProps {
  readonly visible: boolean;
  readonly onClose?: () => void;
  readonly closeButton?: boolean;
  readonly closeButtonColor?: string;
}

export function StyledOverlay(props: PropsWithChildren<StyledOverlayProps>) {
  const styles = useStyles();

  const { visible, onClose, closeButton, closeButtonColor, ...cardProps } = props;

  const showCloseButton = closeButton || closeButtonColor !== undefined;
  const focusClose = showCloseButton ? undefined : onClose;

  let Content = <Card className={styles.content} {...cardProps} />;

  if (showCloseButton) {
    Content = (
      <div style={{ position: "relative", overflow: "scroll" }}>
        {Content}
        <Close
          style={{ color: closeButtonColor, transition: "opacity 0.25s" }}
          className={styles.closeButton}
          onClick={onClose}
        />
      </div>
    );
  }

  return (
    <Modal
      className={styles.overlay}
      open={visible}
      onClose={focusClose}
      closeAfterTransition
      slotProps={{ backdrop: { timeout: 250 } }}
    >
      <Fade in={visible} timeout={250}>
        {Content}
      </Fade>
    </Modal>
  );
}
