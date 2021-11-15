import {
  SpacingOptions,
  getSpacingValue,
} from "@bedrock-layout/spacing-constants";
import { Stack, StackProps } from "@bedrock-layout/stack";
import { As, forwardRefWithAs } from "@bedrock-layout/type-utils";
import useContainerQuery from "@bedrock-layout/use-container-query";
import useForwardedRef from "@bedrock-layout/use-forwarded-ref";
import PropTypes from "prop-types";
import * as React from "react";
import styled from "styled-components";

type FractionTypes =
  | "auto-start"
  | "auto-end"
  | "1/4"
  | "1/3"
  | "1/2"
  | "2/3"
  | "3/4";

type Fractions = {
  [key in FractionTypes]: string;
};

const fractions: Fractions = {
  "1/4": "1fr 3fr",
  "1/3": "1fr 2fr",
  "1/2": "1fr 1fr",
  "2/3": "2fr 1fr",
  "3/4": "3fr 1fr",
  "auto-start": `auto 1fr`,
  "auto-end": `1fr auto`,
};

interface SplitBaseProps {
  gutter: keyof SpacingOptions;
  fraction?: FractionTypes;
  forwardedAs?: As<unknown>;
}

const SplitBase = styled.div.attrs<SplitBaseProps>((props) => ({
  "data-bedrock-split":
    props.fraction && fractions[props.fraction]
      ? `fraction:${props.fraction}`
      : "",
}))<SplitBaseProps>`
  box-sizing: border-box;
  > * {
    margin: 0;
  }
  
  --gutter:${({ gutter, theme }) => getSpacingValue(theme, gutter) ?? "0px"};

  display: grid;
  gap: var(--gutter);
  grid-template-columns: ${({ fraction = "1/2" }) =>
    fractions[fraction] ?? fractions["1/2"]}};
`;

export interface SplitProps extends StackProps, SplitBaseProps {
  switchAt?: number | string;
  children?: React.ReactNode;
}

const Splitter = forwardRefWithAs<SplitProps, "div">(
  ({ fraction, switchAt, as, ...props }, ref) => {
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
      <SplitBase as={as} ref={safeRef} fraction={fraction} {...props} />
    );
  }
);

export const Split = styled(Splitter).attrs(({ as, forwardedAs }) => {
  return {
    forwardedAs: as ?? forwardedAs,
    as: Splitter,
  };
})``;

Split.displayName = "Split";

Split.propTypes = {
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
  fraction: PropTypes.oneOf<FractionTypes>(
    Object.keys(fractions) as FractionTypes[]
  ),
  switchAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
