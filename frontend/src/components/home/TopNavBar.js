import React from "react";
import {ReactComponent as Argyle} from '../../icons/argyle.svg';
import {ReactComponent as RightArrow} from '../../icons/right-arrow.svg';


export const TopNavBar = () => {
  return (
    <div className="top-navbar">
      <a href="https://argyle.com">
        <Argyle/>
      </a>

      <a href="/auth/login" className="flex-right">
        Log In
        <RightArrow/>
      </a>
    </div>
  );
}
