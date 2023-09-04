export const emailCheck = (email: string) => {
  const reg =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  return reg.test(email);
};

export const passwordCheck = (pwd: string) => {
  const reg = /^[a-zA-Z0-9]{8,20}$/;
  return reg.test(pwd);
};

export const userNameCheck = (name: string) => {
  const reg = /^[가-힣a-zA-Z0-9]{2,8}$/;
  return reg.test(name);
};

export const errorMessage = {
  required: "필수 정보입니다.",
  invalidEmail: "이메일을 올바르게 입력해주세요.",
  invalidPw: "8~20자 영문 대 소문자, 숫자만 사용 가능합니다.",
  invalidConfirmPw: "비밀번호가 일치하지 않습니다.",
  invalidUserName: "2~8자의 숫자, 한글, 영문 대 소문자만 사용 가능합니다.",
};
