import "./style/app.css";

import { AppBar, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./components/navigation/header";
import { Menu } from "./components/navigation/menu";
import { StyledOverlay } from "./components/styled/styled-overlay";
import { useCurrentUserState } from "./hooks/use-current-user-state";
import { RouteDetails } from "./routes";
import { NotFoundRoute } from "./routes/not-found-route";
import { UserService } from "./service/user-service";

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
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </div>
  );
}

interface AppState {
  readonly loading: boolean;
  readonly menuVisible: boolean;
}

/**
 *
 */
function App() {
  const menuWidth = 200;
  const styles = useStyles();
  const [state, setState] = useState<AppState>({ loading: true, menuVisible: false });
  const toggleMenu = useCallback(
    () => setState((prevState) => ({ ...prevState, menuVisible: !prevState.menuVisible })),
    []
  );

  const currentUserState = useCurrentUserState();

  useEffect(() => {
    // Attempt to load current user and populate state
    const userService = new UserService(currentUserState);
    userService.getUserData().then((userData) => {
      if (userData) {
        currentUserState.setCurrentUser({ requestedTime: new Date(), userData });
      } else {
        currentUserState.setCurrentUser(undefined);
      }
      setState((prevState) => ({ ...prevState, loading: false }));
    });
  }, []);

  return (
    <div>
      <StyledOverlay visible={state.loading} sx={{ backgroundColor: "#00000000", boxShadow: "none" }}>
        <CircularProgress size={window.innerHeight < window.innerWidth ? "10vh" : "10vw"} />
      </StyledOverlay>
      <BrowserRouter>
        <AppBar elevation={5} position="sticky" className={styles.appBar}>
          <Header menuVisible={state.menuVisible} toggleMenu={toggleMenu} />
        </AppBar>
        <Menu visible={state.menuVisible} width={menuWidth} />
        <MainContent menuWidth={state.menuVisible ? menuWidth : 0} />
      </BrowserRouter>
    </div>
  );
}

export default App;
