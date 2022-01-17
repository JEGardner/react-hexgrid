import { LayoutParams } from './Layout';
import Hex from './models/Hex';
import Point from './models/Point';

const DIRECTIONS = [
  new Hex(1, 0, -1),
  new Hex(1, -1, 0),
  new Hex(0, -1, 1),
  new Hex(-1, 0, 1),
  new Hex(-1, 1, 0),
  new Hex(0, 1, -1),
];

function equals(a: Hex, b: Hex) {
  return a.q === b.q && a.r === b.r && a.s === b.s;
}

function add(a: Hex, b: Hex) {
  return new Hex(a.q + b.q, a.r + b.r, a.s + b.s);
}

function subtract(a: Hex, b: Hex) {
  return new Hex(a.q - b.q, a.r - b.r, a.s - b.s);
}

function multiply(a: Hex, k: number) {
  return new Hex(a.q * k, a.r * k, a.s * k);
}

function lengths(hex: Hex) {
  return (Math.abs(hex.q) + Math.abs(hex.r) + Math.abs(hex.s)) / 2;
}

function distance(a: Hex, b: Hex) {
  return lengths(subtract(a, b));
}

function getDirection(direction: number) {
  return DIRECTIONS[(6 + (direction % 6)) % 6];
}

function neighbour(hex: Hex, direction: number) {
  return add(hex, getDirection(direction));
}

function neighbours(hex: Hex) {
  const array = [];

  for (let i = 0; i < DIRECTIONS.length; i++) {
    array.push(neighbour(hex, i));
  }

  return array;
}

function round(hex: Hex) {
  let rq = Math.round(hex.q);
  let rr = Math.round(hex.r);
  let rs = Math.round(hex.s);

  const qDiff = Math.abs(rq - hex.q);
  const rDiff = Math.abs(rr - hex.r);
  const sDiff = Math.abs(rs - hex.s);

  if (qDiff > rDiff && qDiff > sDiff) {
    rq = -rr - rs;
  } else if (rDiff > sDiff) {
    rr = -rq - rs;
  } else {
    rs = -rq - rr;
  }

  return new Hex(rq, rr, rs);
}

function hexToPixel(hex: Hex, layout: LayoutParams) {
  const { spacing, orientation, size, origin } = layout;

  const x =
    (orientation.f0 * hex.q + orientation.f1 * hex.r) * size.x * spacing;
  const y =
    (orientation.f2 * hex.q + orientation.f3 * hex.r) * size.y * spacing;

  return new Point(x + origin.x, y + origin.y);
}

function pixelToHex(point: Point, layout: LayoutParams) {
  const { orientation, origin, size } = layout;

  const pt = new Point(
    (point.x - origin.x) / size.x,
    (point.y - origin.y) / size.y
  );
  const q = orientation.b0 * pt.x + orientation.b1 * pt.y;
  const r = orientation.b2 * pt.x + orientation.b3 * pt.y;
  const hex = new Hex(q, r, -q - r);

  return round(hex);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hexLerp(a: Hex, b: Hex, t: number) {
  return new Hex(lerp(a.q, b.q, t), lerp(a.r, b.r, t), lerp(a.s, b.s, t));
}

function getID(hex: Hex) {
  return `${hex.q},${hex.r},${hex.s}`;
}

const HexUtils = {
  equals,
  add,
  subtract,
  multiply,
  lengths,
  distance,
  direction: getDirection,
  neighbour,
  neighbours,
  round,
  hexToPixel,
  pixelToHex,
  lerp,
  hexLerp,
  getID,
};

export default HexUtils;
