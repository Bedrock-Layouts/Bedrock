import { JSX, mergeProps } from "solid-js";

import { SpacingOptions, getSpacingValue } from "./spacing-constants";
import { useTheme } from "./theme-provider";
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
  gutter: SpacingOptions;
}

export type InlineClusterProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, InlineClusterBaseProps>;

export function InlineCluster<T extends ValidConstructor = "div">(
  props: InlineClusterProps<T>
): JSX.Element {
  const theme = useTheme();

  const propsStyle = () =>
    typeof props.style === "string"
      ? props.style
      : Object.entries(props.style ?? ({} as JSX.CSSProperties)).reduce(
          (str, [key, value]) => str + `${key}:${value};`,
          ""
        );

  const gutter = () =>
    `--gutter: ${getSpacingValue(theme, props.gutter ?? "size00") ?? "0px"};`;

  const justify = () =>
    props.justify !== undefined ? justifyMap[props.justify] : undefined;

  const align = () =>
    props.align !== undefined ? alignMap[props.align] : undefined;

  const style = () => [propsStyle(), gutter()].join("; ");

  const attrAssesor = () => [justify(), align()].filter(Boolean).join(" ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "gutter", "justify", "align"]),
      createPropsFromAccessors({
        style,
        "data-bedrock-inline-cluster": attrAssesor,
      })
    ) as DynamicProps<T>
  );
}
