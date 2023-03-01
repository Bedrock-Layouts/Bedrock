/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Many of these utility types and functions were taken directly from solid-headless
 * https://github.com/lxsmnsyc/solid-headless
 *
 * Some have since been changed but it's important to
 * attribute where its appropriate.
 */
import { JSX, createComponent, mergeProps } from "solid-js";
import { Dynamic } from "solid-js/web";
export type OmitAndMerge<A, B> = A & Omit<B, keyof A>;
export type Accessor<T = unknown> = () => T;

export type Maybe<T> = NonNullable<T> | undefined;

export type ValidElements = keyof JSX.IntrinsicElements;
export type ValidComponent<P> = (props: P) => JSX.Element;
export type ValidConstructor =
  | ValidElements
  | ValidComponent<any>
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {});

export type DynamicProps<T extends ValidConstructor> = T extends ValidElements
  ? JSX.IntrinsicElements[T]
  : T extends ValidComponent<infer U>
  ? U
  : Record<string, unknown>;

type UnboxIntrinsicElements<T> = T extends JSX.HTMLAttributes<infer U>
  ? U
  : never;

type RefCallback<T> = (el: T) => void;
type RefField<T> = T | RefCallback<T>;

type UnboxComponentProp<U> = U extends { ref: infer X } ? X : never;

export type DynamicNode<T extends ValidConstructor> = T extends ValidElements
  ? UnboxIntrinsicElements<JSX.IntrinsicElements[T]>
  : T extends ValidComponent<infer U>
  ? UnboxComponentProp<U>
  : never;

export interface WithRef<T extends ValidConstructor> {
  ref?: RefField<DynamicNode<T>>;
}

export interface DynamicComponentWithRef<T extends ValidConstructor>
  extends WithRef<T> {
  as?: T;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type HeadlessPropsWithRef<
  T extends ValidConstructor,
  // eslint-disable-next-line @typescript-eslint/ban-types
  V = {}
> = OmitAndMerge<V & DynamicComponentWithRef<T>, DynamicProps<T>>;

export function convertToMaybe<T extends unknown>(value: T): Maybe<T> {
  return value ?? undefined;
}

export function omitProps<T extends Record<string, any>, K extends keyof T>(
  value: T,
  keys: K[]
): Omit<T, K> {
  return Object.keys(value)
    .filter((k) => !keys.includes(k as K))
    .reduce((newObject, k) => {
      Object.defineProperty(newObject, k, {
        get() {
          return value[k];
        },
        configurable: true,
        enumerable: true,
      });
      return newObject;
    }, {}) as Omit<T, K>;
}

export default function createDynamic<T extends ValidConstructor>(
  source: () => T,
  props: DynamicProps<T>
): JSX.Element {
  return createComponent(
    Dynamic,
    mergeProps(
      {
        get component() {
          return source();
        },
      },
      props
    ) as any
  );
}

export function createPropsFromAccessors<T extends Record<string, Accessor>>(
  props: T
): { [P in keyof T]: ReturnType<T[P]> } {
  if (!Object.values(props).every((x) => typeof x === "function"))
    throw new Error("Please provide an object with accessor values only.");

  return Object.keys(props).reduce((getterObj, key) => {
    const accessor = props[key];
    Object.defineProperty(getterObj, key, {
      get() {
        return accessor();
      },
      configurable: true,
      enumerable: true,
    });

    return getterObj;
  }, {}) as { [P in keyof T]: ReturnType<T[P]> };
}
