import clsx from 'clsx';
import { forwardRef, useContext, useEffect, useMemo, useState } from 'react';

import HexUtils from '../HexUtils';
import { LayoutContext } from '../Layout';
import Hex from '../models/Hex';

export interface HexagonProps extends React.SVGProps<SVGGElement> {
  q: number;
  r: number;
  s: number;
  cellStyle?: React.CSSProperties;
}

const Hexagon = forwardRef<SVGGElement, HexagonProps>((props, ref) => {
  const { q, r, s, fill, className, cellStyle, children, ...otherProps } =
    props;
  const { layout, points } = useContext(LayoutContext);

  const [hex, setHex] = useState(new Hex(q, r, s));

  const pixel = useMemo(() => HexUtils.hexToPixel(hex, layout), [hex, layout]);

  const fillId = fill ? `url(#${fill})` : undefined;

  useEffect(() => {
    setHex(new Hex(q, r, s));
  }, [q, r, s]);

  return (
    <g
      {...otherProps}
      ref={ref}
      className={clsx('hexagon-group', className)}
      transform={`translate(${pixel.x}, ${pixel.y})`}
    >
      <g className="hexagon">
        <polygon points={points} fill={fillId} style={cellStyle} />

        {children}
      </g>
    </g>
  );
});

export default Hexagon;
