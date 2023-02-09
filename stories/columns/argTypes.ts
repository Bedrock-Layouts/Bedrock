export const columnsArgTypes = {
  gutter: {
    description: "Sets space between each element",
    type: { name: "string", required: true },
    table: {
      type: { summary: "number, CSSLength, SpacingOption" },
    },
    control: "select",
    options: [
      "size000",
      "size00",
      "size1",
      "size2",
      "size3",
      "size4",
      "size5",
      "size6",
      "size7",
      "size8",
      "size9",
      "size10",
      "size11",
      "size12",
      "size13",
      "size14",
      "size15",
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
