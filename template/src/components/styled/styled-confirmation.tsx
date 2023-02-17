import { CardProps, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useCallback } from "react";

import { ColorPalette } from "../../style/color-palete";
import { StyledButton } from "./styled-button";

/**
 * Props to create StyledConfirmation
 */
export interface StyledConfirmationProps extends Omit<CardProps, "title"> {
  readonly title: string | JSX.Element;
  readonly message: string | JSX.Element;
  readonly confirmText?: string;
  readonly onConfirm: () => void;
  readonly cancelText?: string;
  readonly onCancel?: () => void;
}

export function StyledConfirmation(props: StyledConfirmationProps) {
  const confirmCallback = useCallback(async () => {
    props.onConfirm();
  }, [props.onConfirm]);

  return (
    <>
      <DialogTitle sx={{ fontWeight: "600" }}>{props.title}</DialogTitle>
      <DialogContent
        sx={{
          marginLeft: "1em",
          color: ColorPalette.primaryColorDark,
          textAlign: "justify",
          lineHeight: "1.4em",
          fontSize: "15px"
        }}
      >
        {props.message}
      </DialogContent>
      <DialogActions sx={{ marginBottom: "8px", marginRight: "1em" }}>
        <StyledButton
          mode="light"
          onClick={confirmCallback}
          sx={{ width: "100px", ":hover": { borderColor: ColorPalette.primaryColorLight } }}
          autoFocus
          showProgressOnClick
        >
          {props.confirmText || "OK"}
        </StyledButton>
        {props.onCancel ? (
          <StyledButton onClick={props.onCancel} sx={{ width: "100px" }}>
            {props.cancelText || "Cancel"}
          </StyledButton>
        ) : undefined}
      </DialogActions>
    </>
  );
}
