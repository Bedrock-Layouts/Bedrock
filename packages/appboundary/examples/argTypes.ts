export const argTypes = {
  boundarySize: {
    description: "Sets the max inline size of the component",
    type: { name: "string" },
    table: {
      type: { summary: "number, CSSLength,, SizesOption" },
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
