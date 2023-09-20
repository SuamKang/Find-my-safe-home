import { Link } from "react-router-dom";

import classes from "./BoardLanding.module.css";

import glassesWoman from "/assets/main/glasses-woman.png";
import readingWoman from "/assets/main/reading-woman.png";
import dancingMan from "/assets/main/dancing-man.png";

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
              <div>자유롭게</div>
              <div>다른 유저들과</div>
              <div>본인이 알고있는 정보를 공유하세요.</div>
              <div className={classes.btn}>
                <Link to="/board">바로가기</Link>
              </div>
            </div>
          </article>
          <article className={`${classes.board__item} ${classes.b2}`}>
            <span className={classes.num}>2.</span>
            <div className={classes.leftSide}>
              <div>이미지를 등록하고</div>
              <div>글을 작성해보세요.</div>
              <div>글을 수정하고 삭제도 가능합니다.</div>
              <div className={classes.btn}>
                <Link to="/board">바로가기</Link>
              </div>
            </div>
            <div className={classes.rightSide}>
              <img className={classes.img} src={readingWoman} alt="img2" />
            </div>
          </article>
          <article className={`${classes.board__item} ${classes.b3}`}>
            <span className={classes.num}>3.</span>
            <div className={classes.leftSide}>
              <img className={classes.img} src={dancingMan} alt="img3" />
            </div>
            <div className={classes.rightSide}>
              <div>관심있는 포스트에</div>
              <div>질문이나 댓글을 달아보세요.</div>
              <div className={classes.btn}>
                <Link to="/board">바로가기</Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default BoardLanding;
