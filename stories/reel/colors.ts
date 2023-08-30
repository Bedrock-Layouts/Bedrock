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
