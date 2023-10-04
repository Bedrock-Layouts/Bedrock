export type ResizeFunc = (r: ResizeObserverEntry) => unknown;
export type DeregisterFunc = () => unknown | Error;

type ObserverCallback =
  | ResizeFunc
  | {
      current: ResizeFunc;
    };

// eslint-disable-next-line functional/no-let
let observer: ResizeObserver | undefined;

const callBackMap = new WeakMap<Element, ObserverCallback[]>();

/* c8 ignore next */
export function init(): ResizeObserver {
  if (observer) return observer;

  return (observer = new ResizeObserver((entries) => {
    return entries.map((entry) => {
      const maybeCallBacks = callBackMap.get(entry.target);
      /**
       * This is defensive code, but it's possible that get returns undefined
       */
      /* c8 ignore next */
      const safeCallBacks = maybeCallBacks ?? [];

      if (safeCallBacks.length === 0) return entry;

      requestAnimationFrame(() => {
        return safeCallBacks.map((callback) => {
          const safeCallback =
            typeof callback === "function" ? callback : callback.current;

          safeCallback(entry);

          return callback;
        });
      });
      return entry;
    });
  }));
}

function checkIsResizeOberver(obj?: ResizeObserver): obj is ResizeObserver {
  if (obj === undefined) {
    return false;
  }
  return true;
}

export function registerCallback(
  node: Readonly<Element>,
  // eslint-disable-next-line functional/prefer-immutable-types
  cb: ObserverCallback,
): DeregisterFunc {
  const isNotNull = checkIsResizeOberver(observer);

  if (isNotNull === false) {
    return () =>
      new Error("ResizeObserver is not defined.  Please call init()");
  }

  const callbacks = callBackMap.get(node) ?? [];

  callBackMap.set(node, callbacks.concat(cb));
  observer?.observe(node);

  return () => {
    const maybeCallBacks = callBackMap.get(node);
    /**
     * This is defensive code, but it's possible that get returns undefined
     */
    /* c8 ignore next */
    const safeCallBacks = maybeCallBacks ?? [];
    const newCallbacks = safeCallBacks.filter((ref) => ref !== cb);

    callBackMap.set(node, newCallbacks);

    if (newCallbacks.length === 0) {
      observer?.unobserve(node);
      callBackMap.delete(node);
    }
    return observer;
  };
}
