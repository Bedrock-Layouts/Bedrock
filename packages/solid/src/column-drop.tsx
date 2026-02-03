import { JSX, mergeProps } from "solid-js";

import {
  CSSLength,
  SizesOptions,
  SpacingOptions,
  getSizeValue,
  getSpacingValue,
} from "@bedrock-layout/spacing-constants";
import createDynamic, {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
  createPropsFromAccessors,
  omitProps,
} from "./typeUtils";

type MinItemWidth =
  | CSSLength
  | number
  | SizesOptions
  | "fit-content"
  | "max-content"
  | "min-content"
  | "auto";

export interface ColumnDropBaseProps {
  gap?: SpacingOptions;
  minItemWidth?: MinItemWidth;
  variant?: "default" | "centered";
}

function getSafeMinItemWidth(minItemWidth?: MinItemWidth) {
  return getSizeValue(minItemWidth);
}

export type ColumnDropProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, ColumnDropBaseProps>;

export function ColumnDrop<T extends ValidConstructor = "div">(
  props: Readonly<ColumnDropProps<T>>,
): JSX.Element {
  const propsStyle = () =>
    typeof props.style === "string"
      ? props.style
      : Object.entries(props.style ?? ({} as JSX.CSSProperties)).reduce(
          (str, [key, value]) => str + `${key}:${value};`,
          "",
        );

  const gutter = () =>
    `--gap: ${getSpacingValue(props.gap ?? "size00") ?? "0px"}`;

  const minItemWidth = () =>
    `--min-item-width: ${getSafeMinItemWidth(props.minItemWidth)}`;

  const noStretchedColumns = () =>
    props.variant === "centered" ? "variant:centered" : "";

  const style = () => [propsStyle(), gutter(), minItemWidth()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "minItemWidth", "variant"]),
      createPropsFromAccessors({
        style,
        "data-br-column-drop": noStretchedColumns,
      }),
    ) as DynamicProps<T>,
  );
}
