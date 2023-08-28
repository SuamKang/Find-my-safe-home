import { NavLink } from "react-router-dom";

import LogoImg from "../../UI/LogoImg";

const Logo = () => {
  return (
    <NavLink to="/">
      <div className="logo-wrapper">
        <LogoImg />
      </div>
    </NavLink>
  );
};

export default Logo;
