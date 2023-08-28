import { Form } from "react-router-dom";

import classes from "./Login.module.css";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <>
      <h1>로그인</h1>
      <Form className={classes.form}>
        <div className={classes["form-control"]}>
          <input id="email" type="email" required />
          <label htmlFor="email">email</label>
        </div>

        <div className={classes["form-control"]}>
          <input id="password" type="password" required />
          <label htmlFor="password">password</label>
        </div>

        <button>로그인 하기</button>

        <div className={classes.action}>
          <small> 회원이 아닌가요?</small>
          <Link to="signup">회원가입</Link>
        </div>
      </Form>
    </>
  );
};

export default Login;
