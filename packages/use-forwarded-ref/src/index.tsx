import { useStatefulRef } from "@bedrock-layout/use-stateful-ref";
import { useRef } from "react";
import React from "react";

export interface Config {
  isStateful: boolean;
}

export function useForwardedRef<T>(
  forwardedRef?: React.Ref<T>,
  config: Config = { isStateful: true }
): React.RefObject<T> {
  const statefulRef = useStatefulRef<T>();
  const ref = useRef<T>(null);

  const innerRef = config.isStateful ? statefulRef : ref;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  React.useImperativeHandle(forwardedRef, () => innerRef.current);

  return innerRef;
}
