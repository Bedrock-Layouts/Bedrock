import { useState, useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

interface DOMBoxSizeReadOnly {
  readonly blockSize: number;
  readonly inlineSize: number;
}

interface DOMRectReadOnly {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
  readonly borderBoxSize: DOMBoxSizeReadOnly;
  readonly contentBoxSize: DOMBoxSizeReadOnly;
}

export default function useNodeQuery(node: Element, width = 1) {
  const [matches, setMatch] = useState(false);

  useEffect(() => {
    let observer: ResizeObserver;
    if (node) {
      observer = new ResizeObserver(([entry]) => {
        const nodeWidth = (entry as any).borderBox
          ? (entry as any).borderBox.inlineSize
          : entry.contentRect.width;
        setMatch(nodeWidth <= width);
      });
      observer.observe(node);
    } else {
      setMatch(false);
    }
    return () => {
      if (observer) observer.disconnect();
    };
  }, [setMatch, node, width]);
  return matches;
}

export const useMatchContainerSizes = (node: Element) => {
  return {
    mobile: useNodeQuery(node, 320),
    tablet: useNodeQuery(node, 640),
    desktop: useNodeQuery(node, 1024),
    desktopLg: useNodeQuery(node, 1366),
    desktopHd: useNodeQuery(node, 4000),
  };
};
