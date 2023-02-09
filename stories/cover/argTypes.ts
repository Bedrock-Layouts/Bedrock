export const argTypes = {
  gutter: {
    description: "Sets space between each element",
    type: { name: "string", required: true },
    table: {
      type: { summary: "string" },
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
  minHeight: {
    description: "Sets the minimum block size of the component",
    type: { name: "string" },
    table: {
      type: { summary: "CSSLength" },
      defaultValue: { summary: "100vh" },
    },
    control: "text",
  },
  top: {
    description: "renders an React Node before the children",
    type: { name: "ReactNode" },
    table: {
      type: { summary: "ReactNode" },
    },
  },
  bottom: {
    description: "renders an React Node after the children",
    type: { name: "ReactNode" },
    table: {
      type: { summary: "ReactNode" },
    },
  },
};
