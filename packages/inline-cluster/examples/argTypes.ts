export const argTypes = {
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
    options: ["start", "end", "center", "stretch"],
  },
};
