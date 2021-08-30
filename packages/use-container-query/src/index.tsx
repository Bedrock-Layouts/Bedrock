import React from "react";

import { useResizeObserver } from "./useResizeObserver";

type UseContainterQuery = (
  node: Element | undefined,
  width: number,
  maxWidth?: number
) => boolean;

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

    //nodeWidth can be zero when it is switching from one node to another.  This will ignore that.
    if (nodeWidth > 0) {
      const newMatch =
        maxWidth === undefined
          ? nodeWidth <= width
          : nodeWidth >= width && nodeWidth <= maxWidth;

      setMatch(newMatch);
    }
  };

  useResizeObserver(node, callBack);

  return matches;
};

export default useContainterQuery;
