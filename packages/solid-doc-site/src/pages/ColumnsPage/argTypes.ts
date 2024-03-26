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
  colCount: {
    description: "Sets the number of columns",
    defaultValue: "1",
    initialValue: 4,
    summary: "number",
    control: "number",
  },
  switchAt: {
    description:
      "Sets the width threshold that the split will switch to a Stack layout",
    summary: "string | number",
    control: "text",
    initialValue: "25rem",
  },
};

export const columnArgTypes: ArgType = {
  span: {
    description: "Sets the number of columns the element will span",
    summary: "number",
    defaultValue: "1",
    initialValue: 1,
    control: "number",
  },
  offsetStart: {
    description:
      "Sets the number of columns the element will offset before the element",
    summary: "number",
    defaultValue: "-",
    initialValue: 0,
    control: "number",
  },
  offsetEnd: {
    description:
      "Sets the number of columns the element will offset after the element",
    summary: "number",
    defaultValue: "-",
    initialValue: 0,
    control: "number",
  },
};
