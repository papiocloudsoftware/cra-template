import { KeyboardArrowLeft } from '@mui/icons-material';
import { Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  DeviceType,
  useDeviceSettings,
} from '../../../hooks/use-device-settings';
import { RouteDetails } from '../../../routes';
import { ColorPalette } from '../../../style/color-palette';
import { SquareLogo } from '../../logos';
import { HeaderAction } from './header-action';
import { UserManagement } from './user-management';

const useStyles = makeStyles({
  toolbar: {
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      height: 'calc(100% - 8px)',
    },
  },
  toolbarNavigationItems: {
    width: '100%',
  },
  toolbarUserItems: {
    marginRight: 0,
    marginLeft: 'auto',
  },
  toolbarLogoItems: {},
  logo: {
    verticalAlign: 'middle',
    height: '48px',
    marginLeft: '6px',
    marginRight: '6px',
  },
  route: {
    borderStyle: 'solid !important',
    borderBottomWidth: '4px !important',
    borderTopWidth: '4px !important',
    borderTopColor: `${ColorPalette.primaryColorLight}00 !important`,
    alignItems: 'center',
    transition: 'border 0.25s, background-color 0.25s !important',
  },
  inactiveRoute: {
    borderBottomColor: `${ColorPalette.primaryColorLight}00 !important`,
  },
  activeRoute: {
    borderBottomColor: `${ColorPalette.primaryColorLight} !important`,
  },
  routeLink: {
    display: 'flex',
    alignItems: 'center',
    height: 'calc(100% - 2px)',
  },
  menuIndicator: {
    fontSize: '20px',
    marginLeft: '-18px',
    marginRight: '-6px',
    transition: 'opacity 0.5s, transform 0.5s !important',
    color: ColorPalette.primaryColorLight,
  },
});

interface NavigationItemsState {
  readonly activeRouteKey?: string;
}

function NavigationItems() {
  const [state, setState] = useState<NavigationItemsState>({});
  const location = useLocation();
  const styles = useStyles();

  const { pathname } = location;

  useEffect(() => {
    const activeRouteKey = Object.keys(RouteDetails)
      .reverse()
      .find((key) => pathname.startsWith(RouteDetails[key].Path));
    setState((prevState) => ({
      ...prevState,
      activeRouteKey: activeRouteKey || prevState.activeRouteKey,
    }));
  }, [pathname]);

  const spacing = ' '.repeat(2);
  return (
    <div className={styles.toolbarNavigationItems}>
      {Object.keys(RouteDetails).map((key) => {
        const routeDetail = RouteDetails[key];
        const classes = [styles.route];
        if (key === state.activeRouteKey) {
          classes.push(styles.activeRoute);
        } else {
          classes.push(styles.inactiveRoute);
        }
        return (
          <routeDetail.Link key={key} className={styles.routeLink}>
            <HeaderAction
              className={classes.join(' ')}
              description={routeDetail.Details}
            >
              <span style={{ whiteSpace: 'pre-wrap' }}>
                {spacing}
                {routeDetail.Text}
                {spacing}
              </span>
            </HeaderAction>
          </routeDetail.Link>
        );
      })}
    </div>
  );
}

/**
 * Props for the Header component
 */
export interface HeaderProps {
  readonly toggleMenu: () => void;
  readonly menuVisible: boolean;
}

function MenuAction(props: HeaderProps) {
  const styles = useStyles();
  return (
    <div className={styles.toolbarLogoItems}>
      <HeaderAction
        onClick={props.toggleMenu}
        description={
          props.menuVisible ? 'Hide navigation menu' : 'Show navigation menu'
        }
      >
        <SquareLogo mode="light" className={styles.logo} />
        <KeyboardArrowLeft
          className={styles.menuIndicator}
          style={{
            opacity: props.menuVisible ? 1.0 : 0.0,
            transform: `rotate(${props.menuVisible ? 0.0 : 180.0}deg)`,
          }}
        />
      </HeaderAction>
    </div>
  );
}

export function Header(props: HeaderProps) {
  const styles = useStyles();
  const deviceSettings = useDeviceSettings();

  return (
    <Toolbar className={styles.toolbar}>
      <MenuAction {...props} />
      {deviceSettings.deviceType >= DeviceType.TABLET ? (
        <NavigationItems />
      ) : undefined}
      <UserManagement className={styles.toolbarUserItems} />
    </Toolbar>
  );
}
