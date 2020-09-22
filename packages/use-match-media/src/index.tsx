import { mergeBreakpoints } from "@bedrock-layout/spacing-constants";
import useMediaQuery from "@bedrock-layout/use-media-query";
import React from "react";
import { ThemeContext } from "styled-components";

const safeTheme = { breakPoints: {} };

type ContainerMatchMap = { [s: string]: boolean };
type UseMatchMedia = () => ContainerMatchMap;

export const useMatchMedia: UseMatchMedia = () => {
  const { breakPoints } = React.useContext(ThemeContext) || safeTheme;
  const mergedBreakPoints = mergeBreakpoints(breakPoints);

  return Object.entries(mergedBreakPoints).reduce((acc, [key, value]) => {
    const [width, maxWidth]: number[] = [].concat(value);
    const query =
      maxWidth > -1
        ? `(min-width:${width}px) and (max-width:${maxWidth}px)`
        : `(max-width:${width}px)`;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    acc[key] = useMediaQuery(query);
    return acc;
  }, {} as { [s: string]: boolean });
};

export default useMatchMedia;
