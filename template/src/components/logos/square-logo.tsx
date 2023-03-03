import React, { ImgHTMLAttributes } from 'react';

const lightTextlogo = require('../../images/SquareLogoLightText.png');
const darkTextlogo = require('../../images/SquareLogoDarkText.png');

/**
 * Props to create SquareLogo
 */
export interface SquareLogoProps extends ImgHTMLAttributes<HTMLImageElement> {
  readonly mode: 'light' | 'dark';
}

export function SquareLogo(props: SquareLogoProps) {
  const logo = props.mode === 'dark' ? darkTextlogo : lightTextlogo;
  return <img src={logo} {...props}></img>;
}
