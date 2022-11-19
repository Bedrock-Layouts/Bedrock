import {
  ResizeFunc,
  init,
  registerCallback,
} from "@bedrock-layout/register-resize-callback";
import { useStatefulRef } from "@bedrock-layout/use-stateful-ref";
import { useEffect, useRef } from "react";

export function useResizeObserver<T extends Element>(
  callback: ResizeFunc,
  node?: T
): React.RefObject<T> {
  const callbackRef = useRef<ResizeFunc>(callback);

  const nodeRef = useStatefulRef<T>();

  useEffect(() => {
    callbackRef.current = callback;
  });

  const currentNode = nodeRef.current ?? node;

  useEffect(() => {
    init();

    /**
     * node is undefined when the component is unmounted or not yet mounted
     */
    return currentNode
      ? registerCallback(currentNode, callbackRef.current)
      : undefined;
  }, [currentNode]);

  return nodeRef;
}

export default useResizeObserver;
