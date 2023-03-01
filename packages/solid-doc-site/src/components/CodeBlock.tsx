import hljs from "highlight.js";
import { JSXElement, createEffect, createSignal, onCleanup } from "solid-js";
import { styled } from "solid-styled-components";

const CopyButton = styled("button")`
  position: absolute;
  bottom: -2px;
  right: -2px;
  border: none;
  background: var(--gray-3);
  color: var(--gray-9);
  border-radius: var(--radius-2);
  padding: 0.5rem 1rem;
`;

const Pre = styled("pre")`
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-2);
`;

export function CodeBlock(props: {
  code: string;
  language?: string;
}): JSXElement {
  const [textCopied, setTextCopied] = createSignal(false);
  const safeLanguage = props.language ?? "javascript";
  const highlightedCode = hljs.highlight(props.code, {
    language: safeLanguage,
  }).value;

  createEffect(() => {
    let timeout: number | undefined;
    if (textCopied()) {
      timeout = window.setTimeout(() => setTextCopied(false), 1000);
    }
    onCleanup(() => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    });
  });

  return (
    <Pre>
      <code
        class={`hljs language-${safeLanguage}`}
        ref={(ref) => {
          ref.innerHTML = highlightedCode;
          hljs.highlightElement(ref);
        }}
      ></code>
      <CopyButton
        onClick={() => {
          setTextCopied(true);
          navigator.clipboard.writeText(props.code);
        }}
      >
        {textCopied() ? "Copied" : "Copy"}
      </CopyButton>
    </Pre>
  );
}
