import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const Searchre = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const myParam = searchParams.get("search");
  console.log(myParam);
  return (
    <div>
      {myParam} 에 대한 검색결과 화면 {}
    </div>
  );
};

export default Searchre;
