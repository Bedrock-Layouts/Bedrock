import {
  InlineCluster,
  InlineClusterProps,
} from "@bedrock-layout/inline-cluster";
import { CSSLength, checkIsCSSLength } from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

type Stretch = "all" | "start" | "end" | number;
type SwitchAt = CSSLength | number;

export interface InlineProps extends InlineClusterProps {
  stretch?: Stretch;
  switchAt?: SwitchAt;
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
  ({ justify, align, stretch, style, switchAt }) => {
    const justifyValue = justify ? `justify:${justify}` : "justify:start";
    const alignValue = align ? `align:${align}` : "align:start";
    const stretchValue = stretch ? `stretch:${stretch}` : undefined;
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
      style: { ...style, "--switchAt": switchAtValue },
    };
  }
)<InlineProps>`
  @property --switchAt {
    syntax: "<length-percentage>";
    inherits: true;
    initial-value: 0;
  }
  flex-wrap: nowrap;
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

  &[style*="--switchAt"] {
    flex-wrap: wrap;
    > * {
      min-inline-size: fit-content;
      flex-basis: calc((var(--switchAt) - (100% - var(--gutter, 0px))) * 999);
    }
  }
`;

Inline.displayName = "Inline";

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
};
