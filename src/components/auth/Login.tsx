import { useState } from "react";
import { Form, useNavigate, Link } from "react-router-dom";

import classes from "./Login.module.css";

import { useAppDispatch } from "../../redux/hooks";
import { authAction } from "../../redux/actions/auth-action";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHander = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;

    dispatch(authAction.logInFB(email, password));
    navigate("/");
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
            onChange={changeHandler}
            required
          />
          <label htmlFor="email">이메일</label>
        </div>

        <div className={classes["form-control"]}>
          <input
            id="password"
            type="password"
            name="password"
            onChange={changeHandler}
            required
          />
          <label htmlFor="password">비밀번호</label>
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
