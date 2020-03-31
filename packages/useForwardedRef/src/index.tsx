import React from 'react';

export default function useForwardedRef<T>(forwardedRef: React.Ref<T>) {
  const innerRef = React.useRef<T>(null);

  React.useEffect(() => {
    if (!forwardedRef) return;

    if (typeof forwardedRef === 'function') {
      forwardedRef(innerRef.current);
    } else {
      (forwardedRef as React.MutableRefObject<T | null>).current =
        innerRef.current;
    }
  }, [forwardedRef]);

  return innerRef;
}
