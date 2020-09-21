import React from "react";

function useStatefulRef<T>(initialVal = null) {
  // eslint-disable-next-line prefer-const
  let [cur, setCur] = React.useState<T | null>(initialVal);

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

  return ref as React.MutableRefObject<T>;
}

export default useStatefulRef;
