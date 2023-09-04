// 토큰을 로컬 스토리지에 저장하는 함수
export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem("userToken", token);
};

// 토큰을 로컬 스토리지에서 가져오는 함수
export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("userToken");
};
