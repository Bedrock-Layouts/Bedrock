export const argTypes = {
  gutter: {
    description: "Sets space between each element",
    type: { name: "string", required: true },
    table: {
      type: { summary: "number, CSSLength, SpacingOption" },
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
  stretch: {
    description: "Sets which child will stretch in the inline direction",
    type: { name: "string" },
    table: {
      type: { summary: "string or index of child" },
    },
    control: "select",
    options: ["all", "start", "end"],
  },
  switchAt: {
    type: "string | number",
    table: {
      type: { summary: ["string | number"] },
    },
    description:
      "Sets the width threshold that the split will switch to a Stack layout",
    control: "text",
  },
  minItemWidth: {
    description: "Sets the min inline size of each of the children",
    type: { name: "CSSLength" },
    table: {
      type: { summary: "css length-percentage" },
    },
    control: "text",
  },
};
