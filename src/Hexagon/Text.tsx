interface TextProps {
  text?: string;
  x?: string | number;
  y?: string | number;
  className?: string;
}

// TODO Text is a separate component so that it could wrap the given text inside the surrounding hexagon
function Text({ text, x, y, className }: TextProps) {
  return (
    <text x={x || 0} y={y || '0.3em'} className={className} textAnchor="middle">
      {text}
    </text>
  );
}

export default Text;
