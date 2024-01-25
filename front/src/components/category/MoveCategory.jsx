import React, { useEffect, useState } from "react";
import Selectlecture from "./Select";
import Categorylecture from "./Categorylecture";
import Paging from "../paging/Paging";
import { useParams } from "react-router-dom";
import SelectBox from "../selectbox/SelectBox";
import axios from "axios";
import { getLecture } from "../../_actions/lecture_action";
const api = process.env.REACT_APP_SEVER_PORT_MAIN;
console.log(api);

const MoveCategory = () => {
  const { category } = useParams();
  const [menu, setmenu] = useState(1); // 1: 최신순, 0: 인기순
  const [data, setdata] = useState([]);

  console.log(menu);

  useEffect(() => {
    getLecture(api, category, menu)
      .then((res) => {
        console.log(res);
        setdata(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category, menu]);

  return (
    <div className="movecategory">
      <div className="header">
        <h2 className="cate">{category}</h2>
        <div className="selectbox">
          <SelectBox menu={menu} setmenu={setmenu} />
        </div>
      </div>

      <hr></hr>
      <Categorylecture pr={data} />
      <Paging />
    </div>
  );
};

export default MoveCategory;
