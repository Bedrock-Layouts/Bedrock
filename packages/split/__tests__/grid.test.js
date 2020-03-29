import React from 'react';
import { create } from 'react-test-renderer';
import { spacing } from '@bedrock-layout/spacing-constants';
import { ThemeProvider } from 'styled-components';
import Split from '../src';

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

describe('Split', () => {
  describe('correct usage', () => {
    test('Split is not null', () => {
      expect(Split).toBeTruthy();
    });

    it('renders default gutters', () => {
      const split = create(
        <Split>
          <Lorem />
        </Split>
      );
      expect(split.toJSON()).toMatchSnapshot();
    });

    it('renders all the gutter options', () => {
      Object.keys(spacing).forEach(gutter => {
        const split = create(
          <Split gutter={gutter}>
            <Lorem />
          </Split>
        );
        expect(split.toJSON()).toMatchSnapshot();
      });
    });

    it('renders all the fraction options', () => {
      ['auto-start', 'auto-end', '1/4', '1/3', '1/2', '2/3', '3/4'].forEach(
        fraction => {
          const split = create(
            <Split fraction={fraction}>
              <Lorem />
            </Split>
          );
          expect(split.toJSON()).toMatchSnapshot();
        }
      );
    });

    it('renders with theme overrides', () => {
      const split = create(
        <ThemeProvider theme={{ spacing: { md: '200px' } }}>
          <Split>
            <Lorem />
          </Split>
        </ThemeProvider>
      );
      expect(split.toJSON()).toMatchSnapshot();
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

    it('renders default with console error with wrong gutter input', () => {
      expect(spy.mock.calls.length).toBe(0);

      const errorStack = create(
        <Split gutter='incorrect'>
          <Lorem />
        </Split>
      );

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });

    it('renders default with console error with fraction input', () => {
      expect(spy.mock.calls.length).toBe(0);

      const errorStack = create(
        <Split fraction='incorrect'>
          <Lorem />
        </Split>
      );

      expect(spy.mock.calls.length).toBe(1);
      expect(errorStack.toJSON()).toMatchSnapshot();
    });
  });
});
