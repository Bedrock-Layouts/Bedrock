import React from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import Center from '@bedrock-layout/center';
import { mergeBreakpoints } from '@bedrock-layout/spacing-constants';

export interface AppBoundaryProps {
  children: React.ReactNode;
}

const Outer = styled.div`
  padding: 0;
  max-width: 100%;
  overflow: hidden;
  height: 100%;
`;

const safeTheme = { breakPoints: {} };

const AppBoundary = ({ children }: AppBoundaryProps) => {
  const { breakPoints = {} } = React.useContext(ThemeContext) || safeTheme;
  const maxWidth = mergeBreakpoints(breakPoints).xxlarge;
  return (
    <Outer>
      <Center maxWidth={maxWidth}>{children}</Center>
    </Outer>
  );
};

AppBoundary.displayName = 'AppBoundary';

AppBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default AppBoundary;
