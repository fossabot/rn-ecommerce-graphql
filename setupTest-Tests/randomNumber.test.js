import { getRandomLargeNumber } from '../src/lib/util/getRandomLargeNumber';

describe('Basic test to check if configurations are correct', () => {
  test('Pure logic test', () => {
    expect(getRandomLargeNumber()).toBeDefined();
  });
});
