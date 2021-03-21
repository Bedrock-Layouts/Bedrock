/**
 * This module is adapted from https://github.com/mikolalysenko/to-px/blob/master/browser.js
 */
function parseUnit(str: string): [number, string] {
  str = String(str);
  const num = parseFloat(str);

  const [, unit] = str.match(/[\d.\-\+]*\s*(.*)/) ?? ["", ""];

  return [num, unit];
}

const PIXELS_PER_INCH: number = getSizeBrutal("in", document.body); // 96

function getPropertyInPX(element: Element, prop: string): number {
  var [value, units] = parseUnit(
    getComputedStyle(element).getPropertyValue(prop)
  );
  return value * (toPX(units, element) ?? 1);
}

function getSizeBrutal(unit: string, element: Element) {
  var testDIV = document.createElement("div");
  testDIV.style["height"] = "128" + unit;
  element.appendChild(testDIV);
  var size = getPropertyInPX(testDIV, "height") / 128;
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
