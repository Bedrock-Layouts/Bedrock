import useContainerQuery, { useMatchContainerSizes } from '../src';

describe('useContainerQuery', () => {
  test('useContainerQuery is not null', () => {
    expect(useContainerQuery).toBeTruthy();
  });
  test('useMatchContainerSizes is not null', () => {
    expect(useMatchContainerSizes).toBeTruthy();
  });
});
