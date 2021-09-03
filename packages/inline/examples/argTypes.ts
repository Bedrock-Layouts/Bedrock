export const argTypes = {
  gutter: {
    description: "Sets space between each element",
    type: { name: "string", required: true },
    table: {
      type: { summary: "string" },
    },
    control: "select",
    options: [
      "none",
      "xxs",
      "xs",
      "sm",
      "md",
      "mdLg",
      "lg",
      "lgXl",
      "xl",
      "xlXXl",
      "xxl",
    ],
  },
  justify: {
    description: "Sets the inline justification of the children",
    type: { name: "string" },
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "start" },
    },
    control: "select",
    options: ["start", "end", "center"],
  },
  align: {
    description: "Sets the block alignment of the children",
    type: { name: "string" },
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "start" },
    },
    control: "select",
    options: ["start", "end", "center"],
  },
};
