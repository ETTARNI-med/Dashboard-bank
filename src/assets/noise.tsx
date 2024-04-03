import * as React from "react";
interface Props {
  className: string;
  width?: string | number;
  height?: string | number;
}
const Noise = ({ className, width = 300, height = 300 }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={width}
    height={height}
    className={className}
  >
    <filter id="n" x={0} y={0}>
      <feTurbulence
        type="fractalNoise"
        baseFrequency={0.7}
        numOctaves={10}
        stitchTiles="stitch"
      />
    </filter>
    <rect width={300} height={300} fill="#000" />
    <rect width={300} height={300} filter="url(#n)" opacity={0.4} />
  </svg>
);
export default Noise;
