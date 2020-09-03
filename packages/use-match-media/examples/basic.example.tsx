import useMatchMedia from "@bedrock-layout/use-match-media";
import React from "react";
import styled from "styled-components";

const BorderedBox = styled.div`
  border: 1px solid black;
`;

BorderedBox.displayName = "BorderedBox";

const title = "useMatchMedia";
const name = "Basic";

function Example() {
  const matches = useMatchMedia();

  return (
    <BorderedBox style={{ margin: "auto", width: "50vw" }}>
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
