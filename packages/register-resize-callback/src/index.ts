export type ResizeFunc = (r: ResizeObserverEntry) => void;
export type DeregisterFunc = () => void;

type ObserverCallback =
  | ResizeFunc
  | {
      current: ResizeFunc;
    };

let observer: ResizeObserver | undefined;

const callBackMap = new WeakMap<Element, ObserverCallback[]>();

/* istanbul ignore next */
export function init(): void {
  if (observer) return;
  observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const maybeCallBacks = callBackMap.get(entry.target);
      /**
       * This is defensive code, but it's possible that get returns undefined
       */
      /* istanbul ignore next */
      const safeCallBacks = maybeCallBacks ?? [];

      safeCallBacks.forEach((cb) => {
        if (typeof cb === "function") {
          cb(entry);
        } else {
          cb.current(entry);
        }
      });
    });
  });
}

function assertIsResizeOberver(
  obj?: ResizeObserver
): asserts obj is ResizeObserver {
  if (obj === undefined) {
    throw new Error("ResizeObserver is not defined.  Please call init()");
  }
}

export function registerCallback(
  node: Element,
  cb: ObserverCallback
): DeregisterFunc {
  assertIsResizeOberver(observer);

  const callbacks = callBackMap.get(node) ?? [];

  callBackMap.set(node, callbacks.concat(cb));
  observer.observe(node);

  return () => {
    assertIsResizeOberver(observer);

    const maybeCallBacks = callBackMap.get(node);
    /**
     * This is defensive code, but it's possible that get returns undefined
     */
    /* istanbul ignore next */
    const safeCallBacks = maybeCallBacks ?? [];
    const newCallbacks = safeCallBacks.filter((ref) => ref !== cb);

    callBackMap.set(node, newCallbacks);

    if (newCallbacks.length === 0) {
      observer.unobserve(node);
      callBackMap.delete(node);
    }
  };
}
