import { useEffect, useRef } from "react";

type ResizeFunc = (r: ResizeObserverEntry) => void;

let observer: ResizeObserver;

const callBackMap = new WeakMap<
  Element,
  React.MutableRefObject<ResizeFunc>[]
>();

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

export function useResizeObserver(
  node: Element | undefined,
  callback: ResizeFunc
): void {
  /**
   * initialize callbackRef with noop function
   */
  /* istanbul ignore next */
  const callbackRef = useRef<ResizeFunc>(() => void 0);

  callbackRef.current = callback;

  useEffect(init, []);

  useEffect(() => {
    /**
     * node is undefined when the component is unmounted or not yet mounted
     */
    /* istanbul ignore next */
    if (node) {
      const maybeCallBacks = callBackMap.get(node);
      /**
       * This is defensive code, but it's possible that get returns undefined
       */
      /* istanbul ignore next */
      const safeCallBacks = maybeCallBacks ?? [];
      const newCallbacks = safeCallBacks.concat(callbackRef);

      callBackMap.set(node, newCallbacks);

      observer.observe(node);
    }

    return () => {
      /**
       * node is undefined when the component is unmounted or not yet mounted
       */
      /* istanbul ignore next */
      if (node) {
        const maybeCallBacks = callBackMap.get(node);
        /**
         * This is defensive code, but it's possible that get returns undefined
         */
        /* istanbul ignore next */
        const safeCallBacks = maybeCallBacks ?? [];
        const newCallbacks = safeCallBacks.filter((ref) => ref !== callbackRef);

        callBackMap.set(node, newCallbacks);

        if (newCallbacks.length === 0) {
          observer.unobserve(node);
        }
      }
    };
  }, [node]);
}
