import {
  CSSLength,
  Gutter,
  SizesOptions,
  getSafeGutter,
  getSizeValue,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
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
  "1/4": "fraction:1/4",
  "1/3": "fraction:1/3",
  "1/2": "fraction:1/2",
  "2/3": "fraction:2/3",
  "3/4": "fraction:3/4",
  "auto-start": `auto 1fr`,
  "auto-end": `1fr auto`,
};

type MinItemWidth = number | CSSLength | SizesOptions;
export interface SplitProps {
  gutter?: Gutter;
  fraction?: FractionTypes;
  switchAt?: number | CSSLength | SizesOptions;
  minItemWidth?: MinItemWidth;
}

export const Split = styled.div.attrs<SplitProps>(
  ({ fraction, theme, gutter, minItemWidth, switchAt, style }) => {
    const attrString =
      fraction && fractions[fraction] ? `fraction:${fraction}` : "";

    const maybeGutter = getSafeGutter(theme, gutter);

    const safeMinItemWidth = getSizeValue(theme, minItemWidth) ?? minItemWidth;

    const safeSwitchAt = getSizeValue(theme, switchAt) ?? switchAt;

    return {
      "data-bedrock-split": attrString,
      style: {
        ...style,
        "--gutter": maybeGutter,
        "--minItemWidth":
          typeof safeMinItemWidth === "number"
            ? `${safeMinItemWidth}px`
            : safeMinItemWidth,
        "--switchAt":
          typeof safeSwitchAt === "number" ? `${safeSwitchAt}px` : safeSwitchAt,
      },
      gutter: undefined,
    };
  }
)<SplitProps>`
  @property --gutter {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: 0;
  }

  @property --switchAt {
    syntax: "<length-percentage>";
    inherits: true;
    initial-value: 0;
  }

  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gutter, 0);

  > * {
    box-sizing: border-box;
    margin: 0;
    flex-grow: 1;
    max-inline-size: unset;
  }

  &[data-bedrock-split~="fraction:1/4"] > *:nth-child(odd) {
    flex-basis: max(var(--minItemWidth, 0px), calc(25% - var(--gutter) / 4));
  }

  &[data-bedrock-split~="fraction:1/3"] > *:nth-child(odd) {
    flex-basis: max(
      var(--minItemWidth, 0px),
      calc(33.333% - var(--gutter) / 3)
    );
  }

  &[data-bedrock-split~="fraction:1/2"] > *:nth-child(odd) {
    flex-basis: max(var(--minItemWidth, 0px), calc(50% - var(--gutter) / 2));
  }

  &[data-bedrock-split~="fraction:2/3"] > *:nth-child(even) {
    flex-basis: max(
      var(--minItemWidth, 0px),
      calc(33.333% - var(--gutter) / 3)
    );
  }

  &[data-bedrock-split~="fraction:3/4"] > *:nth-child(even) {
    flex-basis: max(var(--minItemWidth, 0px), calc(25% - var(--gutter) / 4));
  }

  &[data-bedrock-split~="fraction:auto-start"] > *:nth-child(odd) {
    flex-basis: var(--minItemWidth, 0);
  }

  &[data-bedrock-split~="fraction:auto-end"] > *:nth-child(even) {
    flex-basis: var(--minItemWidth, 0);
  }

  :is([data-bedrock-split~="fraction:1/4"], [data-bedrock-split~="fraction:1/3"], [data-bedrock-split~="fraction:1/2"], [data-bedrock-split~="fraction:auto-start"])
    > *:nth-child(even) {
    --largestWidth: calc(100% - var(--gutter, 0px));
    flex-basis: calc(
      (var(--switchAt, var(--largestWidth)) - var(--largestWidth)) * 999
    );
    min-inline-size: max(
      min(var(--minItemWidth, 0), 100%),
      calc(50% - var(--gutter))
    );
    flex-grow: 999;
  }

  :is([data-bedrock-split~="fraction:3/4"], [data-bedrock-split~="fraction:2/3"], [data-bedrock-split~="fraction:auto-end"])
    > *:nth-child(odd) {
    --largestWidth: calc(100% - var(--gutter, 0px));
    flex-basis: calc(
      (var(--switchAt, var(--largestWidth)) - var(--largestWidth)) * 999
    );
    min-inline-size: max(
      min(var(--minItemWidth, 0), 100%),
      calc(50% - var(--gutter))
    );
    flex-grow: 999;
  }
`;

Split.displayName = "Split";

Split.propTypes = {
  fraction: PropTypes.oneOf<FractionTypes>(
    Object.keys(fractions) as FractionTypes[]
  ),
};
