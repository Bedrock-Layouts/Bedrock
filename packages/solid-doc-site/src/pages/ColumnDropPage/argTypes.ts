import { spacing } from "@bedrock-layout/solid";
import { ArgType } from "src/types/argType";

export const argTypes: ArgType = {
  gap: {
    description: "Sets space between each element",
    summary: "Space",
    defaultValue: "0px",
    initialValue: "space3",
    control: "select",
    options: Object.keys(spacing),
  },
  minItemWidth: {
    description: "Sets the minItemWidth of each of the children",
    summary: "CSSLength",
    defaultValue: "159px",
    initialValue: "15rem",
    control: "text",
  },
  variant: {
    description:
      "If 'centered', the columns will not be stretched to fill the container",
    summary: "'default' | 'centered'",
    defaultValue: "default",
    initialValue: "default",
    control: "select",
    options: ["default", "centered"],
  },
};
