import hljs from "highlight.js";
import { JSXElement, createEffect, createSignal, onCleanup } from "solid-js";
import { styled } from "solid-styled-components";

const CopyButton = styled("button")`
  position: absolute;
  bottom: -2px;
  right: -2px;
  border: none;
  background: var(--gray-3);
  color: var(--gray-10);
  border-radius: var(--radius-2);
  padding: 0.5rem 1rem;
`;

const Pre = styled("pre")`
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-2);
`;

export function CodeBlock(
  props: Readonly<{
    code: string;
    language?: string;
  }>,
): JSXElement {
  const [textCopied, setTextCopied] = createSignal<"copied" | "not copied">(
    "not copied",
  );
  const safeLanguage = props.language ?? "javascript";

  const highlightedCode = hljs.highlight(props.code, {
    language: safeLanguage,
  }).value;

  createEffect((timeout: number | undefined) => {
    if (textCopied() === "copied") {
      return window.setTimeout(() => setTextCopied("not copied"), 1000);
    }

    onCleanup(() => {
      window.clearTimeout(timeout);
      return 0;
    });
    return 0;
  });

  return (
    <Pre>
      <code
        class={`hljs language-${safeLanguage}`}
        ref={(ref) => {
          // eslint-disable-next-line functional/immutable-data
          ref.innerHTML = highlightedCode;
          hljs.highlightElement(ref);
          return ref;
        }}
      ></code>
      <CopyButton
        onClick={() => {
          setTextCopied("copied");
          navigator.clipboard.writeText(props.code);
          return props.code;
        }}
      >
        {textCopied() === "copied" ? "Copied" : "Copy"}
      </CopyButton>
    </Pre>
  );
}
