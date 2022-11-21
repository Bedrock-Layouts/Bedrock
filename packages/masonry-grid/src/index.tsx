import { Grid, GridProps } from "@bedrock-layout/grid";
import {
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { PolymorphicRef } from "@bedrock-layout/type-utils";
import { useResizeObserver } from "@bedrock-layout/use-resize-observer";
import React, {
  CSSProperties,
  Children,
  ComponentPropsWithoutRef,
  ElementType,
  cloneElement,
  forwardRef,
  useState,
} from "react";

//Logic forked from is-in-browser npm package
/* c8 ignore next */
const isBrowser =
  typeof window === "object" &&
  typeof document === "object" &&
  (document as Document).nodeType === 9;

const RowSpanner = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ style, ...props }, ref) => {
    const safeStyle = style ?? {};
    return (
      <div
        ref={ref}
        {...props}
        style={{ ...safeStyle, gridRow: "span var(--rows, 1)" }}
      />
    );
  }
);

const Resizer = ({
  children,
  gutter,
}: React.PropsWithChildren<{ gutter?: Gutter }>) => {
  const [rowSpan, setRowSpan] = useState(1);

  const theme = useTheme();

  /* c8 ignore next */
  const childRef = useResizeObserver<HTMLDivElement>(({ target }) => {
    setRowSpan(1);
    const gapString = getSafeGutter(theme, gutter) ?? "1px";

    const maybeGap = isBrowser ? toPX(gapString, target) : null;

    const gap: number = Math.max(maybeGap ?? 1, 1);

    const [child] = Array.from(target.children);
    const height = 1 + Math.min(target.scrollHeight, child.scrollHeight);

    const rowHeight = Math.ceil(height / gap);

    setRowSpan(rowHeight);
  });

  return (
    <RowSpanner style={{ "--rows": rowSpan } as CSSProperties} ref={childRef}>
      {Children.map(children, (child) => {
        return cloneElement(child as React.ReactElement, {
          style: {
            display: "block",
            height: "100%",
          },
        });
      })}
    </RowSpanner>
  );
};

export const MasonryGrid = forwardRef(
  <C extends ElementType>(
    { children, style, ...props }: GridProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const safeStyle = style ?? {};
    return (
      <Grid
        ref={ref}
        data-bedrock-masonry-grid
        {...props}
        style={{ ...safeStyle, gridTemplateRows: "1px" }}
      >
        {Children.map(children, (child) => (
          <Resizer gutter={props.gutter}>{child}</Resizer>
        ))}
      </Grid>
    );
  }
);

MasonryGrid.displayName = "MasonryGrid";

/**
 * This module is adapted from https://github.com/mikolalysenko/to-px/blob/master/browser.js
 */

const PIXELS_PER_INCH = 96;

/* c8 ignore start */
function parseUnit(str: string): [number, string] {
  str = String(str);
  const num = parseFloat(str);

  const [, unit] = str.match(/[\d.\-+]*\s*(.*)/) ?? ["", ""];

  return [num, unit];
}

function toPX(str: string, element?: Element): number | null {
  if (!str) return null;

  const elementOrBody = element ?? document.body;
  const safeStr = (str ?? "px").trim().toLowerCase();

  switch (safeStr) {
    case "vmin":
    case "vmax":
    case "vh":
    case "vw":
    case "%":
      return null;
    case "ch":
    case "ex":
      return getSizeBrutal(safeStr, elementOrBody);
    case "em":
      return getPropertyInPX(elementOrBody, "font-size");
    case "rem":
      return getPropertyInPX(document.body, "font-size");
    case "in":
      return PIXELS_PER_INCH;
    case "cm":
      return PIXELS_PER_INCH / 2.54;
    case "mm":
      return PIXELS_PER_INCH / 25.4;
    case "pt":
      return PIXELS_PER_INCH / 72;
    case "pc":
      return PIXELS_PER_INCH / 6;
    case "px":
      return 1;
    default: {
      const [value, units] = parseUnit(safeStr);

      if (isNaN(value)) return null;

      if (!units) return value;

      const px = toPX(units, element);
      return typeof px === "number" ? value * px : null;
    }
  }
}

/* c8 ignore next */
function getPropertyInPX(element: Element, prop: string): number {
  const [value, units] = parseUnit(
    getComputedStyle(element).getPropertyValue(prop)
  );
  return value * (toPX(units, element) ?? 1);
}

function getSizeBrutal(unit: string, element: Element) {
  const testDIV = document.createElement("div");
  testDIV.style["height"] = "128" + unit;
  element.appendChild(testDIV);
  const size = getPropertyInPX(testDIV, "height") / 128;
  element.removeChild(testDIV);
  return size;
}
/* c8 ignore end */
