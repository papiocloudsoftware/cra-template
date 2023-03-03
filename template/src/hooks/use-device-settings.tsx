import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

export enum DeviceType {
  MOBILE = 0,
  TABLET = 1,
  LAPTOP = 2,
  DESKTOP = 3,
}

/**
 * State data for the users device
 */
export interface DeviceSettings {
  readonly deviceType: DeviceType;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const DeviceSettingsContext = React.createContext<DeviceSettings>({
  deviceType: DeviceType.DESKTOP,
});

export function useDeviceSettings(): DeviceSettings {
  return useContext(DeviceSettingsContext);
}

function computeDeviceType(): DeviceType {
  if (window.innerWidth < 600) {
    return DeviceType.MOBILE;
  } else if (window.innerWidth < 1200) {
    return DeviceType.TABLET;
  } else if (window.innerWidth < 1800) {
    return DeviceType.LAPTOP;
  }
  return DeviceType.DESKTOP;
}

export function DeviceSettingsProvider(props: PropsWithChildren<unknown>) {
  const [deviceSettings, setDeviceSettings] = useState<DeviceSettings>({
    deviceType: computeDeviceType(),
  });

  useEffect(() => {
    const listener = () => {
      setDeviceSettings((prevSettings) => ({
        ...prevSettings,
        deviceType: computeDeviceType(),
      }));
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  return (
    <DeviceSettingsContext.Provider value={deviceSettings}>
      {props.children}
    </DeviceSettingsContext.Provider>
  );
}
