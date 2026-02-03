export const argTypes = {
  gap: {
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
    description: "Sets space between each element using spacing constants",
  },
  justify: {
    control: "select",
    options: ["start", "end", "center", "space-between", "space-around"],
    description: "Specifies the inline alignment of the children",
  },
  align: {
    control: "select",
    options: ["start", "end", "center", "stretch"],
    description: "Specifies the block alignment of the children",
  },
  stretch: {
    control: "select",
    options: [0, 1, 2, 3, 4, "all", "start", "end"],
    description:
      "Specifies which child should stretch to fill excess space (0-4 for specific child, all/start/end for multiple)",
  },
  switchAt: {
    description:
      "Specifies breakpoint at which items switch to column layout (CSSLength, number, or size constant)",
    control: "text",
  },
  minItemWidth: {
    control: "text",
    description:
      "Sets minimum width for all children (CSSLength, number, or size constant)",
  },
};
