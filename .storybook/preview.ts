import "pepjs";
import "open-props/style";

import "./styles.css";
import "./i18n";

import { create } from "@storybook/theming";

export const parameters = {
  viewMode: "docs",
  previewTabs: { canvas: { hidden: true } },
  docs: {
    theme: create({
      base: "dark",
    }),
  },
  options: {
    storySort: {
      order: [
        "Overview",
        "Getting Started",
        "Spacer Components",
        "Wrapper Components",
        "Primitives",
        "CSS Only",
        ["A CSS Only Version", "reset.css", "spacing-properties.css"],
        "Hooks",
      ],
    },
  },
};
