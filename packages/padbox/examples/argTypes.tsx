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
