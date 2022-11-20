import {
  CSSLength,
  SizesOptions,
  getSizeValue,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "@bedrock-layout/type-utils";
import React, { CSSProperties, ElementType, forwardRef } from "react";

type MaxWidth = number | CSSLength | SizesOptions;

interface CenterPropsBase {
  maxWidth?: MaxWidth;
  centerText?: boolean;
  centerChildren?: boolean;
}

export type CenterProps<C extends ElementType = "div"> =
  PolymorphicComponentPropsWithRef<C, CenterPropsBase>;

export const Center = forwardRef(
  <C extends ElementType = "div">(
    {
      as,
      centerChildren,
      centerText,
      maxWidth,
      style,
      ...props
    }: CenterProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const theme = useTheme();
    const centerProps = [
      centerText && "center-text",
      centerChildren && "center-children",
    ]
      .filter((x) => x)
      .join(" ");

    const safeStyle = style ?? {};

    const Component = as ?? "div";

    return (
      <Component
        data-bedrock-center={centerProps}
        ref={ref}
        style={
          {
            ...safeStyle,
            "--maxWidth":
              typeof maxWidth === "number" && maxWidth > 0
                ? `${maxWidth}px`
                : getSizeValue(theme, maxWidth) ?? maxWidth,
          } as CSSProperties
        }
        {...props}
      />
    );
  }
);

Center.displayName = "Center";
