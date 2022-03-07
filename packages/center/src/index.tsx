import {
  CSSLength,
  SizesOptions,
  checkIsCSSLength,
  getSizeValue,
  sizes,
} from "@bedrock-layout/spacing-constants";
import PropTypes from "prop-types";
import styled from "styled-components";

type MaxWidth = number | CSSLength | SizesOptions;

export interface CenterProps {
  maxWidth?: MaxWidth;
  centerText?: boolean;
  centerChildren?: boolean;
}

export const Center = styled.div.attrs<CenterProps>(
  ({ centerChildren, centerText, maxWidth, theme, style }) => {
    const centerProps = [
      centerText && "center-text",
      centerChildren && "center-children",
    ]
      .filter((x) => x)
      .join(" ");

    return {
      "data-bedrock-center": centerProps,
      style: {
        ...style,
        "--maxWidth":
          typeof maxWidth === "number" && maxWidth > 0
            ? `${maxWidth}px`
            : getSizeValue(theme, maxWidth) ?? maxWidth,
      },
    };
  }
)<CenterProps>`
  @property --maxWidth {
    syntax: "<length-percentage>";
    inherits: false;
    initial-value: 100%;
  }

  box-sizing: content-box;

  && {
    margin-inline-start: auto;
    margin-inline-end: auto;
    margin-inline: auto;
  }

  max-inline-size: var(--maxWidth, 100%);

  ${(props) =>
    props.centerChildren &&
    `display: flex;
    flex-direction: column;
    align-items: center;`}

  ${(props) => props.centerText && `text-align: center;`}
`;

Center.displayName = "Center";

function validateMaxWidth({ maxWidth }: CenterProps, propName: string) {
  if (maxWidth === undefined) return undefined;

  const isValid =
    typeof maxWidth === "number" ||
    checkIsCSSLength(maxWidth as string) ||
    Object.keys(sizes).includes(maxWidth as string);

  if (!isValid) {
    console.error(
      `${propName} needs to be an number, CSSLength or SizesOptions`
    );
  }
  return undefined;
}

Center.propTypes = {
  maxWidth: validateMaxWidth as unknown as React.Validator<MaxWidth>,
  centerText: PropTypes.bool,
  centerChildren: PropTypes.bool,
};
