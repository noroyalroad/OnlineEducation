import React from "react";
import Selectlecture from "./Select";
import Categorylecture from "./Categorylecture";
import Paging from "../paging/Paging";
import { useParams } from "react-router-dom";

const MoveCategory = () => {
  const { category } = useParams();

  return (
    <div className="movecategory">
      <div className="header">
        <h2 className="cate">{category}</h2>
        <div className="selectbox">
          <Selectlecture />
        </div>
      </div>

      <hr></hr>
      <Categorylecture />
      <Paging />
    </div>
  );
};

export default MoveCategory;
