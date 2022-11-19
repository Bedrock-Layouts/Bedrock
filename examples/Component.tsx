import { PadBox } from "@bedrock-layout/padbox";
import styled from "styled-components";

export const Component = styled(PadBox).attrs(() => ({ padding: "size3" }))`
  border: 1px solid black;
  text-align: center;
`;
