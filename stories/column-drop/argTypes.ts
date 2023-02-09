export const argTypes = {
  gutter: {
    description: "Sets space between each element",
    type: { name: "string", required: true },
    table: {
      type: { summary: "number, CSSLength, or SpacingOption" },
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
  minItemWidth: {
    description: "Sets the minItemWidth of each of the children",
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
