import LoginForm from "../components/auth/Login";
import PageContent from "../components/layouts/main/PageContent";

const LoginPage = () => {
  return (
    <PageContent>
      <LoginForm />
    </PageContent>
  );
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
