import PropTypes from "prop-types";
import styled from "styled-components";

export interface ReelProps {
  maxHeight?: number;
  maxWidth?: number;
  snapX?: boolean;
  proximity?: boolean;
}

export const Reel = styled.div.attrs<ReelProps>(() => ({
  "data-bedrock-layout-reel": "",
}))<ReelProps>`
  overflow: scroll;

  ${(props) => (props.maxHeight ? `max-height: ${props.maxHeight}px;` : "")}
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth}px;` : "")}

  ${(props) =>
    props.snapX
      ? `
  scroll-snap-type: x ${props.proximity ? "proximity" : "mandatory"};
  display: flex;
  `
      : `scroll-snap-type: y
    ${props.proximity ? "proximity" : "mandatory"};`}

  & > * {
    scroll-snap-align: ${(props) => (props.snapX ? "center" : "start")};
  }
`;

Reel.displayName = "Reel";

Reel.propTypes = {
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  snapX: PropTypes.bool,
  proximity: PropTypes.bool,
};
