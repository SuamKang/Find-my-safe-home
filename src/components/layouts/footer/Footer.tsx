import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

import { BsGithub } from "react-icons/bs";
import { SiVelog } from "react-icons/si";
import { SiTistory } from "react-icons/si";

const Footer = () => {
  return (
    <footer className={classes.container}>
      <div className={classes.topBox}>
        <div className={classes.topLeft}>
          <h2>Find My Safe Home</h2>
          <p>
            안전하지 못한 내집을 마련할 수 있도록 체크하며 국내 부동산 소식 및
            커뮤니티를 통한 안전한 내 집 구하기 서비스 입니다.
          </p>
          <div className=""></div>
        </div>
        <div className={classes.topRight}>
          <div>
            <h3>Use Stack</h3>
            <ul className={classes["use-stack"]}>
              <li>ReactJS</li>
              <li>Redux Toolkit</li>
              <li>TypeScript</li>
              <li>Firebase</li>
              <li>Vite</li>
            </ul>
          </div>
          <ul className={classes.link}>
            <li>
              <Link to="https://github.com/SuamKang">
                <BsGithub size="33" />
              </Link>
            </li>
            <li>
              <Link to="https://velog.io/@ksa199653">
                <SiVelog size="33" />
              </Link>
            </li>
            <li>
              <Link to="https://suam148.tistory.com/">
                <SiTistory size="33" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.bottomBox}>
        <p>
          <span>2023</span>" ©"
          <Link to="/">FMSH</Link>&nbsp;
          <span>All Rights Reserved.</span>
        </p>
        <p>이 사이트는 vite를 사용해 제작하였습니다.</p>
      </div>
    </footer>
  );
};

export default Footer;
