import React from 'react';

import { CgSpinner } from 'react-icons/cg';
import './Spin.scss';

function Spin({ children, spinning }) {
  return (
    <div className="spin spinning">
      {spinning && (
        <div className="icon-wrapper">
          <div className="icon-spinning">
            <CgSpinner className="icon" />
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export default Spin;
