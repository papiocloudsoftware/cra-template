import React, { ImgHTMLAttributes } from "react";

const lightTextlogo = require("../../images/square-logo-light-text.png");
const darkTextlogo = require("../../images/square-logo-dark-text.png");

enum TextMode {
  LIGHT,
  DARK
}

/**
 * Props to create BannerLogo
 */
export interface SquareLogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  readonly textMode?: TextMode;
}

export function SquareLogo(props: SquareLogoProps) {
  const logo = props.textMode === TextMode.DARK ? darkTextlogo : lightTextlogo;
  return <img src={logo} {...props}></img>;
}
