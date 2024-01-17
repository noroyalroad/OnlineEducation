import React from "react";
import Selectlecture from "./Select";
import Categorylecture from "./Categorylecture";
import Paging from "../paging/Paging";

const MoveCategory = () => {
  return (
    <div className="movecategory">
      <Selectlecture />
      <h2>카테고리</h2>
      <hr></hr>
      <Categorylecture />
      <Paging />
    </div>
  );
};

export default MoveCategory;
