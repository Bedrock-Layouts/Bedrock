import { useEffect, useState } from "react";

type UseContainterQuery = (
  node: Element,
  width: number,
  maxWidth?: number
) => boolean;

const useContainterQuery: UseContainterQuery = (node, width = 1, maxWidth) => {
  if (maxWidth !== undefined && maxWidth <= width) {
    throw new Error(
      `The second width value, ${maxWidth}, is not larger than ${width}. Please provide a value greater than first width value`
    );
  }

  const [matches, setMatch] = useState(false);

  useEffect(() => {
    let observer: ResizeObserver | undefined;
    if (node && window.ResizeObserver) {
      observer = new ResizeObserver(([entry]) => {
        const nodeWidth =
          entry.borderBoxSize?.inlineSize ?? entry.contentRect.width;

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
      observer?.disconnect();
    };
  }, [setMatch, node, width, maxWidth]);

  return matches;
};

export default useContainterQuery;
