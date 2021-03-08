import InlineCluster, {
  InlineClusterProps,
} from "@bedrock-layout/inline-cluster";
import PropTypes from "prop-types";
import styled from "styled-components";

type Stretch = "all" | "start" | "end" | number;

export interface InlineProps extends InlineClusterProps {
  stretch?: Stretch;
}

const Inline = styled(InlineCluster)<{ stretch?: Stretch }>`
  flex-wrap: nowrap;
  ${({ stretch }) =>
    stretch === "all"
      ? `> *  { flex: 1 }`
      : stretch === "start"
      ? `> :first-child { flex: 1 }`
      : stretch === "end"
      ? `> :last-child { flex: 1 }`
      : typeof stretch === "number"
      ? `> :nth-child(${stretch + 1}) { flex: 1 }`
      : null}
`;

Inline.displayName = "Inline";

Inline.propTypes = {
  ...InlineCluster.propTypes,
  stretch: PropTypes.oneOfType([
    PropTypes.oneOf<Stretch>(["all", "start", "end"]),
    PropTypes.number,
  ]),
};

export default Inline;
