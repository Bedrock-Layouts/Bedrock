import React from "react";

function useStatefulRef<T>(initialVal = null) {
  let [cur, setCur] = React.useState<T | null>(initialVal);

  const [ref] = React.useState({
    get current() {
      return cur as T;
    },
    set current(value: T) {
      cur = value;
      setCur(value);
    },
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
