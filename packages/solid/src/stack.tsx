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

export interface StackPropsBase {
  gutter?: SpacingOptions;
}

export type StackProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, StackPropsBase>;

export function Stack<T extends ValidConstructor = "div">(
  props: StackProps<T>
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

  const style = () => [propsStyle(), gutter()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "gutter"]),
      createPropsFromAccessors({ style, "data-bedrock-stack": () => "" })
    ) as DynamicProps<T>
  );
}
