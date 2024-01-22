import axios from "axios";
const api = process.env.REACT_APP_SEVER_PORT_AUTH;

export const loginUser = (dataToSubmit) => {
  const request = axios
    .post(`${api}/login`, dataToSubmit, {
      withCredentials: true,
    })
    .then((response) => response);

  return request;
};

export const registerUser = (dataToSubmit) => {
  const request = axios.post(`${api}/signup`, dataToSubmit).then((response) => response.data);

  return request;
};
