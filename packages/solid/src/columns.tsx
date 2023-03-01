import { JSX, mergeProps } from "solid-js";

import {
  CSSLength,
  SizesOptions,
  SpacingOptions,
  getSizeValue,
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

interface ColumnsBaseProps {
  gutter?: SpacingOptions;
  columns?: number;
  switchAt?: number | CSSLength | SizesOptions;
}

export type ColumnsProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, ColumnsBaseProps>;

export function Columns<T extends ValidConstructor = "div">(
  props: ColumnsProps<T>
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

  const columns = () =>
    `--columns: ${props.columns && props.columns > 0 ? props.columns : 1};`;

  const switchAt = () =>
    props.switchAt
      ? `--switchAt: ${getSizeValue(theme, props.switchAt) ?? "0px"};`
      : "";

  const style = () =>
    [propsStyle(), gutter(), columns(), switchAt()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "gutter", "columns", "switchAt"]),
      createPropsFromAccessors({
        style,
        "data-bedrock-columns": () => "",
      })
    ) as DynamicProps<T>
  );
}

export interface ColumnBaseProps {
  span?: number;
  offsetStart?: number;
  offsetEnd?: number;
}

const safeSpan = (span: unknown) => {
  return typeof span === "number" ? span : 1;
};

export type ColumnProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, ColumnBaseProps>;

export function Column<T extends ValidConstructor = "div">(
  props: ColumnProps<T>
): JSX.Element {
  const propsStyle = () =>
    typeof props.style === "string"
      ? props.style
      : Object.entries(props.style ?? ({} as JSX.CSSProperties)).reduce(
          (str, [key, value]) => str + `${key}:${value};`,
          ""
        );

  const span = () => `--span: ${safeSpan(props.span)};`;

  const offsetStart = () =>
    props.offsetStart && props.offsetStart > 0
      ? `--offsetStart: ${props.offsetStart};`
      : "";

  const offsetEnd = () =>
    props.offsetEnd && props.offsetEnd > 0
      ? `--offsetEnd: ${props.offsetEnd};`
      : "";

  const style = () =>
    [propsStyle(), span(), offsetStart(), offsetEnd()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "span", "offsetStart", "offsetEnd"]),
      createPropsFromAccessors({
        style,
        "data-bedrock-column": () => "",
      })
    ) as DynamicProps<T>
  );
}
