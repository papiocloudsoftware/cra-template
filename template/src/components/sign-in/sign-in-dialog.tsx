import { AccountCircle, Lock, SvgIconComponent } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { capitalCase } from "change-case";
import Color from "color";
import React from "react";

import { ColorPalette } from "../../style/color-palete";
import { SquareLogo } from "../logos";

const useStyles = makeStyles({
  dialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "600px",
    height: "800px",
    padding: "80px",
    background: `radial-gradient(circle at 50% 25%, ${new Color(ColorPalette.primaryColorDark)
      .lighten(1.5)
      .hex()} -25%, ${ColorPalette.primaryColorDark} 35%)`
  },
  heading: {
    color: ColorPalette.white,
    fontWeight: 400
  },
  logo: {
    width: "128px",
    marginTop: "1rem",
    marginBottom: "64px"
  },
  input: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& input": {
      color: ColorPalette.white
    },
    "& > *": {
      marginBottom: "12px !important"
    }
  }
});

interface FieldInputProps {
  readonly type: "email" | "password";
  readonly Icon: SvgIconComponent;
}

function FieldInput(props: FieldInputProps) {
  return (
    <TextField
      required
      color="secondary"
      size="small"
      style={{ width: "100%" }}
      type={props.type}
      label={capitalCase(props.type)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <props.Icon style={{ color: ColorPalette.primaryColorLight }} />
          </InputAdornment>
        )
      }}
    />
  );
}

/** Props to create SignInDialog */
export interface SignInDialogProps {
  readonly onClose: () => void;
}

export function SignInDialog(props: SignInDialogProps) {
  const styles = useStyles();
  return (
    <div className={styles.dialog}>
      <h1 className={styles.heading}>USER LOGIN</h1>
      <SquareLogo textMode={"light"} className={styles.logo} />
      <div className={styles.input}>
        <FieldInput type="email" Icon={AccountCircle} />
        <FieldInput type="password" Icon={Lock} />
      </div>
    </div>
  );
}
