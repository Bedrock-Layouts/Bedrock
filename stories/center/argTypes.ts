export const argTypes = {
  maxWidth: {
    description: "Sets the max inline size of the component",
    type: { name: "string" },
    table: {
      type: { summary: "CSSLength" },
    },
    control: "text",
  },
  centerText: {
    description: "Sets the text alignment of the component to be centered",
    type: { name: "boolean" },
    table: {
      type: { summary: "boolean" },
    },
    control: "boolean",
  },
  centerChildren: {
    description:
      "Sets the alignment of the component's children to be centered",
    type: { name: "boolean" },
    table: {
      type: { summary: "boolean" },
    },
    control: "boolean",
  },
};
