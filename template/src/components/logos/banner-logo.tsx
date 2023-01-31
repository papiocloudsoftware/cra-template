import React, { ImgHTMLAttributes } from "react";

const lightTextlogo = require("../../images/banner-logo-light-text.png");
const darkTextlogo = require("../../images/banner-logo-dark-text.png");

/**
 * Props to create BannerLogo
 */
export interface BannerLogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  readonly textMode?: "light" | "dark";
}

export function BannerLogo(props: BannerLogoProps) {
  const logo = props.textMode === "dark" ? darkTextlogo : lightTextlogo;
  return <img src={logo} {...props}></img>;
}
