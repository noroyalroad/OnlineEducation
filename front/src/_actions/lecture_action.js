import axios from "axios";
const API = process.env.REACT_APP_SEVER_PORT_MAIN;
// 카테고리별 강의
export const getLecture = (api, category, menu) => {
  const request = axios.get(`${api}/category/${category}/?order=${menu}`).then((res) => res.data);

  return request;
};

// main page default
export const maindefault = (api2) => {
  const request = axios.get(`${api2}`).then((res) => res.data);

  return request;
};

// main popular

export const mainpopular = (api2) => {
  const request = axios.get(`${api2}/hotlist`).then((res) => res.data);

  return request;
};

// search

export const search = (api2, search) => {
  const request = axios.get(`${api2}/search/?title=${search}`).then((res) => res.data);

  return request;
};

// 강의상세페이지

export const getLectureDetail = (api, id) => {
  const request = axios.get(`${api}/lectures/detail/${id}`).then((res) => res.data);

  return request;
};

//결제 여부

export const getPayment = (api, id, userid) => {
  const request = axios.get(`${api}/lectures/paymentstatus/?UserId=${userid}&LectureId=${id}`).then((res) => res.data);

  return request;
};
//수강 신청

export const enroll = (data) => {
  const request = axios.post(`${API}/lectures/enroll`, data).then((res) => res.data);

  return request;
};

// 결제

export const paymentbefore = (data) => {
  const request = axios.post(`${API}/lectures/payment`, data).then((res) => res.data);

  return request;
};

export const paymentcomplete = (data) => {
  const headers = {
    "Content-Type": "application/json",

    // 여기에 추가적인 헤더를 필요에 따라 추가할 수 있습니다.
  };
  const request = axios.post(`${API}/auth/payment/complete`, data, { headers }).then((res) => res.data);

  return request;
};

// 수강 중인 강의

export const getMyOnline = (id) => {
  const request = axios.get(`${API}/lectures/course/?UserID=${id}`).then((res) => res.data);

  return request;
};
