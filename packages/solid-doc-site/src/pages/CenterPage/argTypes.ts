import { ArgType } from "src/types/argType";

export const argTypes: ArgType = {
  maxWidth: {
    description: "Sets the max inline size of the component",
    summary: "CSSLength",
    defaultValue: "100%",
    initialValue: "100%",
    control: "text",
  },
};
