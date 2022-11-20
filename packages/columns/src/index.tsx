import {
  Gutter,
  getSafeGutter,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { Stack, StackProps } from "@bedrock-layout/stack";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@bedrock-layout/type-utils";
import { useContainerQuery } from "@bedrock-layout/use-container-query";
import React, { CSSProperties, ElementType, forwardRef } from "react";

interface BaseColumnsProps {
  gutter?: Gutter;
  columns?: number;
  dense?: boolean;
  forwardedAs?: unknown;
}

type ColumnsBaseProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, BaseColumnsProps>;

const ColumnsBase = forwardRef(
  <C extends ElementType = "div">(
    { as, dense, gutter, columns = 1, style, ...props }: ColumnsBaseProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const theme = useTheme();
    const maybeGutter = getSafeGutter(theme, gutter);
    const safeColumns = columns > 0 ? columns : 1;
    const safeStyle = style ?? {};

    const Component = as ?? "div";

    return (
      <Component
        ref={ref}
        data-bedrock-columns={dense ? "dense" : ""}
        style={
          {
            ...safeStyle,
            "--gutter": maybeGutter,
            "--columns": safeColumns,
          } as CSSProperties
        }
        {...props}
      />
    );
  }
);

interface ColumnsPropsBase extends StackProps, ColumnsBaseProps {
  switchAt?: number | string;
  children?: React.ReactNode;
}

export type ColumnsProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, ColumnsPropsBase>;

export const Columns = forwardRef(
  <C extends ElementType = "div">(
    { columns, dense, switchAt, as, gutter, ...props }: ColumnsProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const maybePx = React.useMemo(() => {
      return typeof switchAt === "string"
        ? toPX(switchAt)
        : typeof switchAt === "number" && switchAt > -1
        ? switchAt
        : null;
    }, [switchAt]);

    const widthToSwitchAt: number = maybePx ?? 0; //zero is used to make the switchAt a noop

    const [shouldSwitch, safeRef] = useContainerQuery(
      { width: widthToSwitchAt },
      ref
    );

    return shouldSwitch ? (
      <Stack as={as} ref={safeRef} gutter={gutter} {...props} />
    ) : (
      <ColumnsBase
        as={as}
        ref={safeRef}
        gutter={gutter}
        columns={columns}
        dense={dense}
        {...props}
      />
    );
  }
);

Columns.displayName = "Columns";

export interface ColumnPropsBase {
  span?: number;
  offsetStart?: number;
  offsetEnd?: number;
}

export type ColumnProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, ColumnPropsBase>;

const safeSpan = (span: unknown) => {
  return typeof span === "number" ? span : 1;
};

/**
 *
 * span is remaped to colSpan due to span being an attribute that gets
 * passed to the underlying element.  This can cause issues with Grid layout.
 *
 * In a future breaking change, colSpan should be the public API.
 * */
export const Column = forwardRef(
  <C extends ElementType = "div">(
    {
      as,
      span,
      style,
      offsetStart = 0,
      offsetEnd = 0,
      ...props
    }: ColumnProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const safeOffsetStart = offsetStart > 0 ? offsetStart : undefined;
    const safeOffsetEnd = offsetEnd > 0 ? offsetEnd : undefined;
    const safeStyle = style ?? {};

    const Component = as ?? "div";

    return (
      <Component
        data-bedrock-column
        ref={ref}
        style={
          {
            ...safeStyle,
            "--span": Math.max(safeSpan(span), 1),
            "--offsetStart": safeOffsetStart,
            "--offsetEnd": safeOffsetEnd,
          } as CSSProperties
        }
        {...props}
      />
    );
  }
);

Column.displayName = "Column";

/**
 * This module is adapted from https://github.com/mikolalysenko/to-px/blob/master/browser.js
 */

const PIXELS_PER_INCH = 96;

/* c8 ignore start */
function parseUnit(str: string): [number, string] {
  str = String(str);
  const num = parseFloat(str);

  /* c8 ignore next */
  const [, unit] = str.match(/[\d.\-+]*\s*(.*)/) ?? ["", ""];

  return [num, unit];
}

/* c8 ignore next */
function toPX(str: string, element?: Element): number | null {
  /* c8 ignore next */
  if (!str) return null;

  const elementOrBody = element ?? document.body;
  const safeStr = (str ?? "px").trim().toLowerCase();

  /* c8 ignore next */
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
/* c8 ignore stop */
