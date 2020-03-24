import React from 'react';
import Brand from './logo.js';
import styled from 'styled-components';

const Split = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(1px, auto));
  align-items: center;
`;

const Title = styled.span`
  white-space: nowrap;
  font-size: 24px;
  text-transform: uppercase;
  @media (max-width: 640px) {
    white-space: normal;
  }
`;

export const Logo = () => {
  return (
    <Split>
      <Brand alt='Bedrock Layout Primitives Logo' />{' '}
      <Title>Bedrock Layout Primitives</Title>
    </Split>
  );
};
