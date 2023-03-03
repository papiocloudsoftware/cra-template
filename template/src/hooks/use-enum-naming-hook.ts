import { capitalCase } from 'change-case';

interface NamingHook<T> {
  (value: T): string;
}

/**
 * Changes an enum style naming format to a readable name
 * @param namingMap
 * @param defaultValue
 */
export function useEnumNamingHook<T>(
  namingMap: { [key: string]: string } = {},
  defaultValue = ''
): NamingHook<T> {
  return (name: T) => {
    if (name === undefined) {
      return defaultValue;
    }
    const nameValue = `${name}`;
    // Check mappings
    const mappedName = namingMap[nameValue];
    if (mappedName) {
      return mappedName;
    }
    // Return a generated name
    const parts = `${name}`.split('_').map((part) => capitalCase(part));
    return parts.join(' ');
  };
}
