import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "./search.scss";
import Categorylecture from "../../components/category/Categorylecture";
import { search } from "../../_actions/lecture_action";
const api = process.env.REACT_APP_SEVER_PORT_MAIN;
const Searchre = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = searchParams.get("search");
  console.log(myParam);

  const [data, setdata] = useState([]);

  useEffect(() => {
    search(api, myParam)
      .then((res) => {
        setdata(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [myParam]);
  return (
    <div className="serach">
      {myParam} 에 대한 검색결과 화면 {}
      <Categorylecture pr={data} />
    </div>
  );
};

export default Searchre;
