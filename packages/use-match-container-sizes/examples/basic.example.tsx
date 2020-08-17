import React from "react";
import useMatchContainerSizes from "@bedrock-layout/use-match-container-sizes";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;

BorderedBox.displayName = "BorderedBox";

let title = "useMatchContainerSizes";
let name = "Basic";

function Example() {
  const [node, ref] = React.useState<HTMLDivElement | null>(null);
  const matches = useMatchContainerSizes(node as HTMLDivElement);

  return (
    <BorderedBox style={{ margin: "auto", width: "50vw" }} ref={ref}>
      <ul>
        {Object.entries(matches).map(([key, value]) => (
          <li key={key}>
            {key}: {`${value}`}
          </li>
        ))}
      </ul>
    </BorderedBox>
  );
}

Example.story = { name };
export const Comp = Example;
export default {
  title,
};
