/**
 * Combines the className from the properties passed in with the classes passed into the function to create a
 * new className property with all combined classes
 *
 * @param props
 * @param classes
 */
export function useClasses(
  props: { className?: string },
  ...classes: (string | undefined)[]
): string {
  const combined: string[] = [];
  for (const className of classes) {
    if (className) {
      combined.push(className);
    }
  }
  if (props.className) {
    combined.push(props.className);
  }
  return combined.join(' ');
}
