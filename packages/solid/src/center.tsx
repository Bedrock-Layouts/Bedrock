import { JSX, mergeProps } from "solid-js";

import { CSSLength } from "./spacing-constants";
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
  return maxWidth;
}

type MaxWidth = number | CSSLength;

export interface CenterBaseProps {
  maxWidth?: MaxWidth;
  centerText?: boolean;
  centerChildren?: boolean;
}

export type CenterProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, CenterBaseProps>;

export function Center<T extends ValidConstructor = "div">(
  props: CenterProps<T>
): JSX.Element {
  const propsStyle = () =>
    typeof props.style === "string"
      ? props.style
      : Object.entries(props.style ?? ({} as JSX.CSSProperties)).reduce(
          (str, [key, value]) => str + `${key}:${value};`,
          ""
        );

  const maxWidth = () => `--maxWidth: ${getSafeMaxWidth(props.maxWidth)};`;

  const centerText = () => (props.centerText ? "center-text" : "");

  const centerChildren = () => (props.centerChildren ? "center-children" : "");

  const attrString = () =>
    [centerText(), centerChildren()].filter(Boolean).join(" ");

  const style = () => [propsStyle(), maxWidth()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "maxWidth", "centerText", "centerChildren"]),
      createPropsFromAccessors({
        style,
        "data-bedrock-center": attrString,
      })
    ) as DynamicProps<T>
  );
}
