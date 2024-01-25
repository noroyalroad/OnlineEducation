import React from "react";
import "./lecturemenu.scss";
import { BsPlayFill } from "react-icons/bs";

const Toc = ({ toc }) => {
  console.log(toc);
  const SampleVideos = [
    { title: "비디오 1", url: "https://www.example.com/video1" },
    { title: "비디오 2", url: "https://www.example.com/video2" },
    { title: "비디오 3", url: "https://www.example.com/video3" },
    { title: "비디오 4", url: "https://www.example.com/video4" },
    { title: "비디오 5", url: "https://www.example.com/video5" },
  ];
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
              <tr
                key={index}
                onClick={() => {
                  console.log(video.TOCID, video.title);
                }}
              >
                <td>{video.title}</td>
                <td></td>
                <td>
                  <a href={video.url} target="_blank" rel="noopener noreferrer">
                    <BsPlayFill className="play-icon" />
                  </a>
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
