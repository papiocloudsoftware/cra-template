import React, { ImgHTMLAttributes } from "react";

const lightTextlogo = require("../../images/BannerLogoLightText.png");
const darkTextlogo = require("../../images/BannerLogoDarkText.png");

/**
 * Props to create BannerLogo
 */
export interface BannerLogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  readonly mode: "light" | "dark";
}

export function BannerLogo(props: BannerLogoProps) {
  const logo = props.mode === "dark" ? darkTextlogo : lightTextlogo;
  return <img src={logo} {...props}></img>;
}
