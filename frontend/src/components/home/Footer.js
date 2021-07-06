import React from "react";
import {ReactComponent as Argyle} from '../../icons/argyle.svg';
import {ReactComponent as RightArrow} from '../../icons/right-arrow.svg';


export const Footer = () => {
  return (
    <div className="footer">
      <span>© Copyright Argyle Systems Inc.</span>

      <a href="https://argyle.com/legal/end-user-terms" className="flex-right">
        Legal Terms
      </a>
    </div>
  );
}
