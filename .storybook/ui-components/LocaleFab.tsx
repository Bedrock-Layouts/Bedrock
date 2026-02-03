import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { Stack } from "../../packages/stack/src";
import i18n from "../i18n";
import { Button } from "./Button";
import { GlobeIcon } from "./GlobeIcon";

function VisuallyHidden(props) {
  return (
    <span
      style={{
        border: 0,
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        width: "1px",
        // https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
        whiteSpace: "nowrap",
        wordWrap: "normal",
      }}
      {...props}
    />
  );
}

const SlideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SlideDownMenuList = styled(Stack)`
  transform: translateY(10px);
  border-radius: var(--radius-2);
  animation: ${SlideDown} 0.2s ease;
  background-color: var(--gray-0);
`;

const LanguageItem = styled.div
  .withConfig({ shouldForwardProp: () => true })
  .attrs(({ children }) => ({
    as: DropdownMenu.Item,
    children: (
      <div style={{ padding: "0.5rem 1rem" }} tabIndex={0}>
        {children}
      </div>
    ),
  }))`
  :hover,
  :active,
  :focus {
    border:none;
    background-color: var(--gray-3);
    cursor: pointer;
  }
  &[data-selected] {
    background-color: var(--gray-3);
    cursor: pointer;
  }
`;

export const LocaleFab = () => {
  const [locale, setLocale] = React.useState(i18n.language);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  useEffect(() => {
    const { body } = document;
    body.setAttribute(
      "style",
      body.style.cssText + "margin-inline: auto !important;",
    );
  }, []);

  useEffect(() => {
    if (wrapperRef.current === null) {
      return;
    }
    const { current: component } = wrapperRef;

    const onFocusIn = () => {
      menuButtonRef.current?.focus();
    };

    component.addEventListener("focus", onFocusIn);

    return () => {
      component.removeEventListener("focus", onFocusIn);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      tabIndex={0}
      style={{ position: "fixed", top: "1rem", right: "1rem", zIndex: 10 }}
    >
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button ref={menuButtonRef}>
            <GlobeIcon />
            <VisuallyHidden>Locale</VisuallyHidden>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <SlideDownMenuList>
              <LanguageItem onSelect={() => setLocale("en")}>
                English
              </LanguageItem>
              <LanguageItem onSelect={() => setLocale("es")}>
                Español
              </LanguageItem>
              <LanguageItem onSelect={() => setLocale("fr")}>
                Française
              </LanguageItem>
            </SlideDownMenuList>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};
