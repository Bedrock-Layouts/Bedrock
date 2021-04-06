import {
  SpacingOptions,
  getSpacingValue,
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
  gutter: keyof SpacingOptions;
  fraction?: FractionTypes;
}

export const Split = styled.div.attrs<SplitProps>(
  ({ gutter = "lg", theme }) => {
    const maybeGutter = getSpacingValue(theme, gutter);
    return {
      "data-bedrock-layout-split": "",
      style: {
        "--gutter": maybeGutter ?? "0px",
      },
    };
  }
)<SplitProps>`
  box-sizing: border-box;

  --gutter: 1rem;

  display: grid;
  gap: var(--gutter);
  grid-template-columns: ${({ fraction = "1/2" }) =>
    fractions[fraction] || fractions["1/2"]}};
`;

Split.displayName = "Split";

Split.propTypes = {
  gutter: PropTypes.string.isRequired as React.Validator<keyof SpacingOptions>,
  fraction: PropTypes.oneOf<FractionTypes>(
    Object.keys(fractions) as FractionTypes[]
  ),
};
