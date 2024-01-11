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

type Maybe<T> = NonNullable<T> | undefined;

function convertToMaybe<T extends unknown>(val: T): Maybe<T> {
  if (Number.isNaN(val)) {
    return undefined;
  }
  return val ?? undefined;
}

/**
 * Props for the `Columns` component.
 */
export type ColumnsProps = {
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
};

/**
 * The `Columns` component is designed to create a n-column layout.
 * The complimentary `Column` component will allow elements to span and
 * offset n-columns.
 */
export const Columns = forwardRefWithAs<"div", ColumnsProps>(function Columns(
  {
    as: Component = "div",
    gutter,
    columns = 1,
    style = {},
    switchAt,
    ...props
  },
  ref,
) {
  const theme = useTheme();
  const maybeGutter = getSafeGutter(theme, gutter);
  const maybeSwitchAt = getSizeValue(theme, switchAt) ?? switchAt;
  const safeColumns = convertToMaybe(Math.max(columns, 1)) ?? 1;

  return (
    <Component
      ref={ref}
      data-bedrock-columns={""}
      style={
        {
          "--gutter": maybeGutter,
          "--columns": safeColumns,
          "--switchAt": maybeSwitchAt,
          ...style,
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

/**
 * The `Column` component is designed to be used in conjunction
 * with the `Columns` component.
 * It allows elements to span and offset n-columns.
 */
export const Column = forwardRefWithAs<"div", ColumnProps>(function Column(
  {
    as: Component = "div",
    span = 1,
    style = {},
    offsetStart = 0,
    offsetEnd = 0,
    ...props
  },
  ref,
) {
  const safeOffsetStart = offsetStart > 0 ? offsetStart : undefined;
  const safeOffsetEnd = offsetEnd > 0 ? offsetEnd : undefined;
  const safeSpan = convertToMaybe(Math.max(span, 1)) ?? 1;

  return (
    <Component
      data-bedrock-column
      ref={ref}
      style={
        {
          "--span": safeSpan,
          "--offsetStart": safeOffsetStart,
          "--offsetEnd": safeOffsetEnd,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
});
