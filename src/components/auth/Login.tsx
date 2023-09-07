import { useState } from "react";
import { Form, useNavigate, Link } from "react-router-dom";

import { emailCheck, passwordCheck } from "../../shared/validatioin";
import { useAppDispatch } from "../../redux/hooks";
import { authAction } from "../../redux/actions/auth-action";
import { errorMessage } from "../../shared/validatioin";

import classes from "./Login.module.css";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorData, setErrorData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

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
        case "email":
          result = emailCheck(value) ? "" : "invalidEmail";
          break;
        case "password":
          result = passwordCheck(value) ? "" : "invalidPw";
          break;
        default:
          return;
      }
    }
    //에러 데이터에 각각 부여된 유효성 검증후 데이터 업데이트
    setErrorData((prev) => ({ ...prev, [inputName]: result }));
  };

  const submitHander = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;

    if (formData.email === "" && formData.password === "") {
      return alert("양식을 입력하세요!");
    }

    if (
      errorData["email"] !== "invalidEmail" &&
      errorData["password"] !== "invalidPw"
    ) {
      dispatch(authAction.logInFB(email, password));
      navigate("/");
    }
  };

  return (
    <>
      <h1>로그인</h1>
      <Form className={classes.form} onSubmit={submitHander}>
        <div className={classes["form-control"]}>
          <input
            id="email"
            type="email"
            name="email"
            onBlur={blurHandler}
            onChange={changeHandler}
            className={
              errorData.email !== "" ? `${classes["error-input"]}` : ""
            }
            required
          />
          <label htmlFor="email">이메일</label>
          {errorData.email !== "" && (
            <p className={classes["error-text"]}>{errorMessage.invalidEmail}</p>
          )}
        </div>

        <div className={classes["form-control"]}>
          <input
            id="password"
            type="password"
            name="password"
            onBlur={blurHandler}
            onChange={changeHandler}
            className={
              errorData.password !== "" ? `${classes["error-input"]}` : ""
            }
            required
          />
          <label htmlFor="password">비밀번호</label>
          {errorData.password !== "" && (
            <p className={classes["error-text"]}>{errorMessage.invalidPw}</p>
          )}
        </div>

        <button type="submit">로그인하기</button>

        <div className={classes.action}>
          <small> 회원이 아닌가요?</small>
          <Link to="/signup">회원가입</Link>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
