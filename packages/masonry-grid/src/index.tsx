import { Grid, GridProps } from "@bedrock-layout/grid";
import {
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { convertToMaybe, forwardRefWithAs } from "@bedrock-layout/type-utils";
import { useResizeObserver } from "@bedrock-layout/use-resize-observer";
import React, {
  CSSProperties,
  Children,
  ComponentPropsWithoutRef,
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
  function RowSpanner({ style = {}, ...props }, ref) {
    return (
      <div
        ref={ref}
        style={{ gridRow: "span var(--rows, 1)", ...style }}
        {...props}
      />
    );
  },
);

type ResizerProps = Readonly<React.PropsWithChildren<{ gutter?: Gutter }>>;

function Resizer({ children, gutter }: ResizerProps) {
  const [rowSpan, setRowSpan] = useState(1);

  const theme = useTheme();

  /* c8 ignore next */
  const childRef = useResizeObserver<HTMLDivElement>(({ target }) => {
    setRowSpan(1);
    const gapString = getSafeGutter(theme, gutter) ?? "1px";

    const maybeGap = isBrowser ? convertToMaybe(toPX(gapString, target)) : 1;

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
            blockSize: "100%",
            ...((child as React.ReactElement).props.style ?? {}),
          },
        });
      })}
    </RowSpanner>
  );
}

/**
 * Props for MasonryGrid component.
 */
export type MasonryGridProps = GridProps;

/**
 * The `MasonryGrid` component is almost identical to the
 * [Grid component](https://www.bedrock-layout.dev/?path=/docs/spacer-components-masonrygrid--docs)
 * except that each item's vertical space will grow independent of each other.
 * The `MasonryGrid` component will then optimize the number of
 * columns based on the `minItemWidth` prop value passed in.
 *
 * `MasonryGrid` does not create standard rows. Instead, it will
 * optimize for the most dense vertical layout that it can achieve based on
 * the space available.
 *
 * @deprecated Use the `Grid` component with the `variant` prop set to "masonry" instead.
 */
export const MasonryGrid = forwardRefWithAs<"div", MasonryGridProps>(
  function MasonryGrid({ children, style = {}, ...props }, ref) {
    return (
      <Grid
        ref={ref}
        data-bedrock-masonry-grid
        {...props}
        style={{ gridTemplateRows: "1px", ...style }}
      >
        {Children.map(children, (child) => (
          <Resizer gutter={props.gutter}>{child}</Resizer>
        ))}
      </Grid>
    );
  },
);

/**
 * This module is adapted from https://github.com/mikolalysenko/to-px/blob/master/browser.js
 */

const PIXELS_PER_INCH = 96;

/* c8 ignore start */
function parseUnit(str: string): [number, string] {
  const safeStr = String(str);
  const num = parseFloat(safeStr);

  const [, unit] = safeStr.match(/[\d.\-+]*\s*(.*)/) ?? ["", ""];

  return [num, unit];
}

function toPX(str: string, element?: Readonly<Element>): number | undefined {
  if (!str) return undefined;

  const elementOrBody = element ?? document.body;
  const safeStr = (str ?? "px").trim().toLowerCase();

  switch (safeStr) {
    case "vmin":
    case "vmax":
    case "vh":
    case "vw":
    case "%":
      return undefined;
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

      if (isNaN(value)) return undefined;

      if (!units) return value;

      const px = toPX(units, element);
      return typeof px === "number" ? value * px : undefined;
    }
  }
}

/* c8 ignore next */
function getPropertyInPX(element: Readonly<Element>, prop: string): number {
  const [value, units] = parseUnit(
    getComputedStyle(element).getPropertyValue(prop),
  );
  return value * (toPX(units, element) ?? 1);
}

function getSizeBrutal(unit: string, element: Readonly<Element>) {
  const testDIV = document.createElement("div");
  // eslint-disable-next-line functional/immutable-data
  testDIV.style["height"] = "128" + unit;
  element.appendChild(testDIV);
  const size = getPropertyInPX(testDIV, "height") / 128;
  element.removeChild(testDIV);
  return size;
}

/* c8 ignore end */
