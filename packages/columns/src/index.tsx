import {
  CSSLength,
  Gutter,
  SizesOptions,
  getSafeGutter,
  getSizeValue,
  useTheme,
} from "@bedrock-layout/spacing-constants";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

export interface ColumnsProps {
  gutter?: Gutter;
  columns?: number;
  forwardedAs?: unknown;
  switchAt?: number | CSSLength | SizesOptions;
  children?: React.ReactNode;
}

export const Columns = forwardRefWithAs<"div", ColumnsProps>(
  ({ as, gutter, columns = 1, style, switchAt, ...props }, ref) => {
    const theme = useTheme();
    const maybeGutter = getSafeGutter(theme, gutter);
    const safeColumns = columns > 0 ? columns : 1;
    const safeStyle = style ?? {};
    const safeSwitchAt = getSizeValue(theme, switchAt) ?? switchAt;

    const Component = as ?? "div";

    return (
      <Component
        ref={ref}
        data-bedrock-columns={""}
        style={
          {
            ...safeStyle,
            "--gutter": maybeGutter,
            "--columns": safeColumns,
            "--switchAt": safeSwitchAt,
          } as CSSProperties
        }
        {...props}
      />
    );
  }
);

Columns.displayName = "Columns";

export interface ColumnProps {
  span?: number;
  offsetStart?: number;
  offsetEnd?: number;
}

const safeSpan = (span: unknown) => {
  return typeof span === "number" ? span : 1;
};

export const Column = forwardRefWithAs<"div", ColumnProps>(
  ({ as, span, style, offsetStart = 0, offsetEnd = 0, ...props }, ref) => {
    const safeOffsetStart = offsetStart > 0 ? offsetStart : undefined;
    const safeOffsetEnd = offsetEnd > 0 ? offsetEnd : undefined;
    const safeStyle = style ?? {};

    const Component = as ?? "div";

    return (
      <Component
        data-bedrock-column
        ref={ref}
        style={
          {
            ...safeStyle,
            "--span": Math.max(safeSpan(span), 1),
            "--offsetStart": safeOffsetStart,
            "--offsetEnd": safeOffsetEnd,
          } as CSSProperties
        }
        {...props}
      />
    );
  }
);

Column.displayName = "Column";
