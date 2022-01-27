import "pepjs";

import "./styles.css";

export const parameters = {
  viewMode: "docs",
  options: {
    storySort: {
      order: [
        "Overview",
        "Getting Started",
        "Components",
        "CSS Only",
        ["A CSS Only Version", "reset.css", "spacing-properties.css"],
        "Hooks",
      ],
    },
  },
};
