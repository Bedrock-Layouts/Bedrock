import {
  SpacingOptions,
  getSpacingValue,
} from "@bedrock-layout/spacing-constants";
import { Stack, StackProps } from "@bedrock-layout/stack";
import { As, forwardRefWithAs } from "@bedrock-layout/type-utils";
import useContainerQuery from "@bedrock-layout/use-container-query";
import useForwardedRef from "@bedrock-layout/use-forwarded-ref";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

interface ColumnsBaseProps {
  gutter: keyof SpacingOptions;
  columns?: number;
  dense?: boolean;
  forwardedAs?: As<unknown>;
}

const ColumnsBase = styled.div.attrs<ColumnsBaseProps>(() => ({
  "data-bedrock-layout-columns": "",
}))<ColumnsBaseProps>`
  box-sizing: border-box;
  --gutter: ${({ gutter, theme }) => {
    const maybeGutter = getSpacingValue(theme, gutter);
    return maybeGutter ?? "0px";
  }};

  --columns: ${({ columns = 1 }) => {
    return columns > 0 ? columns : 1;
  }};

  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gutter);
  grid-auto-flow: row ${({ dense = false }) => (dense === true ? "dense" : "")};
`;

export interface ColumnsProps extends StackProps, ColumnsBaseProps {
  switchAt?: number | string;
  children?: React.ReactNode;
}

const ColumnComp = forwardRefWithAs<ColumnsProps, "div">(
  ({ columns, dense, switchAt, as, ...props }, ref) => {
    const safeRef = useForwardedRef(ref);
    const [maybePx, setMaybePx] = React.useState<number | null>(null);

    const node = safeRef.current;

    React.useEffect(() => {
      const maybePx =
        typeof switchAt === "string" ? toPX(switchAt, node) : null;

      setMaybePx(maybePx);
    }, [node, switchAt]);

    const widthToSwitchAt: number = maybePx
      ? maybePx
      : typeof switchAt === "number" && switchAt > -1
      ? switchAt
      : 0; //zero is used to make the switchAt a noop

    const shouldSwitch = useContainerQuery(node, widthToSwitchAt);

    return shouldSwitch ? (
      <Stack as={as} ref={safeRef} {...props} />
    ) : (
      <ColumnsBase
        as={as}
        ref={safeRef}
        columns={columns}
        dense={dense}
        {...props}
      />
    );
  }
);

export const Columns = styled(ColumnComp).attrs(({ as, forwardedAs }) => {
  return {
    forwardedAs: as ?? forwardedAs,
    as: ColumnComp,
  };
})``;

Columns.displayName = "Columns";

Columns.propTypes = {
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
  columns: PropTypes.number,
  dense: PropTypes.bool,
  switchAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export interface ColumnProps {
  span?: number;
}

const safeSpan = (span: unknown) => {
  return typeof span === "number" ? span : 1;
};

/**
 * ColumnsProps passed twice to make propTypes work.
 *
 * span is remaped to colSpan due to span being an attribute that gets
 * passed to the underlying element.  This can cause issues with Grid layout.
 *
 * In a future breaking change, colSpan should be the public API.
 * */
export const Column = styled.div.attrs<ColumnProps, { colSpan?: number }>(
  (props) => {
    const { span } = props;

    return {
      "data-bedrock-layout-column": "",
      span: undefined,
      colSpan: span,
    };
  }
)<ColumnProps>`
  --span: ${(props) => Math.max(safeSpan(props.colSpan), 1)};

  grid-column: span min(var(--span), var(--columns)) / auto;
`;

Column.displayName = "Column";

Column.propTypes = {
  span: PropTypes.number,
};

/**
 * This module is adapted from https://github.com/mikolalysenko/to-px/blob/master/browser.js
 */

//Logic forked from is-in-browser npm package
/* istanbul ignore next */
const isBrowser =
  typeof window === "object" &&
  typeof document === "object" &&
  document.nodeType === 9;

/* istanbul ignore next */
function parseUnit(str: string): [number, string] {
  str = String(str);
  const num = parseFloat(str);

  const [, unit] = str.match(/[\d.\-+]*\s*(.*)/) ?? ["", ""];

  return [num, unit];
}
/* istanbul ignore next */
const PIXELS_PER_INCH: number = isBrowser
  ? getSizeBrutal("in", document.body)
  : 96; // 96

/* istanbul ignore next */
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

/* istanbul ignore next */
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
