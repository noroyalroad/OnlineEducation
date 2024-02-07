import React, { useEffect, useState } from "react";
import Categorylecture from "../../components/category/Categorylecture";
import { useSelector } from "react-redux";
import axios from "axios";
import { getMyOnline } from "../../_actions/lecture_action";

const Mylecture = () => {
  const [mylecture, setMylecture] = useState(null);
  const id = useSelector((state) => state.user.userData?.userId);
  useEffect(() => {
    getMyOnline(id).then((res) => {
      console.log(res);
      setMylecture(res);
    });
  }, [id]);
  return <Categorylecture pr={mylecture} />;
};

export default Mylecture;
