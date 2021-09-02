export const argTypes = {
  ratio: {
    description: "Aspect ratio that you want the child element to maintain",
    type: { name: "[number, number]" },
    table: {
      type: { summary: "[number, number]" },
    },
    control: "array",
  },
  position: {
    description: "Sets the alignment of the media in the Frame",
    type: { name: "object-position value" },
    table: {
      type: { summary: "object-position value" },
    },
    control: "text",
  },
};
