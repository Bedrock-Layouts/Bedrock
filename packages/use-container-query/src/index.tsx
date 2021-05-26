import React from "react";

type UseContainterQuery = (
  node: Element | undefined,
  width: number,
  maxWidth?: number
) => boolean;

type ResizeFunc = (r: ResizeObserverEntry) => void;

let observer: ResizeObserver;

const callBackMap = new WeakMap<
  Element,
  React.MutableRefObject<ResizeFunc>[]
>();

const useContainterQuery: UseContainterQuery = (node, width = 1, maxWidth) => {
  if (maxWidth !== undefined && maxWidth <= width) {
    throw new Error(
      `The second width value, ${maxWidth}, is not larger than ${width}. Please provide a value greater than first width value`
    );
  }

  const [matches, setMatch] = React.useState(false);

  const callBack = (entry: ResizeObserverEntry) => {
    //fix typings
    const nodeWidth =
      (entry.borderBoxSize as unknown as ResizeObserverSize)?.inlineSize ??
      entry.contentRect.width;

    if (typeof maxWidth !== "undefined") {
      setMatch(nodeWidth >= width && nodeWidth <= maxWidth);
    } else {
      setMatch(nodeWidth <= width);
    }
  };

  useResizeObserver(node, callBack);

  return matches;
};

function useResizeObserver(node: Element | undefined, callback: ResizeFunc) {
  const callbackRef = React.useRef<ResizeFunc>(() => void 0);

  callbackRef.current = callback;

  React.useEffect(() => {
    if (!observer) {
      observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const callBacks = callBackMap.get(entry.target);

          callBacks?.forEach((callback) => callback.current(entry));
        });
      });
    }
  }, []);

  React.useEffect(() => {
    if (node) {
      if (!callBackMap.has(node)) {
        callBackMap.set(node, []);
      }

      callBackMap.get(node)?.push(callbackRef);

      observer.observe(node);
    }

    return () => {
      if (node) {
        const callbacks = callBackMap.get(node) ?? [];
        const index = callbacks?.findIndex(
          (callback) => callback === callbackRef
        );
        if (index > -1) {
          callbacks.splice(index);
        }

        if (callbacks.length === 0) {
          observer.unobserve(node);
        }
      }
    };
  }, [node]);
}

export default useContainterQuery;
