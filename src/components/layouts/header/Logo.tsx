import { NavLink } from "react-router-dom";

import LogoImg from "../../UI/LogoImg";

const Logo = () => {
  return (
    <NavLink to="/">
      <LogoImg />
    </NavLink>
  );
};

export default Logo;
