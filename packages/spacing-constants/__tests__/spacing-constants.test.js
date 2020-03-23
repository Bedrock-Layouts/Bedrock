import * as constants from '../src';

describe('Spacing Constants', () => {
  test('constant snampshot', () => {
    expect(constants).toMatchSnapshot();
  });
});
