import React from 'react';

export default function useForwardedRef<T>(
  forwardedRef: React.Ref<T>
): React.MutableRefObject<T> {
  const innerRef = useStatefulRef<T>(null);
  React.useEffect(() => {
    if (!forwardedRef) return;

    if (typeof forwardedRef === 'function') {
      forwardedRef(innerRef.current);
    } else {
      (forwardedRef as React.MutableRefObject<T | null>).current =
        innerRef.current;
    }
  });

  return innerRef;
}

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

  Object.defineProperty(ref, 'current', {
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
