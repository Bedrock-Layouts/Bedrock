import React from "react";

export function useStatefulRef<T>(initialVal?: T): React.RefObject<T> {
  // eslint-disable-next-line prefer-const
  let [cur, setCur] = React.useState<T | undefined>(initialVal);

  const { current: ref } = React.useRef({
    current: cur,
  });

  Object.defineProperty(ref, "current", {
    get: () => cur as T,
    set: (value: T) => {
      if (!Object.is(cur, value)) {
        cur = value;
        setCur(value);
      }
    },
  });

  return ref as React.RefObject<T>;
}
