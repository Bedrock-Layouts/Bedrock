export const argTypes = {
  boundarySize: {
    description: "Sets the max inline size of the component",
    type: { name: "string" },
    table: {
      type: { summary: "string" },
    },
    control: "select",
    defaultValue: "xxlarge",
    options: [
      "xxsmall",
      "xsmall",
      "small",
      "medium",
      "large",
      "xlarge",
      "xxlarge",
    ],
  },
};
