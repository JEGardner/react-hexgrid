import { createContext, useMemo } from 'react';

import Orientation from './models/Orientation';
import Point from './models/Point';

const LAYOUT_FLAT = new Orientation(
  3.0 / 2.0,
  0.0,
  Math.sqrt(3.0) / 2.0,
  Math.sqrt(3.0),
  2.0 / 3.0,
  0.0,
  -1.0 / 3.0,
  Math.sqrt(3.0) / 3.0,
  0.0
);
const LAYOUT_POINTY = new Orientation(
  Math.sqrt(3.0),
  Math.sqrt(3.0) / 2.0,
  0.0,
  3.0 / 2.0,
  Math.sqrt(3.0) / 3.0,
  -1.0 / 3.0,
  0.0,
  2.0 / 3.0,
  0.5
);

function getPointOffset(corner: number, orientation: Orientation, size: Point) {
  const angle = (2.0 * Math.PI * (corner + orientation.startAngle)) / 6;
  return new Point(size.x * Math.cos(angle), size.y * Math.sin(angle));
}

function calculateCoordinates(orientation: Orientation, size: Point) {
  const center = new Point(0, 0);

  return Array.from({ length: 6 }, (_, i) => {
    const offset = getPointOffset(i, orientation, size);
    return new Point(center.x + offset.x, center.y + offset.y);
  });
}

export interface LayoutParams {
  spacing: number;
  orientation: Orientation;
  size: Point;
  origin: Point;
}

interface LayoutContextValue {
  layout: LayoutParams;
  points: string;
}

export const LayoutContext = createContext<LayoutContextValue>({
  layout: {
    spacing: 1.0,
    orientation: LAYOUT_FLAT,
    size: new Point(10, 10),
    origin: new Point(0, 0),
  },
  points: '',
});

interface LayoutProps {
  children: React.SVGProps<SVGGElement>;
  className?: string;
  flat?: boolean;
  origin?: Point;
  size?: Point;
  spacing?: number;
}

function Layout({
  children,
  className,
  flat = true,
  origin = new Point(0, 0),
  size = new Point(10, 10),
  spacing = 1.0,
}: LayoutProps) {
  const layoutContextValue = useMemo<LayoutContextValue>(() => {
    const orientation = flat ? LAYOUT_FLAT : LAYOUT_POINTY;
    const cornerCoords = calculateCoordinates(orientation, size);
    const points = cornerCoords
      .map((point) => `${point.x},${point.y}`)
      .join(' ');

    return {
      layout: {
        spacing,
        orientation,
        size,
        origin,
      },
      points,
    };
  }, [flat, size, origin, spacing]);

  return (
    <LayoutContext.Provider value={layoutContextValue}>
      <g className={className}>{children}</g>
    </LayoutContext.Provider>
  );
}

export default Layout;
