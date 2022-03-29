import "pepjs";
import "open-props/style";

import "./styles.css";

import { create } from "@storybook/theming";

export const parameters = {
  viewMode: "docs",
  docs: {
    theme: create({
      base: "light",
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
