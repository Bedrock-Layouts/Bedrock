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

/**
 * Props for the `Columns` component.
 */
export interface ColumnsProps {
  /**
   * Sets space between each element.
   */
  gutter?: Gutter;
  /**
   * Sets the number of columns.
   */
  columns?: number;
  /**
   * Sets the width breakpoint at which the columns
   * will switch to a single column.
   */
  switchAt?: number | CSSLength | SizesOptions;
}

/**
 * The `Columns` component is designed to create a n-column layout.
 * The complimentary `Column` component will allow elements to span and
 * offset n-columns.
 */
export const Columns = forwardRefWithAs<"div", ColumnsProps>(function Columns(
  { as, gutter, columns = 1, style, switchAt, ...props },
  ref,
) {
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
});

/**
 * Props for the `Column` component.
 */
export interface ColumnProps {
  /**
   * Sets the number of columns the element will span.
   */
  span?: number;
  /**
   * Sets the number of columns the element will offset from the start.
   */
  offsetStart?: number;
  /**
   * Sets the number of columns the element will offset from the end.
   */
  offsetEnd?: number;
}

const safeSpan = (span: unknown) => {
  return typeof span === "number" ? span : 1;
};

/**
 * The `Column` component is designed to be used in conjunction
 * with the `Columns` component.
 * It allows elements to span and offset n-columns.
 */
export const Column = forwardRefWithAs<"div", ColumnProps>(function Column(
  { as, span, style, offsetStart = 0, offsetEnd = 0, ...props },
  ref,
) {
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
});
