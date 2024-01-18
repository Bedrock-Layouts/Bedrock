import styled from "styled-components";

import { PadBox } from "../../packages/padbox/src";

export const Button = styled.button.attrs<{
  primary?: boolean;
  icon?: boolean;
  as?: string;
}>((props) => {
  return {
    padding: props.icon ? "size2" : ["size3", "size7"],
    forwardedAs: props.as ?? "button",
    as: PadBox,
  };
})<{
  primary?: boolean;
  icon?: boolean;
}>`
  border-radius: 0.5rem;
  border: none;
  background-color: ${({ primary }) =>
    primary ? "var(--gray-0)" : "var(--gray-10)"};
  text-decoration: none;
  text-align: center;
  && {
    color: ${({ primary }) => (primary ? "var(--gray-10)" : "var(--gray-0)")};
  }
  :disabled {
    opacity: 0.5;
    font-size: 1rem;
  }
  :active {
    transform: scale(0.95);
  }
`;
