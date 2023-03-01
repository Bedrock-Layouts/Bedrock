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

export interface ReelBaseProps {
  snapType?: "none" | "proximity" | "mandatory";
  gutter?: SpacingOptions;
}

export type ReelProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, ReelBaseProps>;

export function Reel<T extends ValidConstructor = "div">(
  props: ReelProps<T>
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

  const snapType = () => {
    switch (props.snapType) {
      case "none": {
        return "snapType:none";
      }
      case "proximity": {
        return "snapType:proximity";
      }
      case "mandatory": {
        return "snapType:mandatory";
      }
      default: {
        return "snapType:none";
      }
    }
  };

  const style = () => [propsStyle(), gutter()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "gutter"]),
      createPropsFromAccessors({ style, "data-bedrock-reel": snapType })
    ) as DynamicProps<T>
  );
}
