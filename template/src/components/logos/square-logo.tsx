import React, { ImgHTMLAttributes } from "react";

const lightTextlogo = require("../../images/square-logo-light-text.png");
const darkTextlogo = require("../../images/square-logo-dark-text.png");

/**
 * Props to create BannerLogo
 */
export interface SquareLogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  readonly textMode?: "light" | "dark";
}

export function SquareLogo(props: SquareLogoProps) {
  const logo = props.textMode === "dark" ? darkTextlogo : lightTextlogo;
  return <img src={logo} {...props}></img>;
}
