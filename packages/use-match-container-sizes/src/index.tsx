import { mergeBreakpoints } from "@bedrock-layout/spacing-constants";
import useContainterQuery from "@bedrock-layout/use-container-query";
import React from "react";
import { ThemeContext } from "styled-components";

const safeTheme = { breakPoints: {} };

type ContainerMatchMap = { [s: string]: boolean };
type UseMatchContainerSizes = (node: Element) => ContainerMatchMap;

export const useMatchContainerSizes: UseMatchContainerSizes = (node) => {
  const constants = React.useContext(ThemeContext) || safeTheme;
  const breakPoints = constants.breakPoints || {};
  const mergedBreakPoints = mergeBreakpoints(breakPoints);

  return Object.entries(mergedBreakPoints).reduce((acc, [key, value]) => {
    const [width, maxWidth]: number[] = [].concat(value);
    /* eslint-disable */
    acc[key] = useContainterQuery(node, width, maxWidth);
    return acc;
  }, {} as { [s: string]: boolean });
};
export default useMatchContainerSizes;
