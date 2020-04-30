import React from 'react';
import { create } from 'react-test-renderer';
//import { ThemeProvider } from 'styled-components';
import Cover from '../src';

const Lorem = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
    vestibulum tortor, vitae venenatis lectus. Praesent gravida dapibus neque
    sit amet molestie. Morbi blandit eu dolor a luctus. Vestibulum sollicitudin
    elit ac nunc scelerisque rhoncus. Nulla felis sapien, condimentum ut
    imperdiet vel, aliquet id ante. Pellentesque habitant morbi tristique
    senectus et netus et malesuada fames ac turpis egestas. Quisque ultrices,
    quam nec scelerisque malesuada, lectus elit semper diam, ac placerat purus
    tortor et enim.
  </p>
);

describe('Cover', () => {
  describe('correct usage', () => {
    test('Cover is not null', () => {
      expect(Cover).toBeTruthy();
    });

    it('renders default width', () => {
      const cover = create(
        <Cover>
          <Lorem />
        </Cover>
      );
      expect(cover.toJSON()).toMatchSnapshot();
    });

    // it('renders custom width', () => {
    //   const cover = create(
    //     <Cover maxWidth={320}>
    //       <Lorem />
    //     </Cover>
    //   );
    //   expect(cover.toJSON()).toMatchSnapshot();
    // });

    // it('renders with theme overrides', () => {
    //   const cover = create(
    //     <ThemeProvider theme={{ breakPoints: { medium: 1600 } }}>
    //       <Cover>
    //         <Lorem />
    //       </Cover>
    //     </ThemeProvider>
    //   );
    //   expect(cover.toJSON()).toMatchSnapshot();
    // });
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

  //   it('renders default with console error with no children', () => {
  //     expect(spy.mock.calls.length).toBe(0);

  //     const errorStack = create(
  //       <Cover maxWidth='incorrect'>
  //         <Lorem />
  //       </Cover>
  //     );

  //     expect(spy.mock.calls.length).toBe(1);
  //     expect(errorStack.toJSON()).toMatchSnapshot();
  //   });
  // });
});
