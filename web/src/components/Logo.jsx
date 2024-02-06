import * as React from 'react';
const SvgComponent = (props) => (
  <svg
	xmlns="http://www.w3.org/2000/svg"
	width={834}
	height={285}
	fill="none"
	{...props}
  >
    <g clipPath="url(#a)">
      <path
	fill="#709094"
	fillOpacity={0.3}
	d="M687.173 235.823V156.3h122.466v-41.754H687.173V42.577h144.222V0H164.746v170.996c0 44.5-20.251 69.634-57.88 69.634-37.629 0-57.47-24.997-57.47-69.634V0H0v176.902c0 66.887 42.418 107.404 107.003 107.404h726.308v-48.483H687.173Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h833.311v284.306H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
