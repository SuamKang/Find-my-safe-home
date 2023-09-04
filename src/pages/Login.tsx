import LoginForm from "../components/auth/Login";

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;

// export async function action({request}) {
//   const data = await request.formData()

//   const loginData = {
//     email: data.get("email"),
//     password: data.get("password")
//   };

//   fetch()

// }
