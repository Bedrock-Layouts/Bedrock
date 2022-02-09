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
      type: { summary: "CSSLength" },
    },
    control: "text",
  },
  noStretchedColumns: {
    description:
      "If true, the columns will not be stretched to fill the container",
    type: { name: "boolean" },
    table: {
      type: { summary: "boolean" },
    },
    control: "boolean",
  },
};
