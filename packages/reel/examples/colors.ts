import styled from "styled-components";
export const colors: string[] = [
  "Lavender",
  "Thistle",
  "Plum",
  "Orchid",
  "Violet",
  "Fuchsia",
  "Magenta",
  "MediumOrchid",
  "DarkOrchid",
  "DarkViolet",
  "BlueViolet",
  "DarkMagenta",
  "Purple",
  "MediumPurple",
  "MediumSlateBlue",
  "SlateBlue",
  "DarkSlateBlue",
  "RebeccaPurple",
  "Indigo",
];

export const ColoredRect = styled.div<{ bgColor: string }>`
  ${(props) => (props.bgColor ? `background-color: ${props.bgColor};` : "")}
  padding: 50px;
  text-align: center;
`;
ColoredRect.displayName = "ColoredRect";

export const argTypes = {
  gutter: {
    description: "Sets space between each element",
    type: { name: "string", required: true },
    table: {
      type: { summary: "number, CSSLength, SpacingOption" },
    },
    control: "select",
    options: [
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
  },
  snapType: {
    description: "Sets the scroll snap type",
    type: { name: "string" },
    table: {
      type: { summary: "string" },
    },
    control: "select",
    options: ["none", "proximity", "mandatory"],
  },
};
