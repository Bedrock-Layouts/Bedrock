import Grid, { GridProps } from "@bedrock-layout/grid";
import { SpacingTypes, mergeSpacings } from "@bedrock-layout/spacing-constants";
import useStatefulRef from "@bedrock-layout/use-stateful-ref";
import React, { Children, useState } from "react";
import styled, { CSSProperties, ThemeContext } from "styled-components";

import { toPX } from "./toPx";

const RowSpanner = styled.div`
  --rows: 1;
  grid-row: span var(--rows);

  > * {
    height: 100%;
  }
`;

const safeTheme = { spacing: {} };

const Resizer: React.FC<{ gutter: SpacingTypes }> = ({ children, gutter }) => {
  const [rowSpan, setRowSpan] = useState(1);

  const childRef = useStatefulRef<HTMLDivElement>(null);
  const observerRef = useStatefulRef<ResizeObserver>(null);

  const { spacing = {} } = React.useContext(ThemeContext) || safeTheme;
  const { current: spacingMap } = React.useRef(mergeSpacings(spacing));

  const getRowHeight = React.useCallback(
    (node: Element) => {
      const gapString = spacingMap[gutter] ?? "1rem";

      const maybeGap = toPX(gapString, childRef.current);

      const gap: number = maybeGap ? maybeGap : 0;

      const [child] = Array.from(node.children);
      const height = 1 + Math.min(node.scrollHeight, child.scrollHeight);

      return Math.ceil((height + gap) / gap);
    },
    [childRef, spacingMap, gutter]
  );

  React.useEffect(() => {
    setRowSpan(getRowHeight(childRef.current));
  }, [childRef, getRowHeight]);

  React.useEffect(() => {
    observerRef.current = new ResizeObserver(([{ target }]) => {
      setRowSpan(1);
      const rowHeight = getRowHeight(target);
      setRowSpan(rowHeight);
    });

    const { current: node } = childRef;
    const { current: observer } = observerRef;

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (observer) {
        observer.unobserve(node);
      }
    };
  }, [childRef, getRowHeight, observerRef]);

  return (
    <RowSpanner
      style={({ "--rows": rowSpan } as unknown) as CSSProperties}
      ref={childRef}
    >
      {children}
    </RowSpanner>
  );
};

const MasonaryGrid = styled(Grid).attrs<GridProps>((props) => {
  return {
    children: Children.map(props.children, (child) => (
      <Resizer gutter={props.gutter ?? "lg"}>{child}</Resizer>
    )),
  };
})`
  grid-template-rows: 1px;
`;

MasonaryGrid.displayName = "MasonaryGrid";

export default MasonaryGrid;
