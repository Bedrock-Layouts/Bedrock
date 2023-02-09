export const argTypes = {
  boundarySize: {
    description: "Sets the max inline size of the component",
    type: { name: "string" },
    table: {
      type: { summary: "number, CSSLength,, SizesOption" },
    },
    control: "select",
    options: [
      "sizeContent1",
      "sizeContent2",
      "sizeContent3",
      "sizeHeader1",
      "sizeHeader2",
      "sizeHeader3",
      "sizeXxs",
      "sizeXs",
      "sizeSm",
      "sizeMd",
      "sizeLg",
      "sizeXl",
      "sizeXxl",
    ],
  },
};
