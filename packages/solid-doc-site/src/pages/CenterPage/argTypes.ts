import { ArgType } from "src/types/argType";

export const argTypes: ArgType = {
  maxWidth: {
    description: "Sets the max inline size of the component",
    summary: "CSSLength",
    defaultValue: "100%",
    initialValue: "100%",
    control: "text",
  },
  centerText: {
    description: "Sets the text alignment of the component to be centered",
    defaultValue: "false",
    initialValue: false,
    summary: "boolean",
    control: "boolean",
  },
  centerChildren: {
    description:
      "Sets the alignment of the component's children to be centered",
    defaultValue: "false",
    initialValue: false,
    summary: "boolean",
    control: "boolean",
  },
};
