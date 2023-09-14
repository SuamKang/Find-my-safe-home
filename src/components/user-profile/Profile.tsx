import classes from "./Profile.module.css";

import CheckList from "../check/CheckList";
const Profile = () => {
  return (
    <main id="profile">
      <div className={classes.profile}>
        <article className={classes.profile__inner}>
          <div className={classes.profile__info}>
            <h2>내 정보</h2>
            <div className={classes.profile__img}>
              <img src="" alt="회원이미지" />
            </div>
            <div className={classes.description}>
              <span>이름</span>
              <span>휴대폰</span>
              <span>이메일</span>
            </div>
            <div className={classes.profile__actions}>
              <button>수정</button>
              <button>탈퇴</button>
            </div>
          </div>
        </article>
        <article className={classes.checkList}>
          <CheckList />
        </article>
      </div>
    </main>
  );
};

export default Profile;
