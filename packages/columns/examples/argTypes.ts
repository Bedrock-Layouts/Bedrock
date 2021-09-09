export const columnsArgTypes = {
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
  columns: {
    description: "Sets the number of columns",
    type: { name: "number" },
    table: {
      type: { summary: "number" },
    },
    control: "number",
  },
  dense: {
    description: "Toggle for is the layout should use a dense layout or not",
    defaultValue: false,
    type: { name: "boolean" },
    table: {
      type: { summary: "boolean" },
    },
    control: "boolean",
  },
  switchAt: {
    description:
      "Sets the width threshold that the split will switch to a Stack layout",
    type: { name: "string" },
    table: {
      type: { summary: "css length as string or number" },
    },
    control: "text",
  },
};

export const columnArgTypes = {
  span: {
    description: "Sets the number of columns the element will span",
    type: { name: "number" },
    table: {
      type: { summary: "number" },
    },
    control: "number",
  },
  offsetStart: {
    description:
      "Sets the number of columns the element will offset before the element",
    type: { name: "number" },
    table: {
      type: { summary: "number" },
    },
    control: "number",
  },
  offsetEnd: {
    description:
      "Sets the number of columns the element will offset after the element",
    type: { name: "number" },
    table: {
      type: { summary: "number" },
    },
    control: "number",
  },
};
