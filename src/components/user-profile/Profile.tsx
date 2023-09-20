import { useAppSelector } from "../../redux/hooks";

import classes from "./Profile.module.css";

import BasicAvatar from "/assets/main/basicAvatar.png";

import CheckList from "../check/CheckList";
const Profile = () => {
  // 유저 정보 렌더링
  const userData = useAppSelector((state) => state.auth.user);

  return (
    <main id="profile">
      <div className={classes.profile}>
        <article className={classes.profile__inner}>
          <div className={classes.profile__info}>
            <h2>내 정보</h2>
            <img
              src={userData?.photoURL ? userData.photoURL : BasicAvatar}
              alt="회원이미지"
            />
            <div className={classes.description}>
              <span>{userData?.displayName}</span>
              <span>{userData?.email}</span>
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
