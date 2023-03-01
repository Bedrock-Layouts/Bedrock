import { ArgType } from "src/types/argType";

export const argTypes: ArgType = {
  ratio: {
    description: "Aspect ratio that you want the child element to maintain",
    // eslint-disable-next-line no-template-curly-in-string
    summary: "[number, number] | `${number}/${number}`",
    initialValue: "16/4",
    control: "text",
  },
  position: {
    description: "Sets the alignment of the media in the Frame",
    summary: "object-position value",
    defaultValue: "50% 50%",
    initialValue: "50% 50%",
    control: "text",
  },
};
