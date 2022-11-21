import "pepjs";
import "open-props/style";
import "@bedrock-layout/css";

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
        "Bedrock Layout CSS",
        ["A CSS Only Version", "reset.css", "spacing-properties.css"],
        "Hooks",
      ],
    },
  },
};

export const globalTypes = {
  locale: {
    title: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", title: "English" },
        { value: "es", title: "Spanish" },
      ],
    },
  },
};
