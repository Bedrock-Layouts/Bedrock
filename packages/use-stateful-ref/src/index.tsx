import React from "react";

/**
 * @deprecated This hook is deprecated and will be removed in the next major version.
 */
export function useStatefulRef<T>(initialVal?: T): React.MutableRefObject<T> {
  // eslint-disable-next-line prefer-const, functional/no-let
  let [cur, setCur] = React.useState<T | undefined>(initialVal);

  const { current: ref } = React.useRef({
    current: cur,
  });

  // eslint-disable-next-line functional/immutable-data
  Object.defineProperty(ref, "current", {
    get: () => cur as T,
    // eslint-disable-next-line functional/no-return-void
    set: (value: T) => {
      if (!Object.is(cur, value)) {
        cur = value;
        setCur(value);
      }
    },
  });

  return ref as React.MutableRefObject<T>;
}
