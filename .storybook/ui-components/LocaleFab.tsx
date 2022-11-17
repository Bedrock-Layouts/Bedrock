import { PadBox } from "@bedrock-layout/padbox";
import { Stack } from "@bedrock-layout/stack";
import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import { VisuallyHidden } from "@reach/visually-hidden";
import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

import i18n from "../i18n";
import { Button } from "./Button";
import { GlobeIcon } from "./GlobeIcon";

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

const SlideDownMenuList = styled(MenuList)`
  transform: translateY(10px);
  border-radius: 5px;
  animation: ${SlideDown} 0.2s ease;
`;

const LanguageItem = styled(PadBox).attrs((props) => ({
  as: MenuItem,

  padding: ["md", "lg"],
  tabIndex: 0,
}))`
  :hover,
  :active,
  :focus {
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
  const menuButtonRef = React.useRef<any>(null);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

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

  const MenuItemButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    margin: 0;
  `;

  return (
    <div
      ref={wrapperRef}
      tabIndex={0}
      style={{ position: "fixed", top: "1rem", right: "1rem" }}
    >
      <Menu>
        <MenuButton ref={menuButtonRef} icon as={Button}>
          <GlobeIcon />
          <VisuallyHidden>Locale</VisuallyHidden>
        </MenuButton>
        <SlideDownMenuList>
          <Stack gutter="sm" style={{ background: "white" }}>
            <LanguageItem onSelect={() => setLocale("en")}>
              English
            </LanguageItem>
            <LanguageItem onSelect={() => setLocale("es")}>
              Español
            </LanguageItem>
          </Stack>
        </SlideDownMenuList>
      </Menu>
    </div>
  );
};
