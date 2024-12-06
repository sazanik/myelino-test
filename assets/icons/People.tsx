import Svg, { Path, SvgProps } from 'react-native-svg';

const People = (props: SvgProps) => (
  <Svg width={12} height={12} fill="none" {...props}>
    <Path
      fill="#fff"
      fillOpacity={0.7}
      d="M1 11a4 4 0 1 1 8 0H8a3 3 0 0 0-6 0H1Zm4-4.5a3 3 0 1 1 0-6 3 3 0 1 1 0 6Zm0-1a2 2 0 1 0 .001-3.999A2 2 0 0 0 5 5.5Zm4.142 1.851A4 4 0 0 1 11.5 11h-1a3 3 0 0 0-1.769-2.736l.41-.913Zm-.344-5.644A2.75 2.75 0 0 1 8 6.989V5.982a1.75 1.75 0 0 0 .52-3.304l.278-.971Z"
    />
  </Svg>
);

export default People;
