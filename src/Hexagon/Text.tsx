export interface TextProps {
  children?: string;
  x?: string | number;
  y?: string | number;
  className?: string;
}

function Text({ children, x, y, className }: TextProps) {
  return (
    <text x={x || 0} y={y || '0.3em'} className={className} textAnchor="middle">
      {children}
    </text>
  );
}

export default Text;
