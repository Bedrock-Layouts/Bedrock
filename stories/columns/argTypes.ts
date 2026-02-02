export const columnsArgTypes = {
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
    description: "Sets space between each column using spacing constants",
  },
  colCount: {
    control: "number",
    description: "Sets the number of columns",
  },
  switchAt: {
    control: "text",
    description:
      "Specifies breakpoint at which columns switch to single column layout (CSSLength, number, or size constant)",
  },
  padding: {
    control: "select",
    options: [
      undefined,
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
    description:
      "Sets padding on the component using design system spacing scale",
  },
  as: {
    control: "none",
  },
};

export const columnArgTypes = {
  span: {
    table: {
      type: { summary: "number" },
    },
    control: "number",
  },
  offsetStart: {
    table: {
      type: { summary: "number" },
    },
    control: "number",
  },
  offsetEnd: {
    table: {
      type: { summary: "number" },
    },
    control: "number",
  },
};
