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
};
