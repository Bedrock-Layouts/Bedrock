import styled from 'styled-components';
import PropTypes from 'prop-types';
import { mergeBreakpoints } from '@bedrock-layout/spacing-constants';

export interface CenterProps {
  maxWidth?: number;
}

const Center = styled.div<CenterProps>`
  --maxWidth: ${({ maxWidth, theme: { breakPoints } }) =>
    typeof maxWidth === 'number'
      ? `${maxWidth}px`
      : mergeBreakpoints(breakPoints).medium + 'px'};

  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  margin-inline-start: auto;
  margin-inline-end: auto;
  max-width: var(--maxWidth);
`;

Center.displayName = 'Center';

Center.propTypes = {
  maxWidth: PropTypes.number,
};

export default Center;
