import {
  BreakPoints,
  mergeBreakpoints,
} from "@bedrock-layout/spacing-constants";
import useMediaQuery from "@bedrock-layout/use-media-query";
import React from "react";
import { ThemeContext } from "styled-components";

const safeTheme = { breakPoints: {} };

type ContainerMatchMap = { [s: string]: boolean };
type UseMatchMedia = () => ContainerMatchMap;

type BreakPointKey = keyof BreakPoints;

export const useMatchMedia: UseMatchMedia = () => {
  const { breakPoints } = React.useContext(ThemeContext) || safeTheme;
  const mergedBreakPoints = mergeBreakpoints(breakPoints);

  return Object.keys(mergedBreakPoints).reduce((acc, key) => {
    const breakPointKey = key as keyof BreakPoints;
    const emptyArray: number[] = [];

    const [width, maxWidth]: number[] = emptyArray.concat(
      mergedBreakPoints[breakPointKey]
    );

    const query =
      maxWidth > -1
        ? `(min-width:${width}px) and (max-width:${maxWidth}px)`
        : `(max-width:${width}px)`;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    acc[breakPointKey] = useMediaQuery(query);
    return acc;
  }, {} as Record<keyof BreakPoints, boolean>);
};

export default useMatchMedia;
