import useStatefulRef from "@bedrock-layout/use-stateful-ref";
import React from "react";

export default function useForwardedRef<T>(
  forwardedRef: React.Ref<T>
): React.MutableRefObject<T> {
  const innerRef = useStatefulRef<T>(null);
  React.useEffect(() => {
    if (!forwardedRef) return;

    if (typeof forwardedRef === "function") {
      forwardedRef(innerRef.current);
    } else {
      (forwardedRef as React.MutableRefObject<T | null>).current =
        innerRef.current;
    }
  });

  return innerRef;
}
