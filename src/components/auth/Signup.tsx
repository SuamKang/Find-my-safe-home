import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";

import classes from "./Signup.module.css";
import { useAppDispatch } from "../../redux/hooks";
import { authAction } from "../../redux/actions/auth-action"; // 비동기 엑션
import {
  userNameCheck,
  emailCheck,
  passwordCheck,
} from "../../shared/validatioin";
import { errorMessage } from "../../shared/validatioin";

// 객체안의 키값의 타입을 설정하고 각각의 키값의 타입을 접근할땐 keyof 키워드를 붙여줘야한다.
type FormData = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); //v6 버전부턴 useHistory 지원 안하고 useNavigate으로 교체됨

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorData, setErrorData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // 인풋 체인지 헨들러 (event객체의 타입 정의해주기)
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  // 오류 메시지 헨들러
  const blurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkValidHandler(event.target.name as keyof FormData);
  };

  // 인풋 유효성 체크(객체안 인풋의 name프로퍼티키에 따른 유효성 처리)
  const checkValidHandler = (inputName: keyof FormData) => {
    let result: string | undefined;
    const value = formData[inputName]; // 키값 설정

    if (value.length === 0) {
      result;
    } else {
      switch (inputName) {
        case "userName":
          result = userNameCheck(value) ? "" : "invalidUserName";
          break;
        case "email":
          result = emailCheck(value) ? "" : "invalidEmail";
          break;
        case "password":
          result = passwordCheck(value) ? "" : "invalidPw";
          checkValidHandler("confirmPassword");
          break;
        case "confirmPassword":
          result = value === formData["password"] ? "" : "invalidConfirmPW";
          break;
        default:
          return;
      }
    }
    //에러 데이터에 각각 부여된 유효성 검증후 데이터 업데이트
    setErrorData((prev) => ({ ...prev, [inputName]: result }));
  };

  // 입력양식 제출 핸들러
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { userName, email, password } = formData;

    if (
      formData.userName === "" &&
      formData.email === "" &&
      formData.password === "" &&
      formData.confirmPassword === ""
    ) {
      return alert("양식을 입력하세요!");
    }
    // 유효한 녀석들만 최종 디스패치
    if (
      !errorData["userName"] &&
      !errorData["email"] &&
      !errorData["password"] &&
      !errorData["confirmPassword"]
    ) {
      dispatch(authAction.signUpFB(email, password, userName));
      navigate("/login"); // 리덕스에서가 아닌 컴포넌트내부에서 리디렉션
    }
  };

  return (
    <>
      <h1>회원가입</h1>
      <Form className={classes.form} onSubmit={submitHandler}>
        <div className={classes["form-control"]}>
          <input
            id="name"
            type="text"
            name="userName"
            onBlur={blurHandler}
            onChange={changeHandler}
            className={errorData.userName ? `${classes["error-input"]}` : ""}
            required
          />
          <label htmlFor="name">이름</label>
          {errorData.userName && (
            <p className={classes["error-text"]}>
              {errorMessage.invalidUserName}
            </p>
          )}
        </div>

        <div className={classes["form-control"]}>
          <input
            type="email"
            id="email"
            name="email"
            onBlur={blurHandler}
            onChange={changeHandler}
            className={errorData.email ? `${classes["error-input"]}` : ""}
            required
          />
          <label htmlFor="email">이메일</label>
          {errorData.email && (
            <p className={classes["error-text"]}>{errorMessage.invalidEmail}</p>
          )}
        </div>

        <div className={classes["form-control"]}>
          <input
            type="password"
            id="password"
            name="password"
            onBlur={blurHandler}
            onChange={changeHandler}
            className={errorData.password ? `${classes["error-input"]}` : ""}
            required
          />
          <label htmlFor="password">비밀번호</label>
          {errorData.password && (
            <p className={classes["error-text"]}>{errorMessage.invalidPw}</p>
          )}
        </div>

        <div className={classes["form-control"]}>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onBlur={blurHandler}
            onChange={changeHandler}
            className={
              errorData.confirmPassword ? `${classes["error-input"]}` : ""
            }
            required
          />
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          {errorData.confirmPassword && (
            <p className={classes["error-text"]}>
              {errorMessage.invalidConfirmPw}
            </p>
          )}
        </div>

        <button type="submit">회원가입하기</button>

        <div className={classes.action}>
          <small>이미 회원인가요?</small>
          <Link to="/login">로그인</Link>
        </div>
      </Form>
    </>
  );
};

export default SignupForm;

// 1. 먼저 회원가입 페이지 파일에서 회원가입 양식을 브라우저단에서 받아 라우팅 처리하는 action함수를 생성한다.
// 2. 그리고 해당 action함수에서 리턴된 데이터 객체를 양식컴포넌트로 useActionData로 불러와 해당 데이터에 따른 에러처리를 진행시키거나 해당 데이터에 뭐가 들어있는지 확인후 폼안에서
//이벤트를 걸어 디스패치 하여 비동기 엑션(thunk) 요청 걸어주자.
