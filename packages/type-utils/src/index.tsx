/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
// Adapted from Source: https://github.com/kripod/react-polymorphic-types/blob/main/index.d.ts
// and https://www.benmvp.com/blog/forwarding-refs-polymorphic-react-component-typescript/
import React from "react";

type Merge<T, U> = Omit<T, keyof U> & U;

type PropsWithAs<C extends React.ElementType, Props> = Props & {
  /**
   * The component used for the root node. Can be a string to use a HTML element or a component.
   * **Note:** The component has to accept a `style` prop as well as any `data-*`
   * attributes and pass them down to the root element.
   */
  as?: C;
};

export type PolymorphicComponentPropsWithoutRef<
  C extends React.ElementType,
  Props,
> = Merge<
  C extends keyof JSX.IntrinsicElements
    ? React.PropsWithoutRef<JSX.IntrinsicElements[C]>
    : React.ComponentPropsWithoutRef<C>,
  PropsWithAs<C, Props>
>;

export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props,
> = Merge<
  C extends keyof JSX.IntrinsicElements
    ? React.PropsWithRef<JSX.IntrinsicElements[C]>
    : React.ComponentPropsWithRef<C>,
  PropsWithAs<C, Props>
>;

/**
 * Utility type to create a component that can be used polymorphically
 */
export type PolymorphicExoticComponent<
  C extends React.ElementType = React.ElementType,
  Props = {},
> = Merge<
  React.ExoticComponent<Props & { [key: string]: unknown }>,
  {
    /**
     * **NOTE**: Exotic components are not callable.
     */
    <InstanceC extends React.ElementType = C>(
      // eslint-disable-next-line functional/prefer-immutable-types
      props: PolymorphicComponentPropsWithRef<InstanceC, Props>,
    ): React.ReactElement | null;
  }
>;

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

/**
 * Utility type to create a component that can be used polymorphically with Ref
 */
export type PolymorphicForwardedRefComponent<
  C extends React.ElementType,
  Props,
> = Merge<
  React.ForwardRefExoticComponent<Props & { [key: string]: unknown }>,
  PolymorphicExoticComponent<C, Props>
>;

/**
 * Utility function to create a component that can be used polymorphically with Ref
 */
export function forwardRefWithAs<C extends React.ElementType, Props = {}>(
  render: (
    // eslint-disable-next-line functional/prefer-immutable-types
    props: PolymorphicComponentPropsWithoutRef<C, Props>,
    ref: PolymorphicRef<C>,
  ) => React.ReactElement | null,
) {
  return React.forwardRef(render) as PolymorphicForwardedRefComponent<C, Props>;
}

export type Maybe<T> = NonNullable<T> | undefined;

export function convertToMaybe<T extends unknown>(value: T): Maybe<T> {
  if (Number.isNaN(value)) return undefined;
  return value ?? undefined;
}
