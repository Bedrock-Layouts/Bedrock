import React from 'react';
import PropTypes from 'prop-types';
import { mergeSpacings } from '@bedrock-layout/spacing-constants';
import Stack, { StackProps } from '@bedrock-layout/stack';
import Split, { SplitProps } from '@bedrock-layout/split';

export interface SplitSwitcherProps extends StackProps, SplitProps {
  switchAt?: number;
}

export const SplitSwitcher = () => {};

SplitSwitcher.displayName = 'SplitSwitcher';

// SplitSwitcher.propTypes = {
//   gutter: PropTypes.oneOf<SpacingTypes>(
//     Object.keys(defaultSpacings) as SpacingTypes[]
//   ),
// };

// SplitSwitcher.defaultProps = {
//   gutter: 'md',
// };
