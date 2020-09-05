import {
  SpacingTypes,
  spacing as defaultSpacings,
  mergeSpacings,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

type JustifyAlignOptions = "start" | "center" | "end";

type JustifyAlignMap = { [key in JustifyAlignOptions]: string };
const justifyAlignMap: JustifyAlignMap = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
};
export interface InlineClusterProps {
  justify?: JustifyAlignOptions;
  align?: JustifyAlignOptions;
  gutter?: SpacingTypes;
}

const InlineClusterWrapper = styled.div<InlineClusterProps>`
  box-sizing: border-box;
  --gutter: ${({ gutter, theme: { spacing = {} } }) =>
    gutter && mergeSpacings(spacing)[gutter]
      ? mergeSpacings(spacing)[gutter]
      : mergeSpacings(spacing).lg};

  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: ${(props) =>
    typeof props.justify !== "undefined" && justifyAlignMap[props.justify]
      ? justifyAlignMap[props.justify]
      : justifyAlignMap.start};
  align-items: ${(props) =>
    typeof props.align !== "undefined" && justifyAlignMap[props.align]
      ? justifyAlignMap[props.align]
      : justifyAlignMap.start};
  margin: calc(var(--gutter) / 2 * -1);
  & > * {
    margin: calc(var(--gutter) / 2);
  }
`;

const InlineCluster = forwardRefWithAs<InlineClusterProps, "div">(
  ({ children, ...props }, ref) => {
    return (
      <InlineClusterWrapper {...props} ref={ref}>
        {React.Children.map(children, (child) => (
          <div>{child}</div>
        ))}
      </InlineClusterWrapper>
    );
  }
);

InlineCluster.displayName = "InlineCluster";

InlineCluster.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
  justify: PropTypes.oneOf<JustifyAlignOptions>(["start", "center", "end"]),
  align: PropTypes.oneOf<JustifyAlignOptions>(["start", "center", "end"]),
};

export default InlineCluster;
