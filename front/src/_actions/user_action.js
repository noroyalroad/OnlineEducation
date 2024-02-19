import axios from "axios";
import { AUTH_USER, LOGIN_USER } from "./types";
const api = process.env.REACT_APP_SEVER_PORT_AUTH;
const apimain = process.env.REACT_APP_SEVER_PORT_MAIN;

export const loginUser = (dataToSubmit) => {
  const request = axios
    .post(`${api}/login`, dataToSubmit, {
      withCredentials: true,
    })
    .then((response) => response);

  return {
    type: LOGIN_USER,
    payload: request,
  };
};

export const registerUser = (dataToSubmit) => {
  const request = axios.post(`${api}/signup`, dataToSubmit).then((response) => response.data);

  return request;
};

export const logoutUser = () => {
  const request = axios
    .get(`${api}/logout`, {
      withCredentials: true,
    })
    .then((response) => response.data);

  return request;
};

export const auth = () => {
  const request = axios
    .get(`${api}/userinfo`, {
      withCredentials: true,
    })
    .then((response) => response.data);

  console.log("요청");

  return {
    type: AUTH_USER,
    payload: request,
  };
};

export const change = (dataToSubmit) => {
  const request = axios.post(`${api}/mypage/update`, dataToSubmit, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }).then((response) => response.data);

  return request;
};

export const kakao = (dataToSubmit) => {
  const request = axios.post(`${api}/kakaologin`, dataToSubmit, { withCredentials: true }).then((response) => response.data);

  return request;
};
export const google = () => {
  const request = axios.get(`${api}/googlelogin`, { withCredentials: true }).then((response) => response.data);

  return request;
};

export const emailcheck = (dataToSubmit) => {
  const request = axios.post(`${apimain}/mail`, dataToSubmit).then((response) => response.data);

  return request;
};

export const uniquenickname = (dataToSubmit) => {
  const request = axios.post(`${api}/nicknamecheck`, dataToSubmit).then((response) => response.data);

  return request;
};

export const uniqueemail = (dataToSubmit) => {
  const request = axios.post(`${api}/emailcheck`, dataToSubmit).then((response) => response.data);

  return request;
};
