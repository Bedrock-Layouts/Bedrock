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
  variant: {
    description: "Sets the variant of the grid to be default grid or masonry",
    summary: "grid | masonry",
    defaultValue: "grid",
    initialValue: "grid",
    control: "select",
    options: ["grid", "masonry"],
  },
  minItemWidth: {
    description: "Sets the basis of each of the children",
    summary: "CSSLength",
    defaultValue: "639px",
    initialValue: "20rem",
    control: "text",
  },
};
