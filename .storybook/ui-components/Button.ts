import { PadBox } from "@bedrock-layout/padbox";
import styled from "styled-components";

export const Button = styled(PadBox).attrs((props) => ({
  padding: props.icon ? "md" : ["lg", "xl"],
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
