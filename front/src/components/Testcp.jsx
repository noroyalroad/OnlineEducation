import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const Testcp = () => {
  const { xp } = useParams();
  console.log(xp);

  const [searchParams, setSearchParams] = useSearchParams();

  const te = searchParams.get("ccc");
  console.log(te);
  return <div>테스트테스트</div>;
};

export default Testcp;
