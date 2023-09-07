import classes from "./BoardLanding.module.css";
import glassesWoman from "../../assets/main/glasses-woman.png";
import { Link } from "react-router-dom";

const BoardLanding = () => {
  return (
    <section id="board">
      <div className={classes.board__inner}>
        <h2 className={classes.board__title}>
          Community Board <em>자유 게시판</em>
        </h2>
        <div className={classes.board_wrap}>
          <article className={`${classes.board__item} ${classes.b1}`}>
            <span className={classes.num}>1.</span>
            <div className={classes.leftSide}>
              <img className={classes.img} src={glassesWoman} alt="img1" />
            </div>
            <div className={classes.rightSide}>
              <div>Make</div>
              <div>site compliant with</div>
              <div>react.js</div>
              <h3 className={classes.title}>리액트를 이용한 사이트 제작</h3>
              <div className={classes.btn}>
                <Link to="#">code</Link>
              </div>
            </div>
          </article>
          <article className={`${classes.board__item} ${classes.b2}`}>
            <span className={classes.num}>2.</span>
            <div className={classes.leftSide}>
              <div>Make</div>
              <div>site compliant with</div>
              <div>react.js</div>
              <h3 className={classes.title}>리액트를 이용한 사이트 제작</h3>
              <div className={classes.btn}>
                <Link to="#">code</Link>
              </div>
            </div>
            <div className={classes.rightSide}>
              <img className={classes.img} src="" alt="img2" />
            </div>
          </article>
          <article className={`${classes.board__item} ${classes.b3}`}>
            <span className={classes.num}>3.</span>
            <div className={classes.leftSide}>
              <img className={classes.img} src="" alt="img3" />
            </div>
            <div className={classes.rightSide}>
              <div>Make</div>
              <div>site compliant with</div>
              <div>react.js</div>
              <h3 className={classes.title}>리액트를 이용한 사이트 제작</h3>
              <div className={classes.btn}>
                <Link to="#">code</Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default BoardLanding;
