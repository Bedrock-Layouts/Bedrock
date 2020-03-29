import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  breakPoints as defaultBreakpoints,
  BreakPoints,
} from '@bedrock-layout/spacing-constants';

type MergeBreakpoints = (breakPoints: object) => BreakPoints;
const mergeBreakpoints: MergeBreakpoints = (breakPoints = {}) => ({
  ...defaultBreakpoints,
  ...breakPoints,
});

const Outer = styled.div`
  padding: 0;
  max-width: 100%;
  overflow: hidden;
  height: 100%;
`;

const Inner = styled.div`
  margin: 0 auto;
  padding: 0 0;
  max-width: ${props => mergeBreakpoints(props.theme.breakPoints).xxlarge};
`;

export interface AppBoundaryProps {
  children: React.ReactNode;
}

const AppBoundary = ({ children }: AppBoundaryProps) => (
  <Outer>
    <Inner>{children}</Inner>
  </Outer>
);

AppBoundary.displayName = 'AppBoundary';

AppBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppBoundary;
