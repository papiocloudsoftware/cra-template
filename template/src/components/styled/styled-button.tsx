import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { SystemStyleObject } from "@mui/system/styleFunctionSx/styleFunctionSx";
import React, { CSSProperties, MouseEvent, RefObject, useCallback, useRef, useState } from "react";

import { ColorPalette } from "../../style/color-palete";

function deepMerge<T extends object>(...objects: T[]): T {
  const result: any = {};

  for (const object of objects) {
    for (const k of Object.keys(object)) {
      const key = k as keyof T;
      // If object[key] is an object we may need to deep merge
      if (typeof object[key] === "object") {
        // eslint-disable-next-line max-depth
        if (result[key] === undefined || result[key] === null) {
          result[key] = object[key];
        } else {
          result[key] = deepMerge(result[key], object[key]);
        }
      } else {
        result[key] = object[key];
      }
    }
  }

  return result as T;
}

enum Mode {
  light = "light",
  dark = "dark"
}
type ModeProps = {
  [key in Mode]?: SystemStyleObject<Theme>;
};

const colorModeStyling: { [key: string]: ModeProps | undefined } = {
  primary: {
    light: {
      color: ColorPalette.white,
      backgroundColor: ColorPalette.primaryColorLight,
      borderColor: ColorPalette.primaryColorLight,
      ":hover": {
        color: ColorPalette.white,
        backgroundColor: ColorPalette.primaryColorLight,
        borderColor: ColorPalette.white
      },
      ":disabled": {
        color: ColorPalette.white,
        opacity: 0.75
      }
    },
    dark: {
      color: ColorPalette.white,
      backgroundColor: ColorPalette.primaryColorDark,
      borderColor: ColorPalette.primaryColorLight,
      ":hover": {
        color: ColorPalette.white,
        backgroundColor: ColorPalette.primaryColorLight,
        borderColor: ColorPalette.primaryColorLight
      },
      ":disabled": {
        color: ColorPalette.white,
        opacity: 0.75
      }
    }
  },
  secondary: {
    light: {
      color: ColorPalette.white,
      backgroundColor: ColorPalette.primaryColorLight,
      borderColor: ColorPalette.primaryColorLight,
      ":hover": {
        color: ColorPalette.white,
        backgroundColor: ColorPalette.primaryColorLight,
        borderColor: ColorPalette.primaryColorLight
      }
    },
    dark: {
      color: ColorPalette.primaryColorDark,
      backgroundColor: ColorPalette.primaryColorLight,
      borderColor: ColorPalette.primaryColorLight,
      ":hover": {
        color: ColorPalette.primaryColorDark,
        backgroundColor: ColorPalette.primaryColorLight,
        borderColor: ColorPalette.primaryColorLight
      }
    }
  }
};

function resolveSxProps(theme: Theme, sx?: SxProps<Theme>): SystemStyleObject<Theme> {
  if (!sx) {
    return {};
  }
  if (typeof sx === "function") {
    return sx(theme) as SystemStyleObject<Theme>;
  }
  return sx as SystemStyleObject<Theme>;
}

/** Props to create StyledButton */
export interface StyledButtonProps extends ButtonProps {
  readonly mode?: Mode | "light" | "dark";
  readonly innerRef?: RefObject<HTMLButtonElement>;
  readonly showProgressOnClick?: boolean;
}

interface StyledButtonState {
  readonly clicked: boolean;
  readonly progressHeight?: number;
}

export function StyledButton(props: StyledButtonProps) {
  const theme = useTheme();
  const [state, setState] = useState<StyledButtonState>({ clicked: false });
  const { innerRef, children, showProgressOnClick, ...buttonProps } = props;
  const ref: RefObject<HTMLButtonElement> = innerRef || useRef<HTMLButtonElement>(null);

  const onClick = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      if (ref.current && props.onClick) {
        const x = ref.current.clientHeight;
        const y = Math.sqrt((x * x) / 2);
        setState((prevState) => ({ ...prevState, clicked: true, progressHeight: y }));
        await props.onClick(e);
        // Transition to not showing progress
        setTimeout(() => setState((prevState) => ({ ...prevState, clicked: false })), 500);
      }
    },
    [props.onClick, ref.current, showProgressOnClick]
  );

  const modeProps: ModeProps = colorModeStyling[props.color || "primary"] || {};
  const mode = props.mode as Mode;
  // Merge styling from props
  const modeSx: SystemStyleObject<Theme> = modeProps[mode || "dark"] || {};
  const propsSx: SystemStyleObject<Theme> = resolveSxProps(theme, props.sx) ?? {};
  const sx: SystemStyleObject<Theme> = deepMerge(modeSx, propsSx) || {};

  return (
    <Button
      variant="outlined"
      size="small"
      {...buttonProps}
      sx={sx}
      style={{ transition: "background-color 0.25s, border-color 0.25s, color 0.25s" }}
      ref={ref}
      onClick={onClick}
    >
      {state.clicked && showProgressOnClick ? (
        <CircularProgress size={state.progressHeight} style={{ color: (sx as CSSProperties).color }} />
      ) : (
        children
      )}
    </Button>
  );
}
