export const argTypes = {
  padding: {
    description: "Sets the padding around the content of the element",
    type: { name: "string", required: true },
    table: {
      type: {
        summary: ["string", "array of strings", "object of strings"],
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
        summary: ["string"],
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
        summary: ["string"],
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
        summary: ["string"],
      },
    },
    control: "array",
  },
};
