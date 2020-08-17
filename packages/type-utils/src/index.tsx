import React from "react";
export function forwardRefWithAs<Props, ComponentType extends As>(
  comp: (
    props: PropsFromAs<ComponentType, Props>,
    ref: React.RefObject<any>
  ) => React.ReactElement | null
) {
  return (React.forwardRef(comp as any) as unknown) as ComponentWithAs<
    ComponentType,
    Props
  >;
}
export type PropsFromAs<
  ComponentType extends As,
  ComponentProps
> = (PropsWithAs<ComponentType, ComponentProps> & { as: ComponentType }) &
  PropsWithAs<ComponentType, ComponentProps>;

export type ComponentWithForwardedRef<
  ElementType extends React.ElementType,
  ComponentProps
> = React.ForwardRefExoticComponent<
  ComponentProps &
    React.HTMLProps<React.ElementType<ElementType>> &
    React.ComponentPropsWithRef<ElementType>
>;

export type As<BaseProps = any> = React.ElementType<BaseProps>;

export type PropsWithAs<
  ComponentType extends As,
  ComponentProps
> = ComponentProps &
  Omit<
    React.ComponentPropsWithRef<ComponentType>,
    "as" | keyof ComponentProps
  > & {
    as?: ComponentType;
  };

export interface ComponentWithAs<ComponentType extends As, ComponentProps> {
  // These types are a bit of a hack, but cover us in cases where the `as` prop
  // is not a JSX string type. Makes the compiler happy so 🤷‍♂️
  <TT extends As>(
    props: PropsWithAs<TT, ComponentProps>
  ): React.ReactElement | null;
  (
    props: PropsWithAs<ComponentType, ComponentProps>
  ): React.ReactElement | null;

  displayName?: string;
  propTypes?: React.WeakValidationMap<
    PropsWithAs<ComponentType, ComponentProps>
  >;
  contextTypes?: React.ValidationMap<any>;
  defaultProps?: Partial<PropsWithAs<ComponentType, ComponentProps>>;
}
