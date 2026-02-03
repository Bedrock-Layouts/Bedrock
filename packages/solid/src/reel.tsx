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

export interface ReelBaseProps {
  snapType?: "none" | "proximity" | "mandatory";
  /**
   * @deprecated Use `gap` instead
   */
  gutter?: SpacingOptions;
  gap?: SpacingOptions;
}

export type ReelProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, ReelBaseProps>;

export function Reel<T extends ValidConstructor = "div">(
  props: Readonly<ReelProps<T>>,
): JSX.Element {
  const propsStyle = () =>
    typeof props.style === "string"
      ? props.style
      : Object.entries(props.style ?? ({} as JSX.CSSProperties)).reduce(
          (str, [key, value]) => str + `${key}:${value};`,
          "",
        );

  const gutter = () =>
    `--gap: ${getSpacingValue(props.gap ?? props.gutter ?? "size00") ?? "0px"}`;

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
      createPropsFromAccessors({ style, "data-br-reel": snapType }),
    ) as DynamicProps<T>,
  );
}
