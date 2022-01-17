import GridGenerator from '../../src/GridGenerator';
import Hex from '../../src/models/Hex';

test('ring should work', () => {
  expect(GridGenerator.ring(new Hex(0, 0, 0), 1)).toEqual(
    [
      { q: -1, r: 1, s: 0 },
      { q: 0, r: 1, s: -1 },
      { q: 1, r: 0, s: -1 },
      { q: 1, r: -1, s: 0 },
      { q: 0, r: -1, s: 1 },
      { q: -1, r: 0, s: 1 },
    ],
  );
});

test('spiral should work', () => {
  expect(GridGenerator.spiral(new Hex(0, 0, 0), 1)).toEqual(
    [
      { q: 0, r: 0, s: 0 },
      { q: -1, r: 1, s: 0 },
      { q: 0, r: 1, s: -1 },
      { q: 1, r: 0, s: -1 },
      { q: 1, r: -1, s: 0 },
      { q: 0, r: -1, s: 1 },
      { q: -1, r: 0, s: 1 },
    ],
  );
});

test('parallelogram should work', () => {
  expect(GridGenerator.parallelogram(0, 1, 0, 1)).toEqual(
    [
      { q: 0, r: 0, s: -0 },
      { q: 0, r: 1, s: -1 },
      { q: 1, r: 0, s: -1 },
      { q: 1, r: 1, s: -2 },
    ],
  );
});

test('triangle should work', () => {
  expect(GridGenerator.triangle(1)).toEqual(
    [
      { q: 0, r: 0, s: -0 },
      { q: 0, r: 1, s: -1 },
      { q: 1, r: 0, s: -1 },
    ],
  );
});

test('hexagon should work', () => {
  expect(GridGenerator.hexagon(1)).toEqual(
    [
      { q: -1, r: 0, s: 1 },
      { q: -1, r: 1, s: 0 },
      { q: 0, r: -1, s: 1 },
      { q: 0, r: 0, s: -0 },
      { q: 0, r: 1, s: -1 },
      { q: 1, r: -1, s: 0 },
      { q: 1, r: 0, s: -1 },
    ],
  );
});

test('rectangle should work', () => {
  expect(GridGenerator.rectangle(3, 3)).toEqual(
    [
      { q: -0, r: 0, s: 0 },
      { q: 1, r: 0, s: -1 },
      { q: 2, r: 0, s: -2 },
      { q: -0, r: 1, s: -1 },
      { q: 1, r: 1, s: -2 },
      { q: 2, r: 1, s: -3 },
      { q: -1, r: 2, s: -1 },
      { q: 0, r: 2, s: -2 },
      { q: 1, r: 2, s: -3 },
    ],
  );
});

test('orientedRectangle should work', () => {
  expect(GridGenerator.orientedRectangle(3, 3)).toEqual(
    [
      { q: 0, r: -0, s: 0 },
      { q: 0, r: 1, s: -1 },
      { q: 0, r: 2, s: -2 },
      { q: 1, r: -0, s: -1 },
      { q: 1, r: 1, s: -2 },
      { q: 1, r: 2, s: -3 },
      { q: 2, r: -1, s: -1 },
      { q: 2, r: 0, s: -2 },
      { q: 2, r: 1, s: -3 },
    ],
  );
});
