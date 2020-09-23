import * as React from "react";

function SvgExpand(props) {
  return (
    <svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="compress"
      className="expand_svg__svg-inline--fa expand_svg__fa-compress expand_svg__fa-w-14"
      viewBox="0 0 448 512"
      {...props}
    >
      <path d="M0 32.27v159.763h63.873v-95.73h96.338V32.27H0zm287.79 0v64.033h96.337v95.73H448V32.27H287.789zM0 320.506V480.27H160.211v-64.034H63.873v-95.73H0zm384.127 0v95.73h-96.338v64.034H448V320.506h-63.873z" />
    </svg>
  );
}

export default SvgExpand;
