import { FirebaseError } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth"; // 파이어베이스 인증에 필요한 메서드들

import {
  saveTokenToSessionStorage,
  getTokenFromSessionStorage,
  removeTokenFromSessionStorage,
} from "../../shared/token";
import { authActions } from "../slices/auth-slice";
import { app } from "../../shared/firebase";
import { AppDispatch } from "../index"; // type

const { setUser, logout } = authActions;

// 회원가입 액션 생성자 함수
export const signUpFB = (email: string, password: string, userName: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const auth = getAuth(app);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // 사용자가 로그인 한 경우에만 updateProfile호출
      if (user) {
        if (!user.displayName) {
          await updateProfile(user, {
            displayName: userName,
            photoURL: null,
          });
        }

        const { email, displayName, uid, photoURL } = user;
        const userInfo = { email, displayName, uid, photoURL };
        dispatch(setUser(userInfo));
      }

      // firebase auth에서 발생하는 에러는 'FirebaseError'타입을 가지며 'code'와 'message' 속성을 포함한다. => narrowing해주어야함
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };
};

// 로그인 액션 생성자 함수
export const logInFB = (enteredEmail: string, enteredPassword: string) => {
  return async (dispatch: AppDispatch) => {
    const auth = getAuth(app);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      const user = userCredential.user;
      console.log(user); // displayName, email, metadata, uid, etc...

      // 파이어베이스로부터 토큰 받기
      const idToken = await user.getIdToken();
      // console.log(idToken);
      saveTokenToSessionStorage(idToken);

      // 회원가입에서와 같이 user 데이터를 필요한 형태로 추출해준다
      const { email, displayName, uid } = user;
      const userInfo = { email, displayName, uid };

      dispatch(setUser(userInfo));
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    }
  };
};

// 로그인 상태 체크 엑션 생성자 함수
export const logInCheckFB = () => {
  return async (dispatch: AppDispatch) => {
    // console.log("로그인 체크 엑션 함수 호출됨");
    const auth = getAuth(app);

    await setPersistence(auth, browserSessionPersistence);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("사용자 정보 확인", user);
        const { email, displayName, uid } = user;
        const userInfo = { email, displayName, uid };

        dispatch(setUser(userInfo));
      } else {
        console.log("로그아웃 상태입니다.");
        dispatch(logout());
      }
    });
  };
};

// 토큰 유효기간 검사 생성자
export const checkRefreshToken = () => {
  return async (dispatch: AppDispatch) => {
    const idToken = getTokenFromSessionStorage();

    if (idToken) {
      // Firebase에서 현재 유효한 토큰 확인하기
      try {
        const auth = getAuth(app);
        const user = auth.currentUser; // 현재 로그인한 유저정보

        if (user) {
          const refreshedToken = await user.getIdToken(true);

          // 갱신된 토큰을 로컬 스토리지에 저장하기
          saveTokenToSessionStorage(refreshedToken);

          // 갱신된 토큰으로 사용자 정보 업데이트하기
          dispatch(setUser(user));
        }
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        }
      }
    }
  };
};

// 로그아웃 액션 생성자 함수
const logOutFB = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const auth = getAuth(app);
      await signOut(auth);

      dispatch(logout());
      removeTokenFromSessionStorage();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
};

// 회원 정보 수정 엑션 생성자 함수
// 마이페이지에서 사용자 수정하기할때, 이름,이메일, 비밀번호, 사진을 수정가능하게 하는 함수를 구성해야함.

// export const userProfileUpdatedFB = () => {}

// 비동기 엑션을 정의한 엑션 출력
export const asyncAuthActions = {
  signUpFB,
  logInFB,
  checkRefreshToken,
  logInCheckFB,
  logOutFB,
};
