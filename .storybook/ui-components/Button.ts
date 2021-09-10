import { PadBox } from "@bedrock-layout/padbox";
import styled from "styled-components";

export const Button = styled(PadBox).attrs((props) => ({
  padding: ["lg", "xl"],
  as: props?.as ?? "button",
}))<{
  primary?: boolean;
}>`
  border-radius: 0.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ primary }) => (primary ? "white" : "black")};
  background-color: ${({ primary }) => (primary ? "black" : "white")};
  color: ${({ primary }) => (primary ? "white" : "black")};
  text-decoration: none;
  text-align: center;
  :disabled {
    opacity: 0.5;
    font-size: 1rem;
  }
`;
