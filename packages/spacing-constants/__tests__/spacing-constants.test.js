import * as constants from '../src';

describe('Spacing Constants', () => {
  test('constant snampshot', () => {
    expect(constants).toMatchSnapshot();
  });

  it('merges spacing', () => {
    const newSpacings = { xl: '8rem' };
    expect(constants.mergeSpacings(newSpacings)).toMatchSnapshot();
  });

  it('merges breakpoints', () => {
    const newBreakpoints = { xlarge: '1300px' };
    expect(constants.mergeBreakpoints(newBreakpoints)).toMatchSnapshot();
  });
});
