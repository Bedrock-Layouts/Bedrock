import { spacing } from "@bedrock-layout/solid";
import { ArgType } from "src/types/argType";

export const argTypes: ArgType = {
  padding: {
    description: "Sets the padding around the content of the element",
    summary: "Space | Space[] | Record<paddingProperty, Space>",
    defaultValue: "0px",
    initialValue: "size3",
    control: "select",
    options: Object.keys(spacing),
  },
};
