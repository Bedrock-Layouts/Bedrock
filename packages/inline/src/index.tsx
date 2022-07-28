import {
  InlineCluster,
  InlineClusterProps,
} from "@bedrock-layout/inline-cluster";
import {
  CSSLength,
  SizesOptions,
  checkIsCSSLength,
  getSizeValue,
  sizes,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

type MinItemWidth = number | CSSLength | SizesOptions;
type Stretch = "all" | "start" | "end" | number;
type SwitchAt = CSSLength | number;

export interface InlineProps extends InlineClusterProps {
  stretch?: Stretch;
  switchAt?: SwitchAt;
  minItemWidth?: MinItemWidth;
}

function shouldUseSwitch(switchAt?: SwitchAt) {
  if (switchAt === undefined) {
    return false;
  }

  return typeof switchAt === "string"
    ? checkIsCSSLength(switchAt)
    : switchAt > -1;
}

export const Inline = styled(InlineCluster).attrs<InlineProps>(
  ({ justify, align, stretch, style, switchAt, theme, minItemWidth }) => {
    const justifyValue = justify ? `justify:${justify}` : "justify:start";
    const alignValue = align ? `align:${align}` : "align:start";
    const stretchValue = stretch ? `stretch:${stretch}` : undefined;
    const safeMinItemWidth = getSizeValue(theme, minItemWidth) ?? minItemWidth;
    const switchAtValue = shouldUseSwitch(switchAt)
      ? typeof switchAt === "string"
        ? switchAt
        : `${switchAt}px`
      : undefined;

    return {
      "data-bedrock-inline": [justifyValue, alignValue, stretchValue]
        .filter(Boolean)
        .join(" "),
      "data-bedrock-inline-cluster": undefined,
      style: {
        ...style,
        "--switchAt": switchAtValue,
        "--minItemWidth":
          typeof safeMinItemWidth === "number"
            ? `${safeMinItemWidth}px`
            : safeMinItemWidth,
      },
    };
  }
)<InlineProps>`
  @property --switchAt {
    syntax: "<length-percentage>";
    inherits: true;
    initial-value: 0;
  }

  flex-wrap: nowrap;

  > * {
    margin: 0;
  }

  ${({ stretch }) =>
    stretch === "all"
      ? `> *  { flex: 1 }`
      : stretch === "start"
      ? `> :first-child { flex: 1 }`
      : stretch === "end"
      ? `> :last-child { flex: 1 }`
      : typeof stretch === "number"
      ? `> :nth-child(${stretch + 1}) { flex: 1 }`
      : null}

  &[style*="--minItemWidth"] {
    > * {
      min-inline-size: var(--minItemWidth, 0);
    }
  }

  &[style*="--switchAt"] {
    flex-wrap: wrap;
    > * {
      flex-basis: calc((var(--switchAt) - (100% - var(--gutter, 0px))) * 999);
    }
  }
`;

Inline.displayName = "Inline";

function validateMinItemWidth({ minItemWidth }: InlineProps, propName: string) {
  if (minItemWidth === undefined) return undefined;

  const isValid =
    typeof minItemWidth === "number" ||
    checkIsCSSLength(minItemWidth as string) ||
    Object.keys(sizes).includes(minItemWidth as string);

  if (!isValid) {
    console.error(
      `${propName} needs to be an number, CSSLength or SizesOptions`
    );
  }
  return undefined;
}

Inline.propTypes = {
  ...InlineCluster.propTypes,
  stretch: PropTypes.oneOfType([
    PropTypes.oneOf<Stretch>(["all", "start", "end"]),
    PropTypes.number,
  ]),
  switchAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]) as unknown as React.Validator<SwitchAt>,
  minItemWidth:
    validateMinItemWidth as unknown as PropTypes.Requireable<MinItemWidth>,
};
