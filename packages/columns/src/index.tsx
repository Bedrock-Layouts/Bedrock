import {
  CSSLength,
  Gutter,
  SizesOptions,
  getSafeGutter,
  getSizeValue,
  PaddingConfig,
  getPaddingAttributes,
  checkIsCSSLength,
} from "@bedrock-layout/spacing-constants";
import { convertToMaybe, forwardRefWithAs } from "@bedrock-layout/type-utils";
import React, { CSSProperties } from "react";

/**
 * Validates and returns a CSS length value, or undefined if invalid
 */
function validateCSSLengthOrNumber(value: unknown): CSSLength | undefined {
  const sizeValue = getSizeValue(value as string | number | undefined);
  if (sizeValue !== undefined) return sizeValue;

  if (typeof value === "string") {
    return checkIsCSSLength(value).result === "valid"
      ? (value as CSSLength)
      : undefined;
  }

  return undefined;
}

/**
 * Props for the `Columns` component.
 */
export type ColumnsProps = {
  /**
   * Sets space between each element.
   */
  gap?: Gutter;
  /**
   * Sets the number of columns.
   */
  colCount?: number;
  /**
   * Sets the width breakpoint at which the columns
   * will switch to a single column.
   */
  switchAt?: number | CSSLength | SizesOptions;
  /**
   * Sets padding on the component using design system spacing scale.
   */
  padding?: PaddingConfig;
};

/**
 * The `Columns` component is designed to create a n-column layout.
 * The complimentary `Column` component will allow elements to span and
 * offset n-columns.
 */
export const Columns = forwardRefWithAs<"div", ColumnsProps>(function Columns(
  {
    as: Component = "div",
    gap,
    colCount,
    style = {},
    switchAt,
    padding,
    ...props
  },
  ref,
) {
  const maybeGutter = getSafeGutter(gap);
  const maybeSwitchAt = validateCSSLengthOrNumber(switchAt);
  const safeColumns = convertToMaybe(Math.max(colCount ?? 1, 1)) ?? 1;
  const paddingAttrs = getPaddingAttributes(padding);
  const attrString = paddingAttrs.join(" ");

  const styles = {
    "--gap": maybeGutter,
    "--col-count": safeColumns,
    ...(maybeSwitchAt !== undefined && { "--switch-at": maybeSwitchAt }),
    ...style,
  } as CSSProperties;

  return (
    <Component
      ref={ref}
      data-br-columns={attrString}
      style={styles}
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
      data-br-column=""
      ref={ref}
      style={
        {
          "--col-span": safeSpan,
          "--offset-start": safeOffsetStart,
          "--offset-end": safeOffsetEnd,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
});
