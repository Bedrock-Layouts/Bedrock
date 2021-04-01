import { Columns, ColumnsProps } from "@bedrock-layout/columns";
import { mergeBreakpoints } from "@bedrock-layout/spacing-constants";
import Split, { SplitProps } from "@bedrock-layout/split";
import Stack, { StackProps } from "@bedrock-layout/stack";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import useContainerQuery from "@bedrock-layout/use-container-query";
import useForwardedRef from "@bedrock-layout/use-forwarded-ref";
import PropTypes from "prop-types";
import React from "react";
import { ThemeContext } from "styled-components";

export interface SplitSwitcherProps extends StackProps, SplitProps {
  switchAt?: number | string;
  children?: React.ReactNode;
}

const safeTheme = { breakPoints: {} };

//Logic forked from is-in-browser npm package
const isBrowser =
  typeof window === "object" &&
  typeof document === "object" &&
  document.nodeType === 9;

export const SplitSwitcher = forwardRefWithAs<SplitSwitcherProps, "div">(
  ({ fraction, switchAt, as, ...props }, ref) => {
    const safeRef = useForwardedRef(ref);
    const { breakPoints = {} } = React.useContext(ThemeContext) || safeTheme;
    const [maybePx, setMaybePx] = React.useState<number | null>(null);

    React.useEffect(() => {
      const maybePx =
        isBrowser && typeof switchAt === "string"
          ? toPX(switchAt, safeRef.current)
          : null;

      setMaybePx(maybePx);
    }, [safeRef, switchAt]);

    const widthToSwitchAt: number = maybePx
      ? maybePx
      : typeof switchAt === "number" && switchAt > -1
      ? switchAt
      : mergeBreakpoints(breakPoints).smallOnly;

    const shouldSwitch = useContainerQuery(safeRef.current, widthToSwitchAt);

    return shouldSwitch ? (
      <Stack as={as} ref={safeRef} {...props} />
    ) : (
      <Split as={as} ref={safeRef} fraction={fraction} {...props} />
    );
  }
);

SplitSwitcher.displayName = "SplitSwitcher";

SplitSwitcher.propTypes = {
  ...Split.propTypes,
  switchAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export interface ColumnSwitcherProps extends StackProps, ColumnsProps {
  switchAt?: number | string;
  children?: React.ReactNode;
}

export const ColumnsSwitcher = forwardRefWithAs<ColumnSwitcherProps, "div">(
  ({ columns, dense, switchAt, as, ...props }, ref) => {
    const safeRef = useForwardedRef(ref);
    const { breakPoints = {} } = React.useContext(ThemeContext) || safeTheme;
    const [maybePx, setMaybePx] = React.useState<number | null>(null);

    React.useEffect(() => {
      const maybePx =
        isBrowser && typeof switchAt === "string"
          ? toPX(switchAt, safeRef.current)
          : null;

      setMaybePx(maybePx);
    }, [safeRef, switchAt]);

    const widthToSwitchAt: number = maybePx
      ? maybePx
      : typeof switchAt === "number" && switchAt > -1
      ? switchAt
      : mergeBreakpoints(breakPoints).smallOnly;

    const shouldSwitch = useContainerQuery(safeRef.current, widthToSwitchAt);

    return shouldSwitch ? (
      <Stack as={as} ref={safeRef} {...props} />
    ) : (
      <Columns
        as={as}
        ref={safeRef}
        columns={columns}
        dense={dense}
        {...props}
      />
    );
  }
);

ColumnsSwitcher.displayName = "ColumnsSwitcher";

ColumnsSwitcher.propTypes = {
  ...Columns.propTypes,
  switchAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

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
