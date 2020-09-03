import { useEffect, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

type UseContainterQuery = (
  node: Element,
  width: number,
  maxWidth?: number
) => boolean;

const useContainterQuery: UseContainterQuery = (node, width = 1, maxWidth) => {
  if (typeof maxWidth !== "undefined" && maxWidth <= width) {
    throw new Error(
      `The second width value, ${maxWidth}, is not larger than ${width}. Please provide a value greater than first width value`
    );
  }

  const [matches, setMatch] = useState(false);

  useEffect(() => {
    let observer: ResizeObserver;
    if (node) {
      observer = new ResizeObserver(([entry]) => {
        /* 
        I am using `any` as this is future forward, but the types do not yet exist
        due to it being still experimental
        */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const nodeWidth = (entry as any).borderBox
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (entry as any).borderBox.inlineSize
          : entry.contentRect.width;
        if (typeof maxWidth !== "undefined") {
          setMatch(nodeWidth >= width && nodeWidth <= maxWidth);
        } else {
          setMatch(nodeWidth <= width);
        }
      });
      observer.observe(node);
    } else {
      setMatch(false);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [setMatch, node, width, maxWidth]);
  return matches;
};

export default useContainterQuery;
