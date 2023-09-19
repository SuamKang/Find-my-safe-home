import { ChangeEvent, FormEvent, useState } from "react";
import { asycnCheckActions } from "../../redux/actions/check-action";
import { useAppDispatch } from "../../redux/hooks";
import { checkDataType } from "../../redux/slices/check-slice";
import classes from "./CheckItem.module.css";

import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";

const CheckItem = ({ cid, text, done }: checkDataType) => {
  const dispatch = useAppDispatch();

  // 수정 버튼 클릭 여부 상태관리
  const [isReadyChangeText, setIsReadyChangeText] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);
  const [updatedDone, setUpdatedDone] = useState(done);

  const changeDoneHanlder = () => {
    setUpdatedDone(!updatedDone);
  };

  // 수정 버튼 클릭시 인풋창 변경 핸들러
  const openEditTextHandler = () => {
    setIsReadyChangeText((prev) => !prev);
  };

  // 수정텍스트 체인지 핸들러
  const changeTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatedText(event.target.value);
  };

  // done 속성 토글 이벤트 헨들러
  const editDoneHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("done 헨들러 작동시작");

    const updatedValue = {
      text,
      done: !updatedDone,
    };
    dispatch(asycnCheckActions.editCheckFB(cid, updatedValue));
    setUpdatedDone(!updatedDone);
  };

  // text 속성 수정 이벤트 헨들러
  const editTextHandler = () => {
    const updatedValue = {
      text: updatedText,
      done: done,
    };
    // 수정할 인풋에 텍스트가 기존텍스트와 달라야만 동작하게
    if (text !== updatedText) {
      dispatch(asycnCheckActions.editCheckFB(cid, updatedValue));
      setUpdatedText(updatedText);
      setIsReadyChangeText(false);
    } else {
      alert("변경하지 않았을땐 수정되지 않습니다.");
    }
  };

  // 항목 삭제 이벤트
  const removeHandler = () => {
    dispatch(asycnCheckActions.removeCheckFB(cid));
  };

  return (
    <li className={classes.item}>
      {updatedDone ? (
        <RiCheckboxCircleFill
          className={classes.checkbox}
          onChange={changeDoneHanlder}
          onClick={editDoneHandler}
        />
      ) : (
        <RiCheckboxBlankCircleLine
          className={classes.checkbox}
          onChange={changeDoneHanlder}
          onClick={editDoneHandler}
        />
      )}

      <div className={classes["text-actions"]}>
        <>
          {isReadyChangeText ? (
            <div className={classes["text-update"]}>
              <input
                type="text"
                name="text"
                value={updatedText}
                onChange={changeTextHandler}
              />
              <button type="button" onClick={editTextHandler}>
                수정
              </button>
            </div>
          ) : (
            <>
              {updatedDone ? (
                <p className={`${classes.value} ${classes["value-done"]}`}>
                  {text}
                </p>
              ) : (
                <p className={classes.value}>{text}</p>
              )}
            </>
          )}
        </>
      </div>
      <div className={classes.actions}>
        <div id="edit" onClick={openEditTextHandler}>
          <AiOutlineEdit className={classes.icon} size="33" />
          {/* 수정버튼 */}
        </div>
        <div id="remove" onClick={removeHandler}>
          <AiOutlineDelete className={classes.icon} size="33" />
          {/* 삭제버튼 */}
        </div>
      </div>
    </li>
  );
};

export default CheckItem;

// 기능 플로우 정리

// 1. 수정 버튼 클릭(onClick={editHanlder})시 p태그 자리 input창으로 변경 후 autoFocus 되게 하기
// 2. 수정할 텍스트 입력 후, 수정버튼 클릭시 디스패치 되어 텍스트 변경되게
