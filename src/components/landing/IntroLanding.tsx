import classes from "./IntroLanding.module.css";
import home from "../../assets/main/home.png";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <section id="intro">
      <div className={classes.intro__inner}>
        <h1 className={classes.intro__title}>find my safe home</h1>
        <div className={classes.intro__lines} aria-hidden="true">
          <span className={classes.line}></span>
          <span className={classes.line}></span>
          <span className={classes.line}></span>
          <span className={classes.line}></span>
          <span className={classes.line}></span>
          <span className={classes.line}></span>
          <span className={classes.line}></span>
        </div>
        <div className={classes.intro__text}>
          <div className={classes.text}>
            <div>쉽고</div>
            <div>간편하게</div>
            <div>놓치지 않고 부동산 정보를 체크해 보세요.</div>
          </div>
          <div className={classes.img}>
            <img src={home} alt="home-Img" />
          </div>
          <button type="button" className={classes.loginBtn}>
            <Link to="login">체험하기</Link>
          </button>
        </div>
        <div
          className={`${classes.intro__line} ${classes.bottom}`}
          aria-hidden="true"
        >
          <span className={classes.line}></span>
          <span className={classes.line}></span>
          <span className={classes.line}></span>
          <span className={classes.line}></span>
          <span className={classes.line}></span>
          <span className={classes.line}></span>
          <span className={classes.line}></span>
        </div>
      </div>
    </section>
  );
};

export default Intro;
