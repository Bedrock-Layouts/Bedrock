import React from 'react';
import { create } from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import AppBoundary from '../src';

const Lorem = () => {
  return (
    <>
      {Array.from(Array(4).keys()).map(i => (
        <p key={i}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
          vestibulum tortor, vitae venenatis lectus. Praesent gravida dapibus
          neque sit amet molestie. Morbi blandit eu dolor a luctus. Vestibulum
          sollicitudin elit ac nunc scelerisque rhoncus. Nulla felis sapien,
          condimentum ut imperdiet vel, aliquet id ante. Pellentesque habitant
          morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Quisque ultrices, quam nec scelerisque malesuada, lectus elit
          semper diam, ac placerat purus tortor et enim.
        </p>
      ))}
    </>
  );
};

describe('AppBoundary', () => {
  describe('correct usage', () => {
    test('AppBoundary is not null', () => {
      expect(AppBoundary).toBeTruthy();
    });

    it('renders default gutters', () => {
      const appboundary = create(
        <AppBoundary>
          <Lorem />
        </AppBoundary>
      );
      expect(appboundary.toJSON()).toMatchSnapshot();
    });

    it('renders with theme overrides', () => {
      const appboundary = create(
        <ThemeProvider theme={{ breakPoints: { xxlarge: 1600 } }}>
          <AppBoundary>
            <Lorem />
          </AppBoundary>
        </ThemeProvider>
      );
      expect(appboundary.toJSON()).toMatchSnapshot();
    });
  });

  describe('incorrect usage', () => {
    let originalError;
    let spy;
    beforeEach(() => {
      originalError = console.error;
      spy = jest.fn();
      console.error = spy;
    });
    afterEach(() => {
      console.error = originalError;
    });

    it('renders default with console error with no children', () => {
      expect(spy.mock.calls.length).toBe(0);

      const errorStack = create(<AppBoundary />);

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
