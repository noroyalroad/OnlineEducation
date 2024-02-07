import React, { useEffect, useRef, useState } from "react";
import "./mypage.scss";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import ava from "../../assets/pers.jpg";
import { auth, change } from "../../_actions/user_action";
import { useDispatch, useSelector } from "react-redux";

const Myinfo = ({ info }) => {
  const selefile = useRef();

  console.log(info);

  const user = useSelector((state) => state.user.userData);
  const [img, setImg] = useState(null);
  const [imgpath, setImgpath] = useState(`http://localhost:4000/api/auth/${info?.profileimage}`);
  console.log(user);
  console.log(imgpath);
  console.log(img);

  const [userinfo, setuserinfo] = useState({
    name: info?.name,
    nickname: info?.nickname,
    bio: info?.bio,
    UserId: info?.userId,
  });
  const dispath = useDispatch();

  console.log(userinfo.name);

  const handleUserInfoChange = (field, value) => {
    setuserinfo((prevUserInfo) => ({
      ...prevUserInfo,
      [field]: value,
    }));
  };

  const updatehandler = () => {
    const data = new FormData();
    if (!img) {
      data.append("img", null);
    }

    for (let key in userinfo) {
      data.append(key, userinfo[key]);
    }
    data.append("img", img);

    change(data)
      .then((res) => {
        console.log(res);

        dispath(auth()).then((response) => {
          console.log(response);
        });
      })
      .catch((err) => {
        console.error(err);
      });

    console.log(data.get("img"));
    console.log(data.get("name"));
    console.log(data.get("nickname"));
    console.log(data.get("bio"));
  };
  return (
    <>
      <div className="user-info">
        <Avatar alt="Remy Sharp" src={imgpath ? imgpath : ava} sx={{ width: 100, height: 100 }} onClick={() => selefile.current.click()} />
        <input
          type="file"
          ref={selefile}
          style={{ display: "none" }}
          onChange={(e) => {
            console.log(e.target.files[0]);
            setImg(e.target.files[0]);

            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
              setImgpath(reader.result);
            };
          }}
        />
        <Button type="button" className="change" variant="contained" onClick={updatehandler}>
          변경
        </Button>
      </div>
      <form className="user-info-edit">
        <h2>사용자 정보 수정</h2>
        <label>
          이름:
          <input
            type="text"
            value={userinfo?.name}
            onChange={(e) => {
              setuserinfo({ ...userinfo, name: e.target.value });
            }}
            className="input-field" // 새로운 클래스 추가
          />
        </label>
        <br />
        <label>
          닉네임
          <input
            type="text"
            value={userinfo?.nickname}
            onChange={(e) => setuserinfo({ ...userinfo, nickname: e.target.value })}
            className="input-field" // 새로운 클래스 추가
          />
        </label>
        <br />
        <label>
          자기소개
          <input
            type="text"
            value={userinfo?.bio}
            onChange={(e) => setuserinfo({ ...userinfo, bio: e.target.value })}
            className="input-field" // 새로운 클래스 추가
          />
        </label>
      </form>
    </>
  );
};

export default Myinfo;
