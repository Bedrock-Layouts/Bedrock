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
  align: {
    description: "Sets the block alignment of the children",
    summary: "start | end | center | stretch",
    defaultValue: "stretch",
    initialValue: "stretch",
    control: "select",
    options: ["start", "end", "center", "stretch"],
  },
};
