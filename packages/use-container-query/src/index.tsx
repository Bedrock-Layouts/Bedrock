import { useForwardedRef } from "@bedrock-layout/use-forwarded-ref";
import { useResizeObserver } from "@bedrock-layout/use-resize-observer";
import React from "react";

interface UseContainerQueryProps {
  width: number;
  maxWidth?: number;
}

export function useContainerQuery<T extends Element>(
  { width = 1, maxWidth }: UseContainerQueryProps,
  forwardedRef?: React.Ref<T>
): [boolean, React.MutableRefObject<T>] {
  if (maxWidth !== undefined && maxWidth <= width) {
    throw new Error(
      `The second width value, ${maxWidth}, is not larger than ${width}. Please provide a value greater than first width value`
    );
  }
  const [matches, setMatch] = React.useState(false);
  const containerRef = useForwardedRef(forwardedRef);

  useResizeObserver((entry: ResizeObserverEntry) => {
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
  }, containerRef.current);

  return [matches, containerRef];
}

export default useContainerQuery;
