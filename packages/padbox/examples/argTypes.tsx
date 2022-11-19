export const argTypes = {
  padding: {
    description: "Sets the padding around the content of the element",
    type: { name: "string", required: true },
    table: {
      type: {
        summary: [
          "number, CSSLength, SpacingOption",
          "array of valid Padding values",
          "object of valid Padding values",
        ],
      },
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
};

export const singleArgTypes = {
  padding: {
    description: "Sets the padding around the content of the element",
    type: { name: "string", required: true },
    table: {
      type: {
        summary: ["number, CSSLength, SpacingOption"],
      },
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
};

export const arrayArgTypes = {
  padding: {
    description: "Sets the padding around the content of the element",
    type: { name: "string", required: true },
    table: {
      type: {
        summary: ["array of number, CSSLength, SpacingOption"],
      },
    },
    control: "array",
  },
};

export const objArgTypes = {
  padding: {
    description: "Sets the padding around the content of the element",
    type: { name: "string", required: true },
    table: {
      type: {
        summary: ["Object of number, CSSLength, SpacingOption"],
      },
    },
    control: "array",
  },
};
