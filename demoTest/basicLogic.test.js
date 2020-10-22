import { getRandomLargeNumber } from '../src/lib/util/getRandomLargeNumber';

function add(a: int, b: int): int {
  return a + b;
}

describe('Basic test to check if configurations are correct', () => {
  test('Pure logic test', () => {
    expect(getRandomLargeNumber()).toBeDefined();
  });

  test('Logic with flow', () => {
    expect(add(1, 2)).toEqual(3);
  });
});
