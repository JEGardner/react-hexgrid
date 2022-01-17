import Point from './models/Point';

export interface PatternProps {
  id: string;
  link: string;
  size?: Point;
}

function Pattern({ id, link, size = new Point(10, 10) }: PatternProps) {
  return (
    <defs>
      <pattern
        id={id}
        patternUnits="objectBoundingBox"
        x={0}
        y={0}
        width={size.x}
        height={size.y}
      >
        <image
          xlinkHref={link}
          x={0}
          y={0}
          width={size.x * 2}
          height={size.y * 2}
        />
      </pattern>
    </defs>
  );
}

export default Pattern;
