import {
  SpacingTypes,
  spacing as defaultSpacings,
  mergeSpacings,
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
  "1/4": "1fr 3fr",
  "1/3": "1fr 2fr",
  "1/2": "1fr 1fr",
  "2/3": "2fr 1fr",
  "3/4": "3fr 1fr",
  "auto-start": `auto 1fr`,
  "auto-end": `1fr auto`,
};

export interface SplitProps {
  gutter?: SpacingTypes;
  fraction?: FractionTypes;
}

const Split = styled.div<SplitProps>`
  box-sizing: border-box;

  --gutter: ${({ gutter, theme: { spacing = {} } }) =>
    gutter && mergeSpacings(spacing)[gutter]
      ? mergeSpacings(spacing)[gutter]
      : mergeSpacings(spacing).lg};

  display: grid;
  gap: var(--gutter);
  grid-template-columns: ${({ fraction = "1/2" }) =>
    fractions[fraction] || fractions["1/2"]}};


`;

Split.displayName = "Split";

Split.propTypes = {
  gutter: PropTypes.oneOf<SpacingTypes>(
    Object.keys(defaultSpacings) as SpacingTypes[]
  ),
  fraction: PropTypes.oneOf<FractionTypes>(
    Object.keys(fractions) as FractionTypes[]
  ),
};

Split.defaultProps = {
  gutter: "lg",
  fraction: "1/2",
};

export default Split;
