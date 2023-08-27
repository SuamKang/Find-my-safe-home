import { NavLink } from "react-router-dom";

import LogoImg from "../../UI/LogoImg";

function Logo() {
  return (
    <NavLink to="/">
      <div className="logo-wrapper">
        <LogoImg />
      </div>
    </NavLink>
  );
}

export default Logo;
