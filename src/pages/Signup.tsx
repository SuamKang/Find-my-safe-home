import SignupForm from "../components/auth/Signup";
import PageContent from "../components/layouts/main/PageContent";

const SignupPage = () => {
  return (
    <PageContent>
      <SignupForm />
    </PageContent>
  );
};

export default SignupPage;

// 입력받은 폼양식 데이터를 브라우저 api가 사용가능한 router action함수에서 로직 처리
// formData로 받은 데이터를 가지고 리덕스 signupFB 엑션생성자함수 디스패치 시켜주고싶다 -> 다만 디스패치는 라우터 엑션함수에서 못불러옴 통합이 안됨 ㅜ

//action 함수는 비동기 작업을 처리하는 동안 라우터가 화면에 보여지는 컴포넌트를 관리하며, 사용자 경험을 유지하는 데 도움이 된다.

// 근데 파이어베이스 로그인 회원가입 인증방식을 이용하려면 api주소가 있어야할텐데 발급되진 않는거같다. -> 이미 내장되어있는 auth서비스 안에서 모든 인증서비스가 이뤄지고 있어서 메소드를통해 사용자 데이터를 입력해주고 그에따른 데이터나 에러처리를 해주어야할듯!
