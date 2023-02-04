import { AccountCircle, Lock, SvgIconComponent } from "@mui/icons-material";
import { Checkbox, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { capitalCase } from "change-case";
import Color from "color";
import React, { ChangeEvent, useCallback, useRef, useState } from "react";

import { useCurrentUserState } from "../../hooks/use-current-user-state";
import { UserService } from "../../service/user-service";
import { ColorPalette } from "../../style/color-palete";
import { KeyPressAction } from "../actions/key-press-action";
import { SquareLogo } from "../logos";
import { StyledButton } from "../styled/styled-button";

const useStyles = makeStyles({
  dialog: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "600px",
    padding: "50px",
    background: `radial-gradient(circle at 50% 25%, ${new Color(ColorPalette.primaryColorDark)
      .lighten(1.5)
      .hex()} -25%, ${ColorPalette.primaryColorDark} 80%)`
  },
  logo: {
    width: "128px",
    marginTop: "32px",
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
  },
  options: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: ColorPalette.white,
    "& *": {
      fontSize: "0.9rem !important"
    },
    "& > span": {
      margin: "0.5rem"
    },
    marginBottom: "0.5rem"
  },
  buttons: {
    display: "flex",
    width: "50%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: "48px",
    marginBottom: "64px",
    "& button": {
      width: "100px"
    }
  }
});

interface FieldInputProps {
  readonly type: "email" | "password";
  readonly Icon: SvgIconComponent;
  readonly autoFocus?: boolean;
  readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readonly onBlur?: () => void;
  readonly error?: string;
}

function FieldInput(props: FieldInputProps) {
  return (
    <TextField
      required
      color="secondary"
      size="small"
      autoFocus={props.autoFocus}
      style={{ width: "100%" }}
      type={props.type}
      label={capitalCase(props.type)}
      onChange={props.onChange}
      onBlur={props.onBlur}
      error={props.error !== undefined}
      helperText={props.error}
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

function validateEmail(email: string): boolean {
  return email.match(/[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,15}/g) !== null;
}

/** Props to create SignInDialog */
export interface SignInDialogProps {
  readonly onClose: () => void;
}

interface SignInState {
  readonly email?: string;
  readonly emailValidation?: string;
  readonly password?: string;
  readonly passwordValidation?: string;
  readonly rememberMe: boolean;
  readonly forgotPassword: boolean;
  readonly loggingIn: boolean;
  readonly errorMessage?: string;
  readonly progressHeight?: number;
}

export function SignInDialog(props: SignInDialogProps) {
  const [state, setState] = useState<SignInState>({
    rememberMe: true,
    forgotPassword: false,
    loggingIn: false
  });
  const styles = useStyles();
  const userService = new UserService(useCurrentUserState());

  const loginRef = useRef<HTMLButtonElement>(null);

  const doLogin = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loggingIn: true }));
    const success = await userService.login(state.email!, state.password!);
    if (success) {
      setState((prevState) => ({ ...prevState, loggingIn: false, errorMessage: undefined }));
      props.onClose();
    } else {
      setState((prevState) => ({ ...prevState, loggingIn: false, errorMessage: "Incorrect email or password" }));
    }
  }, [userService, state.email, state.password]);

  const handleEmailInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value !== "" ? e.target.value : undefined;
    setState((prevState) => ({ ...prevState, email }));
  }, []);

  const validateEmailInput = useCallback(() => {
    const valid = state.email === undefined || validateEmail(state.email);
    setState((prevState) => ({ ...prevState, emailValidation: !valid ? "Invalid email address" : undefined }));
  }, [state.email]);

  const handlePasswordInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value !== "" ? e.target.value : undefined;
    setState((prevState) => ({ ...prevState, password }));
  }, []);

  const validatePasswordInput = useCallback(() => {
    const valid = state.password !== undefined || state.password !== "" || state.forgotPassword;
    setState((prevState) => ({ ...prevState, passwordValidation: !valid ? "Password is required" : undefined }));
  }, [state.password]);

  const handleRememberMeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, rememberMe: e.target.checked }));
  }, []);
  const handleForgotPasswordInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({ ...prevState, forgotPassword: e.target.checked }));
  }, []);

  const autoSubmitCheck = useCallback(() => {
    if (loginRef.current) {
      loginRef.current.click();
    }
  }, [loginRef.current]);

  const loginEnabled =
    state.email &&
    !state.emailValidation &&
    ((state.password && !state.passwordValidation) || state.forgotPassword) &&
    !state.loggingIn;

  return (
    <KeyPressAction className={styles.dialog} actions={{ Enter: autoSubmitCheck }}>
      <SquareLogo mode={"light"} className={styles.logo} />
      <div className={styles.input}>
        <FieldInput
          type="email"
          Icon={AccountCircle}
          onChange={handleEmailInput}
          onBlur={validateEmailInput}
          error={state.emailValidation}
          autoFocus
        />
        <FieldInput
          type="password"
          Icon={Lock}
          onChange={handlePasswordInput}
          onBlur={validatePasswordInput}
          error={state.passwordValidation}
        />
      </div>
      <div className={styles.options}>
        <FormControlLabel
          control={<Checkbox color="secondary" checked={state.rememberMe} onChange={handleRememberMeInput} />}
          label="Remember me"
        />
        <span />
        <FormControlLabel
          control={<Checkbox color="secondary" checked={state.forgotPassword} onChange={handleForgotPasswordInput} />}
          label="Forgot password"
        />
      </div>
      <div className={styles.buttons}>
        <StyledButton
          innerRef={loginRef}
          disabled={!loginEnabled}
          mode="light"
          size="medium"
          onClick={doLogin}
          showProgressOnClick
        >
          Login
        </StyledButton>
        <StyledButton mode="dark" size="medium" onClick={props.onClose}>
          Cancel
        </StyledButton>
      </div>
    </KeyPressAction>
  );
}
