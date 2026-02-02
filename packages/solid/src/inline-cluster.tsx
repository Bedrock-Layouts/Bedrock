import { JSX, mergeProps } from "solid-js";

import {
  SpacingOptions,
  getSpacingValue,
} from "@bedrock-layout/spacing-constants";
import createDynamic, {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
  createPropsFromAccessors,
  omitProps,
} from "./typeUtils";

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

export interface InlineClusterBaseProps {
  justify?: keyof typeof justifyMap;
  align?: keyof typeof alignMap;
  gap?: SpacingOptions;
}

export type InlineClusterProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, InlineClusterBaseProps>;

export function InlineCluster<T extends ValidConstructor = "div">(
  props: Readonly<InlineClusterProps<T>>,
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

  const justify = () => (props.justify ? justifyMap[props.justify] : undefined);

  const align = () => (props.align ? alignMap[props.align] : alignMap.center);

  const style = () => [propsStyle(), gutter()].join("; ");

  const attrAssessor = () => [justify(), align()].filter(Boolean).join(" ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "justify", "align", "gap"]),
      createPropsFromAccessors({
        style,
        "data-br-inline-cluster": attrAssessor,
      }),
    ) as DynamicProps<T>,
  );
}
