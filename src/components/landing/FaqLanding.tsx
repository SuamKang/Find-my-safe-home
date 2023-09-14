import { Link } from "react-router-dom";
import classes from "./FaqLanding.module.css";
import questionWoman from "../../assets/main/question-woman2.png";

const FaqLanding = () => {
  return (
    <section id="faq">
      <div className={classes.faq__inner}>
        <h2 className={classes.faq__title}>
          FAQ <em>자주묻는질문</em>
        </h2>
        <div className={classes.faq__contents}>
          <div className={classes.text}>
            <div className={classes.t1}>홈페이지 이용 가이드를 확인하고</div>
            <div className={classes.t2}>
              다른 사람들이 자주하는 질문들을 모아서 소개합니다.
            </div>
            <div className={classes.link}>
              <Link to="/faq">자주묻는질문 페이지로 가기</Link>
            </div>
          </div>
          <div className={classes.img}>
            <img src={questionWoman} alt="궁금한 여자" />
          </div>
        </div>
        <div className={classes.faq__lines} aria-hidden="true">
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

export default FaqLanding;
