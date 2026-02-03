import { JSX, mergeProps } from "solid-js";

import type {
  CSSLength,
  SizesOptions,
} from "@bedrock-layout/spacing-constants";
import { getSizeValue } from "@bedrock-layout/spacing-constants";
import createDynamic, {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
  createPropsFromAccessors,
  omitProps,
} from "./typeUtils";

function getSafeMaxWidth(maxWidth?: MaxWidth) {
  if (maxWidth === undefined) return "100%";
  if (typeof maxWidth === "number") return `${maxWidth}px`;
  const sizeValue = getSizeValue(maxWidth);
  return sizeValue ?? maxWidth;
}

type MaxWidth = number | CSSLength | SizesOptions;

export interface CenterBaseProps {
  maxWidth?: MaxWidth;
}

export type CenterProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, CenterBaseProps>;

export function Center<T extends ValidConstructor = "div">(
  props: Readonly<CenterProps<T>>,
): JSX.Element {
  const propsStyle = () =>
    typeof props.style === "string"
      ? props.style
      : Object.entries(props.style ?? ({} as JSX.CSSProperties)).reduce(
          (str, [key, value]) => str + `${key}:${value};`,
          "",
        );

  const maxWidth = () => `--max-width: ${getSafeMaxWidth(props.maxWidth)};`;

  const attrString = () => "";

  const style = () => [propsStyle(), maxWidth()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "maxWidth"]),
      createPropsFromAccessors({
        style,
        "data-br-center": attrString,
      }),
    ) as DynamicProps<T>,
  );
}
