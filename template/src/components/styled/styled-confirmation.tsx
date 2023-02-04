import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useCallback } from "react";

import { ColorPalette } from "../../style/color-palete";
import { StyledButton } from "./styled-button";
import { StyledOverlay } from "./styled-overlay";

/**
 * Props to create StyledConfirmation
 */
export interface StyledConfirmationProps {
  readonly title: string;
  readonly message: string;
  readonly confirmText?: string;
  readonly onConfirm: () => void;
  readonly cancelText?: string;
  readonly onCancel: () => void;
  readonly visible: boolean;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}

export function StyledConfirmation(props: StyledConfirmationProps) {
  const onConfirm = useCallback(async () => {
    await sleep(1000);
    props.onConfirm();
  }, [props.onConfirm]);
  return (
    <StyledOverlay visible={props.visible}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.message}</DialogContent>
      <DialogActions>
        <StyledButton
          mode="light"
          onClick={onConfirm}
          sx={{ width: "100px", ":hover": { borderColor: ColorPalette.primaryColorLight } }}
          autoFocus
          showProgressOnClick
        >
          {props.confirmText || "OK"}
        </StyledButton>
        <StyledButton onClick={props.onCancel} sx={{ width: "100px" }}>
          {props.cancelText || "Cancel"}
        </StyledButton>
      </DialogActions>
    </StyledOverlay>
  );
}
