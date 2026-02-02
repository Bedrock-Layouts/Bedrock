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

type Stretch = "all" | "start" | "end" | 0 | 1 | 2 | 3 | 4;

type MinItemWidth =
  | CSSLength
  | number
  | SizesOptions
  | "fit-content"
  | "max-content"
  | "min-content"
  | "auto";

const justifyMap = {
  start: "justify:start",
  end: "justify:end",
  center: "justify:center",
  "space-between": "justify:space-between",
  "space-around": "justify:space-around",
} as const;

const alignMap = {
  start: "align:start",
  end: "align:end",
  center: "align:center",
  stretch: "align:stretch",
} as const;

export interface InlineBaseProps {
  stretch?: Stretch;
  switchAt?: number | CSSLength | SizesOptions;
  justify?: keyof typeof justifyMap;
  align?: keyof typeof alignMap;
  gap?: SpacingOptions;
  minItemWidth?: MinItemWidth;
}

export type InlineProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, InlineBaseProps>;

export function Inline<T extends ValidConstructor = "div">(
  props: Readonly<InlineProps<T>>,
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

  const getMinItemWidthValue = (value: MinItemWidth) => {
    if (typeof value === "string") {
      return getSizeValue(value) ?? value;
    }
    return `${value}px`;
  };

  const minItemWidth = () =>
    props.minItemWidth
      ? `--min-item-width: ${getMinItemWidthValue(props.minItemWidth)};`
      : undefined;

  const switchAt = () =>
    props.switchAt
      ? `--switch-at: ${getSizeValue(props.switchAt) ?? "0px"};`
      : "";

  const justify = () => (props.justify ? justifyMap[props.justify] : undefined);

  const align = () =>
    props.align === undefined ? alignMap.center : alignMap[props.align];

  const stretch = () =>
    props.stretch ? `stretch:${props.stretch}` : undefined;

  const style = () =>
    [propsStyle(), gutter(), switchAt(), minItemWidth()].join("; ");

  const attrAssessor = () =>
    [justify(), align(), stretch()].filter(Boolean).join(" ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "justify", "align", "stretch", "switchAt"]),
      createPropsFromAccessors({
        style,
        "data-br-inline": attrAssessor,
      }),
    ) as DynamicProps<T>,
  );
}
