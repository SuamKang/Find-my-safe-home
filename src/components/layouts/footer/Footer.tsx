import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

import { BsGithub } from "react-icons/bs";
import { SiVelog } from "react-icons/si";
import { SiTistory } from "react-icons/si";

const Footer = () => {
  return (
    <footer className={classes.container}>
      <div className={classes.topBox}>
        <div className={classes.description}>
          <h2>안전하게 집 구하기</h2>
          <p>
            안전하지 못한 내집을 마련할 수 있도록 체크하며 국내 부동산 소식 및
            커뮤니티를 통한 안전한 내 집 구하기 서비스 입니다.
          </p>
        </div>
        <ul>
          <li>
            <Link to="#">
              <BsGithub size="33" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <SiVelog size="33" />
            </Link>
          </li>
          <li>
            <Link to="#">
              <SiTistory size="33" />
            </Link>
          </li>
        </ul>
      </div>
      <div className={classes.bottomBox}>
        <p>
          <span>Copyright</span>" ©"
          <Link to="/">FMSH</Link>
          <span>All Rights Reserved.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
