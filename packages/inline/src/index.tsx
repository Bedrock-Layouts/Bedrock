import {
  InlineCluster,
  InlineClusterProps,
} from "@bedrock-layout/inline-cluster";
import PropTypes from "prop-types";
import styled from "styled-components";

type Stretch = "all" | "start" | "end" | number;
type SwitchAt = string | number;

export interface InlineProps extends InlineClusterProps {
  stretch?: Stretch;
  switchAt?: SwitchAt;
}

function shouldUseSwitch(switchAt?: SwitchAt) {
  if (switchAt && switchAt > -1) {
    return true;
  }

  if (typeof switchAt === "string" && typeof CSS !== undefined) {
    return CSS.supports(`height: ${switchAt}`);
  }

  return false;
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
        .filter((x) => x)
        .join(" "),
      "data-bedrock-inline-cluster": undefined,
      style: { ...style, "--switchAt": switchAtValue },
    };
  }
)<InlineProps>`
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
      flex-basis: calc((var(--switchAt) - (100% - var(--gutter))) * 999);
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
