import axios from "axios";

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
