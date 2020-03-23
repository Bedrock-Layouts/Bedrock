import React from 'react';
import { create } from 'react-test-renderer';
import { spacing } from '@bedrock-layout/spacing-constants';
import Stack from '../src';

const Lorem = () => (
  <>
    {Array.from(Array(4).keys()).map(i => (
      <p key={i}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
        vestibulum tortor, vitae venenatis lectus. Praesent gravida dapibus
        neque sit amet molestie. Morbi blandit eu dolor a luctus. Vestibulum
        sollicitudin elit ac nunc scelerisque rhoncus. Nulla felis sapien,
        condimentum ut imperdiet vel, aliquet id ante. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Quisque ultrices, quam nec scelerisque malesuada, lectus elit semper
        diam, ac placerat purus tortor et enim.
      </p>
    ))}
  </>
);

describe('Stack', () => {
  test('Stack is not null', () => {
    expect(Stack).toBeTruthy();
  });
  it('renders default gutters', () => {
    const stack = create(
      <Stack>
        <Lorem />
      </Stack>
    );
    expect(stack.toJSON()).toMatchSnapshot();
  });
  it('renders all the gutter options', () => {
    Object.keys(spacing).forEach(gutter => {
      const stack = create(
        <Stack gutter={gutter}>
          <Lorem />
        </Stack>
      );
      expect(stack.toJSON()).toMatchSnapshot();
    });
  });
});
