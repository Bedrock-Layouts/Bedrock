export const argTypes = {
  boundarySize: {
    description: "Sets the max inline size of the component",
    type: { name: "string" },
    table: {
      type: { summary: "string" },
    },
    control: "select",
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
