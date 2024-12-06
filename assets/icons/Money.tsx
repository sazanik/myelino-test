import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

const Money = (props: SvgProps) => (
  <Svg width={12} height={12} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#fff"
        fillOpacity={0.7}
        stroke="#000"
        strokeWidth={0.1}
        d="M5.4 8.35H3.95v-1.1H7.2a.35.35 0 0 0 0-.7H4.8a1.45 1.45 0 1 1 0-2.9h.65v-1.2h1.1v1.2h1.5v1.1H4.8a.35.35 0 0 0 0 .7h2.4a1.45 1.45 0 0 1 0 2.9h-.65v1.2h-1.1v-1.2H5.4Zm.6 3.6A5.95 5.95 0 1 1 6 .05a5.95 5.95 0 0 1 0 11.9Zm0-1.1a4.85 4.85 0 1 0 0-9.7 4.85 4.85 0 0 0 0 9.7Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12v12H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default Money;
