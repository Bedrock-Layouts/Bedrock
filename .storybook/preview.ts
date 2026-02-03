import "open-props/style";

import "../packages/css/lib/bedrock-layout.min.css";
import "./styles.css";
import "./i18n";

import { create } from "@storybook/theming";

import { template } from "./autodocTemplate";

export const parameters = {
  viewMode: "docs",
  previewTabs: { canvas: { hidden: true } },
  docs: {
    theme: create({
      base: "dark",
    }),
    page: template,
    toc: { disabled: false, headingSelector: "h2, h3" },
  },
  options: {
    storySort: {
      order: [
        "Overview",
        "Getting Started",
        "Examples",
        "Spacer Components",
        "Wrapper Components",
        "Primitives",
        "Bedrock Layout CSS",
        ["A CSS Only Version", "reset.css", "spacing-properties.css"],
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
