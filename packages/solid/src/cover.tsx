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
  gutter?: SpacingOptions;
  minHeight?: MinHeight;
  stretchContent?: boolean;
}

export type CoverWrapperProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, CoverWrapperBaseProps>;

export interface CoverProps {
  top?: JSXElement;
  bottom?: JSXElement;
  children?: JSXElement;
}

function getSafeMinHeight(minHeight?: MinHeight) {
  if (typeof minHeight === "number") return `${minHeight}px`;

  return minHeight && checkIsCSSLength(minHeight) ? minHeight : "100vh";
}

function CoverWrapper<T extends ValidConstructor = "div">(
  props: CoverWrapperProps<T>
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

  const minHeight = () => `--minHeight: ${getSafeMinHeight(props.minHeight)};`;

  const stretchContent = () =>
    props.stretchContent === true ? "stretch-content" : "";

  const style = () => [propsStyle(), gutter(), minHeight()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "minHeight", "stretchContent"]),
      createPropsFromAccessors({
        style,
        "data-bedrock-cover": stretchContent,
      })
    ) as DynamicProps<T>
  );
}

export function Cover<T extends ValidConstructor = "div">(
  props: CoverWrapperProps<T> & CoverProps
): JSX.Element {
  const [local, restProps] = splitProps(props, ["children", "top", "bottom"]);

  return (
    <CoverWrapper {...restProps}>
      {local.top}
      <div data-bedrock-cover-centered>{local.children}</div>
      {local.bottom}
    </CoverWrapper>
  );
}
