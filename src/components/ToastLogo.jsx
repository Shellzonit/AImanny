import * as React from 'react';
import Svg, { Rect, Ellipse } from 'react-native-svg';

const ToastLogo = ({ width = 96, height = 96 }) => (
  <Svg width={width} height={height} viewBox="0 0 96 96" fill="none">
    <Rect x="20" y="32" width="56" height="40" rx="18" fill="#FFF8E1" stroke="#C68642" strokeWidth="4" />
    <Ellipse cx="48" cy="36" rx="28" ry="12" fill="#FFF8E1" stroke="#C68642" strokeWidth="4" />
  </Svg>
);

export default ToastLogo;
