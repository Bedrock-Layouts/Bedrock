import { styled } from "solid-styled-components";

export const Button = styled("button")<{
  primary?: boolean;
}>`
  padding: var(--size-3) var(--size-7);
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
