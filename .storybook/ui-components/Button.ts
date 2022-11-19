import styled from "styled-components";

import { PadBox } from "../../packages/padbox/src";

export const Button = styled(PadBox).attrs((props) => ({
  padding: props.icon ? "size2" : ["size3", "size7"],
  as: props?.as ?? "button",
}))<{
  primary?: boolean;
  icon?: boolean;
}>`
  border-radius: 0.5rem;
  border: none;
  background-color: ${({ primary }) =>
    primary ? "var(--gray-0)" : "var(--gray-9)"};
  color: ${({ primary }) => (primary ? "var(--gray-9)" : "var(--gray-0)")};
  text-decoration: none;
  text-align: center;
  :disabled {
    opacity: 0.5;
    font-size: 1rem;
  }
  :active {
    transform: scale(0.95);
  }
`;
