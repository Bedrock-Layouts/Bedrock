import { Grid, GridProps } from "@bedrock-layout/grid";
import {
  SpacingOptions,
  getSpacingValue,
} from "@bedrock-layout/spacing-constants";
import useStatefulRef from "@bedrock-layout/use-stateful-ref";
import React, { Children, useState } from "react";
import styled, { CSSProperties, ThemeContext } from "styled-components";

//Logic forked from is-in-browser npm package
const isBrowser =
  typeof window === "object" &&
  typeof document === "object" &&
  document.nodeType === 9;

const RowSpanner = styled.div`
  --rows: 1;
  grid-row: span var(--rows);

  > * {
    display: block;
    height: 100%;
  }
`;

const safeTheme = {};

const Resizer: React.FC<{ gutter: keyof SpacingOptions }> = ({
  children,
  gutter,
}) => {
  const [rowSpan, setRowSpan] = useState(1);

  const childRef = useStatefulRef<HTMLDivElement>(null);
  const observerRef = useStatefulRef<ResizeObserver>(null);

  const theme = React.useContext(ThemeContext) || safeTheme;

  const getRowHeight = React.useCallback(
    (node: Element) => {
      const gapString = getSpacingValue(theme, gutter) ?? "1px";

      const maybeGap = isBrowser ? toPX(gapString, childRef.current) : null;

      const gap: number = Math.max(maybeGap ?? 1, 1);

      const [child] = Array.from(node.children);
      const height = 1 + Math.min(node.scrollHeight, child.scrollHeight);

      return Math.ceil((height + gap) / gap);
    },
    [theme, gutter, childRef]
  );

  React.useEffect(() => {
    if (childRef.current) setRowSpan(getRowHeight(childRef.current));
  }, [childRef, getRowHeight]);

  React.useEffect(() => {
    observerRef.current = new ResizeObserver(([{ target }]) => {
      setRowSpan(1);
      const rowHeight = getRowHeight(target);
      setRowSpan(rowHeight);
    });

    const { current: node } = childRef;
    const { current: observer } = observerRef;

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (observer) {
        observer.unobserve(node);
      }
    };
  }, [childRef, getRowHeight, observerRef]);

  return (
    <RowSpanner
      style={({ "--rows": rowSpan } as unknown) as CSSProperties}
      ref={childRef}
    >
      {children}
    </RowSpanner>
  );
};

export const MasonryGrid = styled(Grid).attrs<GridProps>((props) => {
  delete ((props as unknown) as Record<string, unknown>)[
    "data-bedrock-layout-grid"
  ];
  return {
    "data-bedrock-layout-masonry-grid": "",
    "data-bedrock-layout-grid": undefined,
    children: Children.map(props.children, (child) => (
      <Resizer gutter={props.gutter ?? "lg"}>{child}</Resizer>
    )),
  };
})`
  grid-template-rows: 1px;
`;

MasonryGrid.displayName = "MasonryGrid";

MasonryGrid.propTypes = Grid.propTypes;

/**
 * This module is adapted from https://github.com/mikolalysenko/to-px/blob/master/browser.js
 */
function parseUnit(str: string): [number, string] {
  str = String(str);
  const num = parseFloat(str);

  const [, unit] = str.match(/[\d.\-+]*\s*(.*)/) ?? ["", ""];

  return [num, unit];
}

const PIXELS_PER_INCH: number = isBrowser
  ? getSizeBrutal("in", document.body)
  : 96; // 96

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

export function toPX(str: string, element?: Element): number | null {
  if (!str) return null;

  const elementOrBody = element ?? document.body;
  const safeStr = (str || "px").trim().toLowerCase();

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
