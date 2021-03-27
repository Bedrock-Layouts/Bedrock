import { Columns, ColumnsProps } from "@bedrock-layout/columns";
import { mergeBreakpoints } from "@bedrock-layout/spacing-constants";
import Split, { SplitProps } from "@bedrock-layout/split";
import Stack, { StackProps } from "@bedrock-layout/stack";
import { forwardRefWithAs } from "@bedrock-layout/type-utils";
import useContainerQuery from "@bedrock-layout/use-container-query";
import useForwardedRef from "@bedrock-layout/use-forwarded-ref";
import PropTypes from "prop-types";
import React from "react";
import { ThemeContext } from "styled-components";

import { toPX } from "./toPx";

export interface SplitSwitcherProps extends StackProps, SplitProps {
  switchAt?: number | string;
  children?: React.ReactNode;
}

const safeTheme = { breakPoints: {} };

//Logic forked from is-in-browser npm package
const isBrowser =
  typeof window === "object" &&
  typeof document === "object" &&
  document.nodeType === 9;

export const SplitSwitcher = forwardRefWithAs<SplitSwitcherProps, "div">(
  ({ fraction, switchAt, as, ...props }, ref) => {
    const safeRef = useForwardedRef(ref);
    const { breakPoints = {} } = React.useContext(ThemeContext) || safeTheme;

    const maybePx =
      isBrowser && typeof switchAt === "string"
        ? toPX(switchAt, safeRef.current)
        : null;

    const widthToSwitchAt: number = maybePx
      ? maybePx
      : typeof switchAt === "number" && switchAt > -1
      ? switchAt
      : mergeBreakpoints(breakPoints).smallOnly;

    const shouldSwitch = useContainerQuery(safeRef.current, widthToSwitchAt);

    return shouldSwitch ? (
      <Stack as={as} ref={safeRef} {...props} />
    ) : (
      <Split as={as} ref={safeRef} fraction={fraction} {...props} />
    );
  }
);

SplitSwitcher.displayName = "SplitSwitcher";

SplitSwitcher.propTypes = {
  ...Split.propTypes,
  switchAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export interface ColumnSwitcherProps extends StackProps, ColumnsProps {
  switchAt?: number | string;
  children?: React.ReactNode;
}

export const ColumnsSwitcher = forwardRefWithAs<ColumnSwitcherProps, "div">(
  ({ columns, dense, switchAt, as, ...props }, ref) => {
    const safeRef = useForwardedRef(ref);
    const { breakPoints = {} } = React.useContext(ThemeContext) || safeTheme;

    const maybePx = toPX(
      typeof switchAt === "string" ? switchAt : "",
      safeRef.current
    );

    const widthToSwitchAt: number = maybePx
      ? maybePx
      : typeof switchAt === "number" && switchAt > -1
      ? switchAt
      : mergeBreakpoints(breakPoints).smallOnly;

    const shouldSwitch = useContainerQuery(safeRef.current, widthToSwitchAt);

    return shouldSwitch ? (
      <Stack as={as} ref={safeRef} {...props} />
    ) : (
      <Columns
        as={as}
        ref={safeRef}
        columns={columns}
        dense={dense}
        {...props}
      />
    );
  }
);

ColumnsSwitcher.displayName = "ColumnsSwitcher";

ColumnsSwitcher.propTypes = {
  ...Columns.propTypes,
  switchAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
