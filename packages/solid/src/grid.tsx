import { JSX, mergeProps } from "solid-js";

import {
  CSSLength,
  SizesOptions,
  SpacingOptions,
  getSpacingValue,
} from "./spacing-constants";
import { useTheme } from "./theme-provider";
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

export type GridBaseProps = {
  /**
   * @deprecated Use `gap` instead
   */
  gutter?: SpacingOptions;
  gap?: SpacingOptions;
  minItemWidth?: MinItemWidth;
  variant?: "grid" | "masonry";
};

export type GridProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, GridBaseProps>;

export function Grid<T extends ValidConstructor = "div">(
  props: Readonly<GridProps<T>>,
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

  const minItemWidth = () =>
    `--minItemWidth: ${
      typeof props.minItemWidth === "string"
        ? props.minItemWidth
        : `${props.minItemWidth ?? 0}px`
    };`;

  const style = () => [propsStyle(), gutter(), minItemWidth()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "gutter", "minItemWidth"]),
      createPropsFromAccessors({
        style,
        "data-br-grid": () =>
          props.variant === "masonry" ? "variant:masonry" : "",
      }),
    ) as DynamicProps<T>,
  );
}
