import { AccountCircle, Lock, SvgIconComponent } from '@mui/icons-material';
import {
  Alert,
  AlertColor,
  Checkbox,
  Fade,
  FormControlLabel,
  InputAdornment,
  OutlinedTextFieldProps,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { capitalCase } from 'change-case';
import Color from 'color';
import React, { ChangeEvent, useCallback, useRef, useState } from 'react';

import { useCurrentUserState } from '../../hooks/use-current-user-state';
import { useKeyPressHandler } from '../../hooks/use-key-press-handler';
import { UserService } from '../../service/user-service';
import { ColorPalette } from '../../style/color-palette';
import { SquareLogo } from '../logos';
import { StyledButton } from '../styled/styled-button';

const useStyles = makeStyles({
  dialog: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'min(600px, 90vw)',
    padding: '50px',
    background: `radial-gradient(circle at 50% 25%, ${new Color(
      ColorPalette.primaryColorDark
    )
      .lighten(1.5)
      .hex()} -25%, ${ColorPalette.primaryColorDark} 80%)`,
  },
  logo: {
    width: '128px',
    marginTop: '24px',
    marginBottom: '64px',
  },
  input: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& input': {
      color: ColorPalette.white,
    },
    '& > *': {
      marginBottom: '12px !important',
    },
  },
  options: {
    display: 'flex',
    width: '300px',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: ColorPalette.white,
    '& *': {
      fontSize: '0.9rem !important',
    },
    marginBottom: '0.5rem',
    '& > label': {
      marginRight: '0 !important',
      marginLeft: '0 !important',
    },
  },
  buttons: {
    display: 'flex',
    width: '250px',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '48px',
    marginBottom: '32px',
    '& button': {
      width: '100px',
    },
  },
  alert: {
    position: 'absolute',
    maxWidth: '80%',
    top: '12px',
  },
});

interface FieldInputProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  readonly type: 'email' | 'password';
  readonly Icon: SvgIconComponent;
  readonly errorMessage?: string;
}

function FieldInput(props: FieldInputProps) {
  const { Icon, errorMessage, ...fieldProps } = props;
  return (
    <TextField
      required
      color="secondary"
      size="small"
      style={{ width: '100%' }}
      label={capitalCase(props.type)}
      error={errorMessage !== undefined}
      helperText={errorMessage}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon style={{ color: ColorPalette.primaryColorLight }} />
          </InputAdornment>
        ),
      }}
      {...fieldProps}
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
  readonly userService: UserService;
  readonly email?: string;
  readonly emailValidation?: string;
  readonly password?: string;
  readonly passwordValidation?: string;
  readonly rememberMe: boolean;
  readonly forgotPassword: boolean;
  readonly loggingIn: boolean;
  readonly showAlert: boolean;
  readonly alertSeverity?: AlertColor;
  readonly alertMessage?: string;
  readonly progressHeight?: number;
}

const rememberedUserKey = 'rememberedUser';

