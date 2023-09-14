import { redirect } from "react-router-dom";
import { checkRefreshToken } from "../redux/actions/auth-action";
import { apiKey } from "./firebase";

const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;

// 토큰을 세션 스토리지에 저장하는 함수
export const saveTokenToSessionStorage = (token: string) => {
  sessionStorage.setItem(_session_key, token);
};

// 토큰을 세션 스토리지에서 가져오는 함수
export const getTokenFromSessionStorage = () => {
  const getToken = sessionStorage.getItem(_session_key);
  if (!getToken) {
    checkRefreshToken();
  }
  // console.log(getToken);
  return getToken;
};

// 토큰을 세션 스토리지에서 지우는 함수
export const removeTokenFromSessionStorage = () => {
  sessionStorage.removeItem(_session_key);
};

// 토큰 불러오는 함수 -> 라우팅 하기위함
export function tokenLoader() {
  return getTokenFromSessionStorage();
}

// 토큰 불러오는 함수 -> 라우팅 하기위함 -> 회원인 경우에만 동작해야하는 페이지/컴포넌트를 위한 함수
export function checkAuthLoader() {
  const token = getTokenFromSessionStorage();

  if (!token) {
    return redirect("/login");
  }

  return null; // loader는  반드시 null 또는 기타 다른 값을 리턴해야 한다.
}
