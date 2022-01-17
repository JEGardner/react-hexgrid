import HexUtils from './HexUtils';
import Hex from './models/Hex';

function ring(center: Hex, mapRadius: number) {
  const hexes: Hex[] = [];
  let hex = HexUtils.add(
    center,
    HexUtils.multiply(HexUtils.direction(4), mapRadius)
  );

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < mapRadius; j++) {
      hexes.push(hex);
      hex = HexUtils.neighbour(hex, i);
    }
  }

  return hexes;
}

function spiral(center: Hex, mapRadius: number) {
  let results = [center];

  for (let k = 1; k <= mapRadius; k++) {
    const temp = ring(center, k);
    results = results.concat(temp);
  }

  return results;
}

function parallelogram(q1: number, q2: number, r1: number, r2: number) {
  const hexes = [];

  for (let q = q1; q <= q2; q++) {
    for (let r = r1; r <= r2; r++) {
      hexes.push(new Hex(q, r, -q - r));
    }
  }

  return hexes;
}

function triangle(mapSize: number) {
  const hexes = [];

  for (let q = 0; q <= mapSize; q++) {
    for (let r = 0; r <= mapSize - q; r++) {
      hexes.push(new Hex(q, r, -q - r));
    }
  }

  return hexes;
}

function hexagon(mapRadius: number) {
  const hexes = [];

  for (let q = -mapRadius; q <= mapRadius; q++) {
    const r1 = Math.max(-mapRadius, -q - mapRadius);
    const r2 = Math.min(mapRadius, -q + mapRadius);

    for (let r = r1; r <= r2; r++) {
      hexes.push(new Hex(q, r, -q - r));
    }
  }

  return hexes;
}

function rectangle(mapWidth: number, mapHeight: number) {
  const hexes = [];

  for (let r = 0; r < mapHeight; r++) {
    const offset = Math.floor(r / 2); // or r>>1

    for (let q = -offset; q < mapWidth - offset; q++) {
      hexes.push(new Hex(q, r, -q - r));
    }
  }

  return hexes;
}

function orientedRectangle(mapWidth: number, mapHeight: number) {
  const hexes = [];

  for (let q = 0; q < mapWidth; q++) {
    const offset = Math.floor(q / 2); // or q>>1

    for (let r = -offset; r < mapHeight - offset; r++) {
      hexes.push(new Hex(q, r, -q - r));
    }
  }

  return hexes;
}

const GridGenerator = {
  ring,
  spiral,
  parallelogram,
  triangle,
  hexagon,
  rectangle,
  orientedRectangle,
};

export default GridGenerator;
