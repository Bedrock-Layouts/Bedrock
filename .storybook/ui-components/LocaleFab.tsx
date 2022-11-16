import { PadBox } from "@bedrock-layout/padbox";
import { Stack } from "@bedrock-layout/stack";
import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import { VisuallyHidden } from "@reach/visually-hidden";
import React, { useEffect } from "react";
import styled from "styled-components";

import i18n from "../i18n";
import { Button } from "./Button";
import { GlobeIcon } from "./GlobeIcon";

const LanguageItem = styled(MenuItem).attrs((props) => ({
  as: PadBox,
  padding: ["md", "lg"],
}))`
  :hover,
  :active,
  :focus {
    background-color: var(--gray-3);
    cursor: pointer;
  }
`;

export const LocaleFab = () => {
  const [locale, setLocale] = React.useState(i18n.language);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);
  return (
    <div style={{ position: "fixed", top: "1rem", right: "1rem" }}>
      <Menu>
        <MenuButton icon as={Button}>
          <GlobeIcon />
          <VisuallyHidden>Locale</VisuallyHidden>
        </MenuButton>
        <MenuList style={{ marginTop: "10px" }}>
          <Stack gutter="sm" style={{ background: "white" }}>
            <MenuItem as={LanguageItem} onSelect={() => setLocale("es")}>
              Spanish
            </MenuItem>
            <MenuItem as={LanguageItem} onSelect={() => setLocale("en")}>
              English
            </MenuItem>
          </Stack>
        </MenuList>
      </Menu>
    </div>
  );
};
