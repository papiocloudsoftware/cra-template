import { KeyboardArrowRight } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { capitalCase } from 'change-case';
import React from 'react';
import { Routes, useLocation } from 'react-router-dom';

import { Home } from '../components/home';
import {
  PublicRouteLinkProps,
  RouteLink,
} from '../components/navigation/links/route-link';
import * as sampleTool1 from './tools/sample-tool1';
import * as sampleTool2 from './tools/sample-tool2';
import * as sampleTool3 from './tools/sample-tool3';

const useStyles = makeStyles({
  toolContent: {},
  navigationPanel: {},
});

export const homePath = '/';

export function HomeLink(props: PublicRouteLinkProps) {
  return <RouteLink {...props} path={homePath} />;
}

interface NavigationPanelProps {
  readonly path: string;
}

function NavigationPanel(props: NavigationPanelProps) {
  const styles = useStyles();
  const parts = props.path.split('/').filter((part) => part.trim().length > 0);

  const currParts: string[] = [];

  return (
    <div className={styles.navigationPanel}>
      <HomeLink>Home</HomeLink>
      {parts.map((part) => {
        currParts.push(part);
        return (
          <RouteLink key={part} path={currParts.join('/')}>
            <KeyboardArrowRight />
            {capitalCase(part)}
          </RouteLink>
        );
      })}
    </div>
  );
}

export function HomeRoute() {
  const styles = useStyles();
  const location = useLocation();
  if (location.pathname === '' || location.pathname === '/') {
    return <Home />;
  }
  return (
    <div className={styles.toolContent}>
      <NavigationPanel path={location.pathname} />
      <Routes>
        {sampleTool1.AllRoutes}
        {sampleTool2.AllRoutes}
        {sampleTool3.AllRoutes}
      </Routes>
    </div>
  );
}
