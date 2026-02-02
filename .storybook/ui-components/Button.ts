import styled from "styled-components";

export const Button = styled.button<{
  primary?: boolean;
}>`
  border-radius: 0.5rem;
  border: none;
  background-color: ${({ primary }) =>
    primary ? "var(--gray-0)" : "var(--gray-10)"};
  text-decoration: none;
  text-align: center;
  padding: 1rem 2rem;
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
