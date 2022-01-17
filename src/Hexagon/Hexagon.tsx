import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';

import HexUtils from '../HexUtils';
import { LayoutContext } from '../Layout';
import Hex from '../models/Hex';

interface HexagonProps {
  q: number;
  r: number;
  s: number;
  cellStyle?: React.CSSProperties;
  fill?: string;
  className?: string;
  children?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<SVGGElement>;
onMouseOver?: React.MouseEventHandler<SVGGElement>;
        onMouseLeave?: React.MouseEventHandler<SVGGElement>;
        onClick?: React.MouseEventHandler<SVGGElement>;
        onDragStart?: React.DragEventHandler<SVGGElement>;
        onDragEnd?: React.DragEventHandler<SVGGElement>;
        onDragOver?: React.DragEventHandler<SVGGElement>;
        onDrop?: React.DragEventHandler<SVGGElement>;
}

function Hexagon({
  q,
  r,
  s,
  cellStyle,
  fill,
  className,
  children,
  onMouseEnter,
  onMouseLeave,
  onMouseOver,
  onClick,
  onDrop,
  onDragOver,
  onDragEnd,
  onDragStart
}: HexagonProps) {
  const { layout, points } = useContext(LayoutContext);

  const [hex, setHex] = useState(new Hex(q, r, s));
  const [pixel, setPixel] = useState(HexUtils.hexToPixel(hex, layout)); // TODO might have to remove initializer and put in a dummy default

  const fillId = fill ? `url(#${fill})` : undefined;

  useEffect(() => {
    setHex(new Hex(q, r, s));
  }, [q, r, s]);

  useEffect(() => {
    setPixel(HexUtils.hexToPixel(hex, layout));
  }, [hex, layout]);

  return (
    <g
      className={clsx('hexagon-group', className)}
      transform={`translate(${pixel.x}, ${pixel.y})`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseOver={onMouseOver}
      onClick={onClick}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <g className="hexagon">
        <polygon points={points} fill={fillId} style={cellStyle} />
        {children}
      </g>
    </g>
  );
}

export default Hexagon;
