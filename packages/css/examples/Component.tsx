import styled from "styled-components";
export const Component = styled.div<{ color?: string }>`
  background: ${(props) => props.color ?? "black"};
  min-height: 50px;
  min-width: 100px;
  text-align: center;
`;

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
