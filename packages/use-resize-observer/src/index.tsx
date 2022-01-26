import useStatefulRef from "@bedrock-layout/use-stateful-ref";
import { useEffect, useLayoutEffect, useRef } from "react";

type ResizeFunc = (r: ResizeObserverEntry) => void;

let observer: ResizeObserver;

const callBackMap = new WeakMap<
  Element,
  React.MutableRefObject<ResizeFunc>[]
>();

/* istanbul ignore next */
function init() {
  if (observer) return;
  observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const maybeCallBacks = callBackMap.get(entry.target);
      /**
       * This is defensive code, but it's possible that get returns undefined
       */
      /* istanbul ignore next */
      const safeCallBacks = maybeCallBacks ?? [];

      safeCallBacks.forEach((cb) => cb.current(entry));
    });
  });
}

export default function useResizeObserver<T extends Element>(
  callback: ResizeFunc,
  node?: T
): React.MutableRefObject<T> {
  /**
   * initialize callbackRef with noop function
   */
  /* istanbul ignore next */
  const callbackRef = useRef<ResizeFunc>(callback);

  const nodeRef = useStatefulRef<T>();

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const currentNode = nodeRef.current ?? node;

  useEffect(() => {
    init();
    /**
     * node is undefined when the component is unmounted or not yet mounted
     */
    /* istanbul ignore next */
    if (currentNode) {
      const maybeCallBacks = callBackMap.get(currentNode);
      /**
       * This is defensive code, but it's possible that get returns undefined
       */
      /* istanbul ignore next */
      const safeCallBacks = maybeCallBacks ?? [];
      const newCallbacks = safeCallBacks.concat(callbackRef);

      callBackMap.set(currentNode, newCallbacks);

      observer.observe(currentNode);
    }

    return () => {
      /**
       * node is undefined when the component is unmounted or not yet mounted
       */
      /* istanbul ignore next */
      if (currentNode) {
        const maybeCallBacks = callBackMap.get(currentNode);
        /**
         * This is defensive code, but it's possible that get returns undefined
         */
        /* istanbul ignore next */
        const safeCallBacks = maybeCallBacks ?? [];
        const newCallbacks = safeCallBacks.filter((ref) => ref !== callbackRef);

        callBackMap.set(currentNode, newCallbacks);

        if (newCallbacks.length === 0) {
          observer.unobserve(currentNode);
        }
      }
    };
  }, [currentNode]);

  return nodeRef;
}
