/**
 * This module is adapted from https://github.com/mikolalysenko/to-px/blob/master/browser.js
 */

import type { Maybe } from "./typeUtils";

const PIXELS_PER_INCH = 96;

/* c8 ignore next */
function parseUnit(str: string): [number, string] {
  const safeStr = String(str);
  const num = parseFloat(safeStr);

  const [, unit] = safeStr.match(/[\d.\-+]*\s*(.*)/) ?? ["", ""];

  return [num, unit];
}

/* c8 ignore next */
export function toPX(str: string, element?: Readonly<Element>): Maybe<number> {
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
