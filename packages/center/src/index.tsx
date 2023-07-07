import {
  CSSLength,
  SizesOptions,
  getSizeValue,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

type MaxWidth = number | CSSLength | SizesOptions;

export interface CenterProps {
  maxWidth?: MaxWidth;
  centerText?: boolean;
  centerChildren?: boolean;
}

export const Center = forwardRefWithAs<"div", CenterProps>(
  ({ as, centerChildren, centerText, maxWidth, style, ...props }, ref) => {
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
            "--maxWidth":
              typeof maxWidth === "number" && maxWidth > 0
                ? `${maxWidth}px`
                : getSizeValue(theme, maxWidth) ?? maxWidth,
            ...safeStyle,
          } as CSSProperties
        }
        {...props}
      />
    );
  },
);

Center.displayName = "Center";
