import React, { ImgHTMLAttributes } from "react";

const lightTextlogo = require("../../images/banner-logo-light-text.png");
const darkTextlogo = require("../../images/banner-logo-dark-text.png");

enum TextMode {
  LIGHT,
  DARK
}

/**
 * Props to create BannerLogo
 */
export interface BannerLogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  readonly textMode?: TextMode;
}

export function BannerLogo(props: BannerLogoProps) {
  const logo = props.textMode === TextMode.DARK ? darkTextlogo : lightTextlogo;
  return <img src={logo} {...props}></img>;
}
