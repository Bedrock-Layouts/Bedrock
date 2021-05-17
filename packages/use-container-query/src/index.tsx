import { useEffect, useState } from "react";

type UseContainterQuery = (
  node: Element | undefined,
  width: number,
  maxWidth?: number
) => boolean;

let observer: ResizeObserver;

const callBackMap = new WeakMap<Element, (r: ResizeObserverEntry) => void>();

const useContainterQuery: UseContainterQuery = (node, width = 1, maxWidth) => {
  if (maxWidth !== undefined && maxWidth <= width) {
    throw new Error(
      `The second width value, ${maxWidth}, is not larger than ${width}. Please provide a value greater than first width value`
    );
  }

  const [matches, setMatch] = useState(false);

  if (node) {
    callBackMap.set(node, (entry) => {
      //fix typings
      const nodeWidth =
        (entry.borderBoxSize as unknown as ResizeObserverSize)?.inlineSize ??
        entry.contentRect.width;

      if (typeof maxWidth !== "undefined") {
        setMatch(nodeWidth >= width && nodeWidth <= maxWidth);
      } else {
        setMatch(nodeWidth <= width);
      }
    });
  }

  useEffect(() => {
    if (!observer) {
      observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const maybeCallback = callBackMap.get(entry.target);
          if (maybeCallback) {
            maybeCallback(entry);
          }
        });
      });
    }

    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [node]);

  return matches;
};

export default useContainterQuery;
