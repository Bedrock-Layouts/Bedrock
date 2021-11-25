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
  basis: {
    description: "Sets the basis of each of the children",
    type: { name: "string" },
    table: {
      type: { summary: "css length-percentage" },
    },
    control: "text",
  },
};
