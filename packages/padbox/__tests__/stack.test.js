import React from 'react';
import { create } from 'react-test-renderer';
import { spacing } from '@bedrock-layout/spacing-constants';
import { ThemeProvider } from 'styled-components';
import PadBox from '../src';

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

describe('PadBox', () => {
  describe('correct usage', () => {
    test('Stack is not null', () => {
      expect(PadBox).toBeTruthy();
    });

    it('renders default padding', () => {
      const padbox = create(
        <PadBox>
          <Lorem />
        </PadBox>
      );
      expect(padbox.toJSON()).toMatchSnapshot();
    });

    it('renders all the padding options', () => {
      Object.keys(spacing).forEach(padding => {
        const padbox = create(
          <PadBox padding={padding}>
            <Lorem />
          </PadBox>
        );
        expect(padbox.toJSON()).toMatchSnapshot();
      });
    });

    //   it('renders with theme overrides', () => {
    //     const stack = create(
    //       <ThemeProvider theme={{ spacing: { md: '200px' } }}>
    //         <Stack>
    //           <Lorem />
    //         </Stack>
    //       </ThemeProvider>
    //     );
    //     expect(stack.toJSON()).toMatchSnapshot();
    //   });
  });

  // describe('incorrect usage', () => {
  //   let originalError;
  //   let spy;
  //   beforeEach(() => {
  //     originalError = console.error;
  //     spy = jest.fn();
  //     console.error = spy;
  //   });
  //   afterEach(() => {
  //     console.error = originalError;
  //   });

  //   it('renders default with console error with wrong input', () => {
  //     expect(spy.mock.calls.length).toBe(0);

  //     const errorStack = create(
  //       <Stack gutter='incorrect'>
  //         <Lorem />
  //       </Stack>
  //     );

  //     expect(spy.mock.calls.length).toBe(1);
  //     expect(errorStack.toJSON()).toMatchSnapshot();
  //   });
  // });
});
