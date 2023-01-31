import React from "react";

import { ColorPalette } from "../../style/color-palete";
import { StyledOverlay, StyledOverlayProps } from "../styled/styled-overlay";
import { SignInDialog } from "./sign-in-dialog";

/** Props to create SignInOverlay */
export interface SignInOverlayProps extends StyledOverlayProps {}

export function SignInOverlay(props: SignInOverlayProps) {
  return (
    <StyledOverlay closeButtonColor={ColorPalette.white} {...props}>
      <SignInDialog onClose={props.onClose} />
    </StyledOverlay>
  );
}
