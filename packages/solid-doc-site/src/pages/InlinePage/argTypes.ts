import { spacing } from "@bedrock-layout/solid";
import { ArgType } from "src/types/argType";

export const argTypes: ArgType = {
  gap: {
    description: "Sets space between each element",
    summary: "Space",
    defaultValue: "0px",
    initialValue: "size3",
    control: "select",
    options: Object.keys(spacing),
  },
  minItemWidth: {
    description: "Sets the basis of each of the children",
    summary: "CSSLength",
    defaultValue: "0px",
    initialValue: "100px",
    control: "text",
  },
  justify: {
    description: "Sets the inline justification of the children",
    summary: "start | end | center",
    defaultValue: "start",
    initialValue: "start",
    control: "select",
    options: ["start", "end", "center"],
  },
  align: {
    description: "Sets the block alignment of the children",
    summary: "start | end | center | stretch",
    defaultValue: "start",
    initialValue: "start",
    control: "select",
    options: ["start", "end", "center", "stretch"],
  },
  stretch: {
    description: "Sets which child will stretch in the inline direction",
    summary: "all | start | end or index of child",
    defaultValue: "-",
    initialValue: "-",
    control: "select",
    options: ["-", "all", "start", "end"],
  },
  switchAt: {
    description:
      "Sets the width threshold that the split will switch to a Stack layout",
    summary: "string | number",
    control: "text",
    initialValue: "25rem",
  },
};
