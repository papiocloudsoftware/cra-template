import "./style/app.css";

import { AppBar, CircularProgress, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./components/navigation/header";
import { Menu } from "./components/navigation/menu";
import { StyledOverlay } from "./components/styled/styled-overlay";
import { useCurrentUserState } from "./hooks/use-current-user-state";
import { DeviceType, useDeviceSettings } from "./hooks/use-device-settings";
import { useModalState } from "./hooks/use-modal-state";
import { RouteDetails } from "./routes";
import { HomeRoute } from "./routes/home-route";
import { signInPath, SignInRoute } from "./routes/sign-in-route";
import { UserService } from "./service/user-service";
import { ColorPalette } from "./style/color-palete";

const useStyles = makeStyles({
  content: {
    padding: "1rem",
    overflowX: "scroll",
    flexGrow: 1,
    transition: "margin-left 225ms"
  },
  appBar: {
    display: "flex !important",
    justifyContent: "center !important",
    height: "48px !important",
    zIndex: "2 !important"
  }
});

interface MainContentProps {
  readonly menuWidth: number;
}

function MainContent(props: MainContentProps) {
  const styles = useStyles();
  const style: CSSProperties = {
    marginLeft: `${props.menuWidth}px`
  };
  return (
    <div className={styles.content} style={style}>
      <Routes>
        {Object.values(RouteDetails).map((route, i) => {
          return <Route key={i} path={route.Path} element={<route.Route />} />;
        })}
        <Route path={signInPath} element={<SignInRoute />} />
        <Route path="*" element={<HomeRoute />} />
      </Routes>
    </div>
  );
}

interface AppState {
  readonly menuVisible: boolean;
}

/**
 *
 */
function App() {
  const menuWidth = 200;
  const styles = useStyles();
  const [state, setState] = useState<AppState>({ menuVisible: false });
  const toggleMenu = useCallback(
    () => setState((prevState) => ({ ...prevState, menuVisible: !prevState.menuVisible })),
    []
  );

  const currentUserState = useCurrentUserState();
  const deviceSettings = useDeviceSettings();
  const modalState = useModalState();

  useEffect(() => {
    modalState.showModal({
      props: {
        sx: { backgroundColor: "#00000000", boxShadow: "none" }
      },
      element: (
        <CircularProgress
          size={window.innerHeight < window.innerWidth ? "10vh" : "10vw"}
          sx={{ color: ColorPalette.primaryColorLight }}
        />
      )
    });
  }, []);

  // Show loading modal on start
  useEffect(() => {
    // Attempt to load current user and populate state
    const userService = new UserService(currentUserState);
    userService.getUserData().then((userData) => {
      if (userData) {
        currentUserState.setCurrentUser({ requestedTime: new Date(), userData });
      } else {
        currentUserState.setCurrentUser(undefined);
      }
      setTimeout(() => {
        modalState.hideModal();
      }, 1000);
    });
  }, []);

  const persistentMenu = deviceSettings.deviceType >= DeviceType.TABLET;

  const modalStack = modalState.modalStack;
  const modalProps = modalStack.length > 0 ? modalStack[modalStack.length - 1].props : {};
  const modalElement = modalStack.length > 0 ? modalStack[modalStack.length - 1].element : <></>;

  return (
    <Paper sx={{ minHeight: "100vh", backgroundColor: ColorPalette.backgroundGray }}>
      <StyledOverlay visible={modalStack.length > 0} {...modalProps}>
        {modalElement}
      </StyledOverlay>
      <BrowserRouter>
        <AppBar elevation={5} position="sticky" className={styles.appBar}>
          <Header menuVisible={state.menuVisible} toggleMenu={toggleMenu} />
        </AppBar>
        <Menu
          visible={state.menuVisible}
          width={menuWidth}
          onClose={persistentMenu ? undefined : toggleMenu}
          variant={persistentMenu ? "persistent" : "temporary"}
        />
        <MainContent menuWidth={persistentMenu && state.menuVisible ? menuWidth : 0} />
      </BrowserRouter>
    </Paper>
  );
}
export default App;
