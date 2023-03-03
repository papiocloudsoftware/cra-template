import { SxProps } from '@mui/system';
import {
  CSSPseudoSelectorProps,
  CSSSelectorObjectOrCssVariables,
  SystemCssProperties,
} from '@mui/system/styleFunctionSx/styleFunctionSx';

type NonNullSxProps<Theme extends object> =
  | SystemCssProperties<Theme>
  | CSSPseudoSelectorProps<Theme>
  | CSSSelectorObjectOrCssVariables<Theme>;

function deepMerge<T extends object>(...objects: T[]): T {
  const result: any = {};

  for (const object of objects) {
    for (const k of Object.keys(object)) {
      const key = k as keyof T;
      // If object[key] is an object we may need to deep merge
      if (typeof object[key] === 'object') {
        // eslint-disable-next-line max-depth
        if (result[key] === undefined || result[key] === null) {
          result[key] = object[key];
        } else {
          result[key] = deepMerge(result[key], object[key]);
        }
      } else {
        result[key] = object[key];
      }
    }
  }

  return result as T;
}

function resolveSxProps<Theme extends object>(
  theme: Theme,
  sx?: SxProps<Theme>
): NonNullSxProps<Theme> {
  if (!sx) {
    return {};
  }
  if (typeof sx === 'function') {
    return sx(theme) as NonNullSxProps<Theme>;
  }
  return sx as NonNullSxProps<Theme>;
}

export function useSxMerge<Theme extends object>(
  theme: Theme,
  ...objects: (SxProps<Theme> | undefined)[]
): SxProps<Theme> {
  const resolved: NonNullSxProps<Theme>[] = objects.map((sx) =>
    resolveSxProps(theme, sx)
  );
  return deepMerge(...resolved);
}
