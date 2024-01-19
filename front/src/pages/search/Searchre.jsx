import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import "./search.scss";
import Categorylecture from "../../components/category/Categorylecture";
const Searchre = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = searchParams.get("search");
  console.log(myParam);
  return (
    <div className="serach">
      {myParam} 에 대한 검색결과 화면 {}
      <Categorylecture />
    </div>
  );
};

export default Searchre;
