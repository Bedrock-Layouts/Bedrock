import { JSX, mergeProps } from "solid-js";

import {
  CSSLength,
  SizesOptions,
  Gutter,
  getSizeValue,
  getSafeGutter,
} from "@bedrock-layout/spacing-constants";
import createDynamic, {
  DynamicProps,
  HeadlessPropsWithRef,
  ValidConstructor,
  convertToMaybe,
  createPropsFromAccessors,
  omitProps,
} from "./typeUtils";

const getPropsStyle = (
  style: string | Readonly<JSX.CSSProperties> | undefined,
) =>
  typeof style === "string"
    ? style
    : Object.entries(style ?? ({} as JSX.CSSProperties)).reduce(
        (str, [key, value]) => str + `${key}:${value};`,
        "",
      );

interface ColumnsBaseProps {
  gap?: Gutter;
  colCount?: number;
  switchAt?: number | CSSLength | SizesOptions;
}

export type ColumnsProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, ColumnsBaseProps>;

export function Columns<T extends ValidConstructor = "div">(
  props: Readonly<ColumnsProps<T>>,
): JSX.Element {
  const propsStyle = () => getPropsStyle(props.style);

  const gutter = () => {
    const safeGutter = getSafeGutter(props.gap);
    return safeGutter ? `--gap: ${safeGutter};` : "";
  };

  const columns = () =>
    `--col-count: ${convertToMaybe(Math.max(props.colCount ?? 1, 1)) ?? 1};`;

  const switchAt = () =>
    props.switchAt
      ? `--switch-at: ${getSizeValue(props.switchAt) ?? "0px"};`
      : "";

  const style = () =>
    [propsStyle(), gutter(), columns(), switchAt()].filter(Boolean).join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "colCount", "switchAt"]),
      createPropsFromAccessors({
        style,
        "data-br-columns": () => "",
      }),
    ) as DynamicProps<T>,
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
  props: Readonly<ColumnProps<T>>,
): JSX.Element {
  const propsStyle = () => getPropsStyle(props.style);

  const span = () => `--col-span: ${safeSpan(props.span)};`;

  const offsetStart = () =>
    props.offsetStart && props.offsetStart > 0
      ? `--offset-start: ${props.offsetStart};`
      : "";

  const offsetEnd = () =>
    props.offsetEnd && props.offsetEnd > 0
      ? `--offset-end: ${props.offsetEnd};`
      : "";

  const style = () =>
    [propsStyle(), span(), offsetStart(), offsetEnd()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "span", "offsetStart", "offsetEnd"]),
      createPropsFromAccessors({
        style,
        "data-br-column": () => "",
      }),
    ) as DynamicProps<T>,
  );
}
