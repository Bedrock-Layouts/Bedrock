/**
 * This module is adapted from https://github.com/mikolalysenko/to-px/blob/master/index.js
 */
function parseUnit(str) {
  str = String(str);
  const num = parseFloat(str);

  const [, unit] = str.match(/[\d.\-\+]*\s*(.*)/) ?? ["", ""];

  return [num, unit];
}

const PIXELS_PER_INCH = 96;

const defaults = {
  ch: 8,
  ex: 7.15625,
  em: 16,
  rem: 16,
  in: PIXELS_PER_INCH,
  cm: PIXELS_PER_INCH / 2.54,
  mm: PIXELS_PER_INCH / 25.4,
  pt: PIXELS_PER_INCH / 72,
  pc: PIXELS_PER_INCH / 6,
  px: 1,
};

export function toPX(str) {
  if (!str && str !== 0) return null;

  if (defaults[str]) return defaults[str];

  // detect number of units
  const parts = parseUnit(str);
  if (!isNaN(parts[0])) {
    if (parts[1]) {
      const px = toPX(parts[1]);
      return typeof px === "number" ? parts[0] * px : null;
    } else {
      return parts[0];
    }
  }

  return null;
}
