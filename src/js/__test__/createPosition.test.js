import createPosition from '../createPosition';

describe('createPosition', () => {
  it('should not return the same position consecutively', () => {
    const boardSize = 8;
    const positions = Array(100)
      .fill(0)
      .map(() => createPosition(boardSize));

    for (let i = 1; i < positions.length; i += 1) {
      expect(positions[i]).not.toBe(positions[i - 1]);
    }
  });
});
