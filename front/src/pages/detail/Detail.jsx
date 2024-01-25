import React, { useEffect, useState } from "react";
import { getLectureDetail } from "../../_actions/lecture_action";
import { useParams } from "react-router-dom";
import DetailLeture from "../../components/DetailLeture";

const api = process.env.REACT_APP_SEVER_PORT_MAIN;
const Detail = () => {
  const [data, setData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getLectureDetail(api, id)
      .then((res) => {
        setData(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  return (
    <div>
      {data && <DetailLeture lecture={data} />}
      {/* <DetailLeture lecture={data} /> */}
    </div>
  );
};

export default Detail;
