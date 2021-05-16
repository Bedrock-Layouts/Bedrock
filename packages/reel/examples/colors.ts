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

export const ColoredRect = styled.div`
  ${(props) => (props.color ? `background-color: ${props.color};` : "")}
  width: 100%;
  margin: 0;
  padding: 100px;
  text-align: center;
`;
ColoredRect.displayName = "ColoredRect";
