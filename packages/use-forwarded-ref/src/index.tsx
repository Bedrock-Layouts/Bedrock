import useStatefulRef from "@bedrock-layout/use-stateful-ref";
import { useRef } from "react";
import React from "react";

export interface Config {
  isStateful: boolean;
}

export function useForwardedRef<T>(
  forwardedRef: React.Ref<T>,
  config: Config = { isStateful: true }
): React.MutableRefObject<T> {
  const statefulRef = useStatefulRef<T>(null);
  const ref = useRef<T>(null);

  const innerRef = config.isStateful ? statefulRef : ref;

  React.useEffect(() => {
    if (!forwardedRef) return;

    if (typeof forwardedRef === "function") {
      forwardedRef(innerRef.current);
    } else {
      (forwardedRef as React.MutableRefObject<T | null>).current =
        innerRef.current;
    }
  });

  return innerRef as React.MutableRefObject<T>;
}

export default useForwardedRef;
