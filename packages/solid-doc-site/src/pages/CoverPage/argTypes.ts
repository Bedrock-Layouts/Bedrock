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
  "variant:stretch-content": {
    description: "Stretch the content of the children to fill the container",
    defaultValue: "false",
    initialValue: false,
    summary: "boolean",
    control: "boolean",
  },
  minHeight: {
    description: "Sets the minimum block size of the component",
    summary: "CSSLength | number | SizesOptions",
    initialValue: "25vh",
    defaultValue: "100%",
    control: "text",
  },
};
