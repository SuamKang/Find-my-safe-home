import { app } from "../../shared/firebase";
import { FirebaseError } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth"; // 파이어베이스 인증에 필요한 메서드들

import { AppDispatch } from "../index"; // type
import {
  saveTokenToSessionStorage,
  getTokenFromSessionStorage,
  removeTokenFromSessionStorage,
} from "../../shared/token";
import { authActions } from "../slices/auth-slice";
import { apiKey } from "../../shared/firebase";

const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

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
          });
        }
        console.log(user.displayName);

        // A non-serializable value was detected in an action, in the path: `payload`. Value:  이 에러는
        // 리덕스 툴킷에서 엑션객체를 만들 때, "비직렬화 가능한(non-serializable) 값"이 포함되어 있을 때 발생한다. Redux는 상태와 액션을 직렬화하고 역직렬화할 수 있어야 하며, 비직렬화 가능한 값이 액션 객체에 포함되면 Redux는 오류를 낸다.
        // 따라서 현재 setUser생성자에 파이어베이스로부터 받아온 user 데이터를 그냥 넣지 않고 비직렬화 가능한 값을 제거하여 넣어주어야한다.

        // 여기에 user 데이터를 필요한 형태로 추출해준다

        const { email, displayName, uid } = user;
        const userInfo = { email, displayName, uid };
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
      //browserSessionPersistence메서드로 현재 세션에 대해서만 사용자의 인증 상태를 유지하기 위해 지속성을 으로 설정.
      await setPersistence(auth, browserLocalPersistence);
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
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // payload: {
        //   user_name: user.displayName,
        //   user_profile: "",
        //   id: user.email,
        //   uid: user.uid,
        // },
        const { email, displayName, uid } = user;
        const userInfo = { email, displayName, uid };

        dispatch(setUser(userInfo));
      } else {
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
      removeTokenFromSessionStorage(_session_key);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
};

// 비동기 엑션을 정의한 엑션 출력
export const authAction = {
  signUpFB,
  logInFB,
  checkRefreshToken,
  logInCheckFB,
  logOutFB,
};

// 비동기 엑션 생성자 함수 구현 방법 두가지

// 1. createAsyncThunk 사용:

// createAsyncThunk를 사용하면 비동기 액션을 생성하는 것이 간단하고 명시적입니다. 이를 통해 리덕스 스토어의 상태를 갱신하고 에러 처리를 수행하는 데 필요한 기능이 자동으로 생성됩니다.
// createAsyncThunk를 사용하면 액션의 이름, 상태 변경 및 에러 처리가 자동으로 관리되므로 코드가 깔끔하고 일관성 있게 유지됩니다.
// 비동기 작업의 성공, 실패 및 대기 상태를 명확하게 처리하며, 비동기 작업에 관련된 모든 코드를 한 곳에서 관리할 수 있습니다.

// 2. thunk 함수 사용:

// thunk 함수를 사용하면 더 많은 제어권을 가질 수 있습니다. 직접 비동기 로직을 작성하고 dispatch를 수동으로 호출하여 상태를 변경할 수 있습니다.
// 더 복잡한 비동기 로직을 처리해야 할 때 thunk 함수를 사용하는 것이 유용할 수 있습니다.
// 하지만 이 방법은 코드의 일관성을 유지하기 어려울 수 있으며, 일부 작업을 수동으로 처리해야 합니다. 또한 에러 처리 및 비동기 작업 상태 관리를 명확하게 처리해야 합니다.

// 따라서 선택은 프로젝트의 요구 사항과 개발자의 선호도에 따라 다를 수 있습니다. 간단한 비동기 작업에는 createAsyncThunk가 적합하며, 복잡한 작업이나 특수한 경우에는 thunk 함수를 사용할 수 있습니다. 중요한 것은 코드의 가독성과 유지 보수성을 고려하여 어떤 방법을 선택하느냐가 중요합니다. 일반적으로는 createAsyncThunk를 사용하는 것이 더 권장되는 방식이지만, 특정 상황에서 thunk 함수를 사용해야 할 수도 있습니다.

// // firebase realtime database에 추가 정보 저장
// const db = getDatabase();
// const userRef = ref(db, "user/" + user.uid);
// const userData = {
//   userName,
//   email,
//   // 비밀번호는 클라이언트단에서 관리하면 보안상 문제가 있음
// };

// await set(userRef, userData);
