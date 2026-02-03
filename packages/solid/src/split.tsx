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
  "1/4": "fraction:1/4",
  "1/3": "fraction:1/3",
  "1/2": "fraction:1/2",
  "2/3": "fraction:2/3",
  "3/4": "fraction:3/4",
  "auto-start": `fraction:auto-start`,
  "auto-end": `fraction:auto-end`,
};

type MinItemWidth =
  | CSSLength
  | number
  | SizesOptions
  | "fit-content"
  | "max-content"
  | "min-content"
  | "auto";

interface SplitBase {
  gap?: SpacingOptions;
  minItemWidth?: MinItemWidth;
  fraction?: FractionTypes;
  switchAt?: number | CSSLength;
}

export type SplitProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, SplitBase>;

export function Split<T extends ValidConstructor = "div">(
  props: Readonly<SplitProps<T>>,
): JSX.Element {
  const propsStyle = () =>
    typeof props.style === "string"
      ? props.style
      : Object.entries(props.style ?? ({} as JSX.CSSProperties)).reduce(
          (str, [key, value]) => str + `${key}:${value};`,
          "",
        );

  const switchAt = () =>
    props.switchAt
      ? `--switch-at: ${getSizeValue(props.switchAt) ?? "0px"};`
      : "";

  const gutter = () =>
    `--gap: ${getSpacingValue(props.gap ?? "size00") ?? "0px"}`;

  const fraction = () => fractions[props.fraction ?? "1/2"] ?? fractions["1/2"];

  const minItemWidth = () => {
    if (!props.minItemWidth) return undefined;

    const value =
      typeof props.minItemWidth === "string"
        ? props.minItemWidth
        : `${props.minItemWidth}px`;

    return `--min-item-width: ${value};`;
  };

  const style = () =>
    [propsStyle(), gutter(), switchAt(), minItemWidth()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "fraction"]),
      createPropsFromAccessors({
        style,
        "data-br-split": fraction,
      }),
    ) as DynamicProps<T>,
  );
}
