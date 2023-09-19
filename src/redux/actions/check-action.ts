import { app, db } from "../../shared/firebase";
import { ref, set, remove, push, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { checkActions } from "../slices/check-slice";
import { AppDispatch } from "..";

import { checkDetailDataType } from "../slices/check-slice";

const { setCheck } = checkActions;

// Firebase Realtime Database에 대한 리스너 설정
const setupFBListeners = (dispatch: AppDispatch) => {
  const checksRef = ref(db, "/checks");

  onValue(checksRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const checksArray = Object.values(data);

      dispatch(setCheck(checksArray));
    } else {
      dispatch(setCheck([]));
    }
  });
};

// 체크리스트 Read
export const getCheckFB = () => {
  return async (dispatch: AppDispatch) => {
    setupFBListeners(dispatch);
  };
};

// 체크리스트 Write
export const addCheckFB = (newCheckText: string) => {
  return async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    const checkRef = ref(db, "/checks");

    try {
      const newCheckRef = push(checkRef); // database 고유 id생성
      const cid = newCheckRef.key; // 새로 생성된 항목 id 추출

      await set(newCheckRef, {
        userId: user?.uid,
        cid,
        text: newCheckText,
        done: false,
      });

      console.log("항목이 성공적으로 추가되었습니다.");
    } catch (error) {
      console.error("체크항목 추가 중 오류가 발생하였습니다.", error);
    }
  };
};

// 체크리스트 Edit
export const editCheckFB = (
  checkId: string | undefined,
  updatedCheckData: checkDetailDataType
) => {
  return async () => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    const { text, done } = updatedCheckData;

    const checkRef = ref(db, `/checks/${checkId}`);

    try {
      const cid = checkRef.key; // 기존 항목 id 추출
      await set(checkRef, {
        userId: user?.uid,
        cid,
        text,
        done,
      });
      console.log("해당 항목이 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("항목 수정 중 오류가 발생하였습니다.", error);
    }
  };
};

// 체크리스트 remove
export const removeCheckFB = (checkId: string | undefined) => {
  return async () => {
    const checkRef = ref(db, `/checks/${checkId}`);

    try {
      await remove(checkRef);
      console.log("해당 항목이 성공적으로 삭제되었습니다.");
    } catch (error) {
      console.error("항목 삭제 중 오류가 발생하였습니다.", error);
    }
  };
};

// 체크리스트 Toggle -> editCheckFB함수로 받는 매개변수에 done필드도 포함시켜서 먼저 시도해보기
// export const toggleCheckFB = () => {}

export const asycnCheckActions = {
  addCheckFB,
  editCheckFB,
  removeCheckFB,
  getCheckFB,
};
