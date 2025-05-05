/* eslint-disable functional/no-throw-statements */
/* eslint-disable functional/prefer-immutable-types */

import { JSX, mergeProps } from "solid-js";

import {
  BaseTheme,
  Gutter,
  SpacingOptions,
  getSafeGutter,
} from "./spacing-constants";
import { useTheme } from "./theme-provider";
import createDynamic, {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
  createPropsFromAccessors,
  omitProps,
} from "./typeUtils";

type PaddingObj =
  | { left: SpacingOptions }
  | { right: SpacingOptions }
  | { top: SpacingOptions }
  | { bottom: SpacingOptions }
  | { inlineStart: SpacingOptions }
  | { inlineEnd: SpacingOptions }
  | { blockStart: SpacingOptions }
  | { blockEnd: SpacingOptions };

type PaddingTypes =
  | SpacingOptions
  | PaddingObj
  | [SpacingOptions]
  | [SpacingOptions, SpacingOptions]
  | [SpacingOptions, SpacingOptions, SpacingOptions]
  | [SpacingOptions, SpacingOptions, SpacingOptions, SpacingOptions];

const keyToProperty = (key: string) => {
  type map = { [s: string]: string };
  const modernMap: map = {
    left: `padding-inline-start`,
    right: `padding-inline-end`,
    top: `padding-block-start`,
    bottom: `padding-block-end`,
    inlineStart: `padding-inline-start`,
    inlineEnd: `padding-inline-end`,
    blockStart: `padding-block-start`,
    blockEnd: `padding-block-end`,
  };

  return modernMap[key];
};

const paddingToStyleProps = (
  theme: { space?: BaseTheme },
  padding?: PaddingTypes,
): string => {
  if (!padding) return "";

  if (Array.isArray(padding) && padding.length > 4) {
    throw new Error("padding arrays can only be 4 or less in length");
  }

  const paddingObj =
    typeof padding === "object" && !Array.isArray(padding)
      ? Object.entries(padding).reduce(
          (acc, [key, val]) => ({
            ...acc,
            [keyToProperty(key)]: getSafeGutter(theme, val) ?? "0px",
          }),
          {},
        )
      : {
          padding: Array.from(Array.isArray(padding) ? padding : [padding])
            .map((pad: Gutter) => getSafeGutter(theme, pad) ?? "0px")
            .join(" "),
        };

  return Object.entries(paddingObj).reduce((string, [key, value]) => {
    return string + `${key}:${value};`;
  }, "");
};

export interface PadBoxBaseProps {
  padding?: PaddingTypes;
}

export type PadBoxProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, PadBoxBaseProps>;

export function PadBox<T extends ValidConstructor = "div">(
  props: PadBoxProps<T>,
): JSX.Element {
  const theme = useTheme();

  const propsStyle = () =>
    typeof props.style === "string"
      ? props.style
      : Object.entries(props.style ?? ({} as JSX.CSSProperties)).reduce(
          (str, [key, value]) => str + `${key}:${value};`,
          "",
        );

  const padding = () => paddingToStyleProps(theme, props.padding);

  const style = () => [propsStyle(), padding()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "padding"]),
      createPropsFromAccessors({
        style,
        "data-br-padbox": () => "",
      }),
    ) as DynamicProps<T>,
  );
}
