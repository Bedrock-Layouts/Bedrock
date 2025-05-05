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

const alignMap = {
  start: "align:start",
  end: "align:end",
  center: "align:center",
  stretch: "align:stretch",
} as const;

export interface StackPropsBase {
  /**
   * @deprecated Use `gap` instead
   */
  gutter?: SpacingOptions;
  gap?: SpacingOptions;
  align?: keyof typeof alignMap;
}

export type StackProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, StackPropsBase>;

export function Stack<T extends ValidConstructor = "div">(
  props: Readonly<StackProps<T>>,
): JSX.Element {
  const theme = useTheme();
  const propsStyle = () =>
    typeof props.style === "string"
      ? props.style
      : Object.entries(props.style ?? ({} as JSX.CSSProperties)).reduce(
          (str, [key, value]) => str + `${key}:${value};`,
          "",
        );

  const gutter = () =>
    `--gutter: ${
      getSpacingValue(theme, props.gap ?? props.gutter ?? "size00") ?? "0px"
    }`;

  const style = () => [propsStyle(), gutter()].join("; ");

  const align = () =>
    props.align !== undefined ? alignMap[props.align] : undefined;

  const attrAssessor = () => [align()].filter(Boolean).join(" ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "gutter"]),
      createPropsFromAccessors({ style, "data-br-stack": attrAssessor }),
    ) as DynamicProps<T>,
  );
}
