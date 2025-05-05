import { JSX, JSXElement, mergeProps, splitProps } from "solid-js";

import {
  CSSLength,
  SpacingOptions,
  checkIsCSSLength,
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

type MinHeight = CSSLength | number;

interface CoverWrapperBaseProps {
  /**
   * @deprecated Use `gap` instead
   */
  gutter?: SpacingOptions;
  gap?: SpacingOptions;
  minHeight?: MinHeight;
  /**
   * Sets the content to stretch to the full height of the cover component minus the top and bottom slots.
   * @deprecated Use `variant` set to `stretch-content` instead.
   */
  stretchContent?: boolean;
  variant?: "default" | "stretch-content";
}

export type CoverWrapperProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, CoverWrapperBaseProps>;

function getSafeMinHeight(minHeight?: MinHeight) {
  if (typeof minHeight === "number") return `${minHeight}px`;

  return minHeight && checkIsCSSLength(minHeight) ? minHeight : "100vh";
}

function CoverWrapper<T extends ValidConstructor = "div">(
  props: Readonly<CoverWrapperProps<T>>,
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

  const minHeight = () => `--minHeight: ${getSafeMinHeight(props.minHeight)};`;

  const stretchContent = () =>
    props.variant === "stretch-content" || props.stretchContent === true
      ? "stretch-content"
      : "";

  const style = () => [propsStyle(), gutter(), minHeight()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "minHeight", "stretchContent"]),
      createPropsFromAccessors({
        style,
        "data-br-cover": stretchContent,
      }),
    ) as DynamicProps<T>,
  );
}

export interface CoverProps {
  top?: JSXElement;
  bottom?: JSXElement;
  children?: JSXElement;
}

export function Cover<T extends ValidConstructor = "div">(
  props: Readonly<CoverWrapperProps<T> & CoverProps>,
): JSX.Element {
  const [local, restProps] = splitProps(props, ["children", "top", "bottom"]);

  return (
    <CoverWrapper {...(restProps as CoverWrapperProps)}>
      {local.top}
      <div data-br-cover-centered>{local.children}</div>
      {local.bottom}
    </CoverWrapper>
  );
}
