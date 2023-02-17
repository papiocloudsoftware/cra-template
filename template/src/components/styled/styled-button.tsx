import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import React, { CSSProperties, MouseEvent, RefObject, useCallback, useRef, useState } from "react";

import { useSxMerge } from "../../hooks/use-sx-merge";
import { ColorPalette } from "../../style/color-palete";

enum Mode {
  light = "light",
  dark = "dark"
}
type ModeProps = {
  [key in Mode]?: SxProps<Theme>;
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
  const sx = useSxMerge(theme, modeProps[mode || "dark"], props.sx);

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
