import "./style/app.css";

import { AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { CSSProperties, useCallback, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./components/navigation/header";
import { Menu } from "./components/navigation/menu";
import { RouteDetails } from "./routes";
import { NotFoundRoute } from "./routes/not-found-route";

const useStyles = makeStyles({
  content: {
    padding: "1rem",
    overflowX: "scroll",
    flexGrow: 1
  },
  appBar: {
    display: "flex !important",
    justifyContent: "center !important",
    height: "56px !important",
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
  readonly menuVisible: boolean;
}

/**
 *
 */
function App() {
  const menuWidth = 200;
  const styles = useStyles();
  const [state, setState] = useState<AppState>({ menuVisible: false });
  const toggleMenu = useCallback(() => {
    setState((prevState) => {
      return { ...prevState, menuVisible: !prevState.menuVisible };
    });
  }, []);

  return (
    <div>
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
