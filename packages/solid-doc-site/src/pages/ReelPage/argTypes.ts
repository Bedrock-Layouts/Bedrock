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
  snapType: {
    description: "Sets the scroll snap type",
    summary: "string",
    control: "select",
    defaultValue: "none",
    initialValue: "none",
    options: ["none", "proximity", "mandatory"],
  },
};
