export const argTypes = {
  ratio: {
    control: "text",
    description:
      "Sets the aspect ratio of the frame (e.g., '16 / 9' or '4 / 3')",
  },
  position: {
    control: "text",
    description:
      "Sets the alignment of the content within the frame (e.g., 'top', 'center', 'bottom')",
  },
  padding: {
    control: "select",
    options: [
      undefined,
      "size000",
      "size00",
      "size1",
      "size2",
      "size3",
      "size4",
      "size5",
      "size6",
      "size7",
      "size8",
      "size9",
      "size10",
      "size11",
      "size12",
      "size13",
      "size14",
      "size15",
    ],
    description:
      "Sets padding on the component using design system spacing scale",
  },
  children: {
    control: "none",
  },
};
