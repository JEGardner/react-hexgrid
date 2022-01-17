import { useContext, useMemo } from 'react';

import HexUtils from './HexUtils';
import { LayoutParams, LayoutContext } from './Layout';
import Hex from './models/Hex';

function getPoints(
  start: Hex | undefined,
  end: Hex | undefined,
  layout: LayoutParams
) {
  if (!start || !end) {
    return '';
  }

  // Get all the intersecting hexes between start and end points
  const distance = HexUtils.distance(start, end);
  const step = 1.0 / Math.max(distance, 1);
  const intersects = Array.from({ length: distance }, (_, i) =>
    HexUtils.round(HexUtils.hexLerp(start, end, step * i))
  );

  // Construct Path points out of all the intersecting hexes (e.g. M 0,0 L 10,20, L 30,20)
  return `M${intersects
    .map((hex) => {
      const p = HexUtils.hexToPixel(hex, layout);
      return ` ${p.x},${p.y} `;
    })
    .join('L')}`;
}

interface PathProps {
  start?: Hex;
  end?: Hex;
}

function Path({ start, end }: PathProps) {
  const { layout } = useContext(LayoutContext);

  const points = useMemo(
    () => getPoints(start, end, layout),
    [start, end, layout]
  );

  return <path d={points} />;
}

export default Path;
