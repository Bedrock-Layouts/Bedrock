export const argTypes = {
  switchAt: {
    type: "string | number",
    table: {
      type: { summary: ["string | number"] },
    },
    description:
      "Sets the width threshold that the split will switch to a Stack layout",
  },
  minItemWidth: {
    description: "Sets the min inline size of each of the children",
    type: { name: "CSSLength" },
    table: {
      type: { summary: "css length-percentage" },
    },
    control: "text",
  },
  fraction: {
    description: "Sets the fractional split",
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "1/2" },
    },
    control: "select",
    options: ["auto-start", "auto-end", "1/4", "1/3", "1/2", "2/3", "3/4"],
  },
  gutter: {
    description: "Sets space between each element",
    type: { name: "string", required: true },
    table: {
      type: { summary: "number, CSSLength or SpacingOption" },
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
