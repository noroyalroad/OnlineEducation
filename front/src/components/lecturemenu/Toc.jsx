import React, { useEffect, useRef, useState } from "react";
import "./lecturemenu.scss";
import { BsPlayFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPayment } from "../../_actions/lecture_action";
const api = process.env.REACT_APP_SEVER_PORT_MAIN;

const Toc = ({ toc }) => {
  const { id } = useParams();
  const pay = useSelector((state) => state.user);
  const payst = pay.userData?.userId;

  const [clickst, setclickst] = useState("N");

  useEffect(() => {
    getPayment(api, id, payst)
      .then((res) => {
        setclickst(res.PAYMENTSTATUS);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const nav = useNavigate();

  const handleClick = (video, index) => {
    if (clickst === "N" && index >= 3) return;
    console.log(video.TOCID, video.title);
    nav("/playlecture", { state: { toc: toc, title: video.title, tocid: video.TOCID, lectureid: video.LectureID } });
  };
  return (
    <div>
      <div className="video-table">
        <h2>목차</h2>
        <table>
          <thead>
            <tr>
              <th>제목</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {toc.map((video, index) => (
              <tr key={index} onClick={() => handleClick(video, index)} className={clickst === "N" && index >= 3 ? "disabled" : ""}>
                <td>{video.title}</td>
                <td></td>
                <td>
                  {(clickst === "Y" || index < 3) && (
                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                      <BsPlayFill className="play-icon" />
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Toc;