export function SignInDialog(props: SignInDialogProps) {
  const [state, setState] = useState<SignInState>({
    userService: new UserService(useCurrentUserState()),
    email: localStorage.getItem(rememberedUserKey) ?? undefined,
    rememberMe: true,
    forgotPassword: false,
    loggingIn: false,
    showAlert: false,
  });
  const styles = useStyles();
  const loginRef = useRef<HTMLButtonElement>(null);

  const ackAlert = useCallback(() => {
    setState((prevState) => ({ ...prevState, showAlert: false }));
  }, []);

  const { userService, email, password, forgotPassword, rememberMe } = state;
  const { onClose } = props;

  const resetPassword = useCallback(async () => {
    const success = await userService.resetPassword(email!);
    if (success) {
      setState((prevState) => ({
        ...prevState,
        loggingIn: false,
        forgotPassword: false,
        showAlert: true,
        alertMessage:
          'An email has been sent with instructions on how to reset your password.',
        alertSeverity: 'info',
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        loggingIn: false,
        showAlert: true,
        alertMessage:
          'There was an issue resetting your password, reach out to support for further help.',
        alertSeverity: 'error',
      }));
    }
  }, [userService, email]);

  const login = useCallback(async () => {
    const success = await userService.login(email!, password!);
    if (success) {
      setState((prevState) => ({ ...prevState, loggingIn: false }));
      if (rememberMe) {
        localStorage.setItem(rememberedUserKey, email!);
      } else {
        localStorage.removeItem(rememberedUserKey);
      }
      onClose();
    } else {
      setState((prevState) => ({
        ...prevState,
        loggingIn: false,
        showAlert: true,
        alertMessage: 'Incorrect email or password.',
        alertSeverity: 'error',
      }));
    }
  }, [userService, email, password, onClose]);

  const doSubmit = useCallback(async () => {
    setState((prevState) => ({ ...prevState, loggingIn: true }));

    if (forgotPassword) {
      await resetPassword();
    } else {
      await login();
    }
  }, [resetPassword, login]);

  const handleEmailInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const email = e.target.value !== '' ? e.target.value : undefined;
      setState((prevState) => ({ ...prevState, email }));
    },
    []
  );

  const validateEmailInput = useCallback(() => {
    const valid = email === undefined || validateEmail(email);
    setState((prevState) => ({
      ...prevState,
      emailValidation: !valid ? 'Invalid email address' : undefined,
    }));
  }, [email]);

  const handlePasswordInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const password = e.target.value !== '' ? e.target.value : undefined;
      setState((prevState) => ({ ...prevState, password }));
    },
    []
  );

  const validatePasswordInput = useCallback(() => {
    const valid = password !== undefined || password !== '' || forgotPassword;
    setState((prevState) => ({
      ...prevState,
      passwordValidation: !valid ? 'Password is required' : undefined,
    }));
  }, [password, forgotPassword]);

  const handleRememberMeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({ ...prevState, rememberMe: e.target.checked }));
    },
    []
  );
  const handleForgotPasswordInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({
        ...prevState,
        forgotPassword: e.target.checked,
        password: undefined,
      }));
    },
    []
  );

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

  const onKeyUp = useKeyPressHandler({ Enter: autoSubmitCheck });

  return (
    <div className={styles.dialog} onKeyUp={onKeyUp}>
      <Fade className={styles.alert} in={state.showAlert} timeout={250}>
        <Alert onClose={ackAlert} severity={state.alertSeverity}>
          {state.alertMessage}
        </Alert>
      </Fade>
      <SquareLogo mode="light" className={styles.logo} />
      <div className={styles.input}>
        <FieldInput
          type="email"
          Icon={AccountCircle}
          onChange={handleEmailInput}
          onBlur={validateEmailInput}
          errorMessage={state.emailValidation}
          autoFocus={state.email === undefined}
          value={state.email || ''}
        />
        <FieldInput
          type="password"
          Icon={Lock}
          onChange={handlePasswordInput}
          onBlur={validatePasswordInput}
          errorMessage={state.passwordValidation}
          autoFocus={state.email !== undefined}
          disabled={state.forgotPassword}
          value={state.password || ''}
        />
      </div>
      <div className={styles.options}>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              checked={state.rememberMe}
              onChange={handleRememberMeInput}
            />
          }
          label="Remember me"
        />
        <span />
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              checked={state.forgotPassword}
              onChange={handleForgotPasswordInput}
            />
          }
          label="Forgot password"
        />
      </div>
      <div className={styles.buttons}>
        <StyledButton
          innerRef={loginRef}
          disabled={!loginEnabled}
          mode="light"
          size="medium"
          onClick={doSubmit}
          showProgressOnClick
        >
          {state.forgotPassword ? 'Reset' : 'Login'}
        </StyledButton>
        <StyledButton mode="dark" size="medium" onClick={props.onClose}>
          Cancel
        </StyledButton>
      </div>
    </div>
  );
}
