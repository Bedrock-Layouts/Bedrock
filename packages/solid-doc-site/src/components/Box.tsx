import { styled } from "solid-styled-components";

export const Box = styled.div<{ widthLevel?: number; bgColor?: string }>`
  background: ${(props) => (props.bgColor ? props.bgColor : "black")};
  min-height: 50px;
  min-width: ${({ widthLevel = 1 }) => widthLevel * 50}px;
  color: white;
  display: flex;
  place-content: center;
  align-items: center;
`;
