import { JSX, JSXElement, mergeProps } from "solid-js";

import {
  CSSLength,
  SizesOptions,
  SpacingOptions,
  getSizeValue,
  getSpacingValue,
} from "@bedrock-layout/spacing-constants";
import createDynamic, {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
  createPropsFromAccessors,
  omitProps,
} from "./typeUtils";

type MinHeight = CSSLength | number | SizesOptions;

interface CoverWrapperBaseProps {
  gap?: SpacingOptions;
  minHeight?: MinHeight;
  variant?: "default" | "stretch-content";
}

export type CoverWrapperProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, CoverWrapperBaseProps>;

function getSafeMinHeight(minHeight?: MinHeight) {
  if (typeof minHeight === "number") return `${minHeight}px`;
  const sizeValue = getSizeValue(minHeight);
  return sizeValue ?? "100%";
}

function CoverWrapper<T extends ValidConstructor = "div">(
  props: Readonly<CoverWrapperProps<T>>,
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

  const minHeight = () => `--min-height: ${getSafeMinHeight(props.minHeight)};`;

  const stretchContent = () =>
    props.variant === "stretch-content" ? "stretch-content" : "";

  const style = () => [propsStyle(), gutter(), minHeight()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "minHeight"]),
      createPropsFromAccessors({
        style,
        "data-br-cover": stretchContent,
      }),
    ) as DynamicProps<T>,
  );
}

/**
 * The `CoverCentered` component is used to mark the centered child in a Cover layout.
 */
export function CoverCentered<T extends ValidConstructor = "div">(
  props: Readonly<HeadlessPropsWithRef<T>>,
): JSX.Element {
  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(omitProps(props, ["as"]), {
      "data-br-cover-centered": "",
    }) as DynamicProps<T>,
  );
}

export interface CoverProps {
  children?: JSXElement;
}

/**
 * The `Cover` component is designed to vertically cover a predefined area, `100%` by default, and vertically center its children.
 */
export function Cover<T extends ValidConstructor = "div">(
  props: Readonly<CoverWrapperProps<T> & CoverProps>,
): JSX.Element {
  return (
    <CoverWrapper {...(props as CoverWrapperProps)}>
      {props.children}
    </CoverWrapper>
  );
}
