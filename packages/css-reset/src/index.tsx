import { createGlobalStyle, css } from "styled-components";

export const reset = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  p,
  ul,
  ol,
  li,
  figure,
  figcaption,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  ul[class],
  ol[class] {
    padding: 0;
    list-style: none;
  }

  html:focus-within {
    scroll-behavior: smooth;
  }

  body {
    min-block-size: 100vh;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    font-size: 100%;
  }

  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  img {
    display: block;
    max-inline-size: 100%;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  li,
  figcaption {
    max-inline-size: 60ch;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    max-inline-size: 100%;
  }

  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export const GlobalStyles = createGlobalStyle`
  ${reset}
`;
