import { JSX, mergeProps } from "solid-js";

import createDynamic, {
  DynamicProps,
  HeadlessPropsWithRef,
  Maybe,
  ValidConstructor,
  createPropsFromAccessors,
  omitProps,
} from "./typeUtils";

type RatioString = `${number}/${number}` | `${number} / ${number}`;

type Ratio = [number, number] | RatioString;
export interface FrameBaseProps {
  ratio?: Ratio;
  position?: string;
}

export type FrameProps<T extends ValidConstructor = "div"> =
  HeadlessPropsWithRef<T, FrameBaseProps>;

function checkIsRatio(ratio: unknown): ratio is Ratio {
  const isCorrectArray =
    Array.isArray(ratio) && ratio.length === 2 && ratio.every(Number.isFinite);
  return (
    isCorrectArray ||
    (typeof ratio === "string" &&
      /^\d{1,1000} {0,1}\/ {0,1}\d{1,1000}$/.test(ratio))
  );
}

function getRatioString(ratio: Ratio): RatioString {
  return Array.isArray(ratio) ? (ratio.join("/") as RatioString) : ratio;
}

function getSafeRatio(ratio: unknown): Maybe<RatioString> {
  const isRatio = checkIsRatio(ratio);

  return isRatio ? getRatioString(ratio) : undefined;
}

export function Frame<T extends ValidConstructor = "div">(
  props: FrameProps<T>
): JSX.Element {
  const propsStyle = () =>
    typeof props.style === "string"
      ? props.style
      : Object.entries(props.style ?? ({} as JSX.CSSProperties)).reduce(
          (str, [key, value]) => str + `${key}:${value};`,
          ""
        );

  const maybeRatioAssesor = () => getSafeRatio(props.ratio);

  const ratio = () =>
    maybeRatioAssesor() ? `--ratio: ${maybeRatioAssesor()}` : "";

  const position = () =>
    typeof props.position === "string"
      ? `--position: ${props.position}`
      : "50%";

  const style = () => [propsStyle(), ratio(), position()].join("; ");

  return createDynamic(
    () => props.as ?? ("div" as T),
    mergeProps(
      omitProps(props, ["as", "ratio", "position"]),
      createPropsFromAccessors({
        style,
        "data-bedrock-frame": () => "",
      })
    ) as DynamicProps<T>
  );
}
