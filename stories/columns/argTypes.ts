export const columnsArgTypes = {
  gutter: {
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
  },
  colCount: {
    control: "number",
  },
  switchAt: {
    control: "text",
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
