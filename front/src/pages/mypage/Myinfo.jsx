import React, { useEffect, useRef, useState } from "react";
import "./mypage.scss";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import ava from "../../assets/pers.jpg";
import { auth, change } from "../../_actions/user_action";
import { useDispatch, useSelector } from "react-redux";

const Myinfo = ({ info }) => {
  const selefile = useRef();

  const user = useSelector((state) => state.user.userData);

  const name = user?.name;
  console.log(name);
  const [img, setImg] = useState(null);

  console.log(img);

  const [userinfo, setuserinfo] = useState({
    name: user?.name,
    nickname: user?.nickname,
    imgpath: user?.profile_image,
    bio: user?.bio,
  });
  const dispath = useDispatch();

  useEffect(() => {
    setuserinfo({
      name: user?.name,
      nickname: user?.nickname,
      imgpath: user?.profile_image,
      bio: user?.bio,
    });
  }, [user]);

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
    data.append("userId", user?.userId);

    change(data)
      .then((res) => {
        // console.log(res);

        dispath(auth()).then((response) => {
          window.location.reload();
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .then((res) => {});

    console.log(data.get("img"));
    console.log(data.get("name"));
    console.log(data.get("nickname"));
    console.log(data.get("bio"));
  };
  return (
    <>
      <div className="user-info">
        <Avatar alt="Remy Sharp" src={userinfo.imgpath ? userinfo?.imgpath : ava} sx={{ width: 100, height: 100 }} onClick={() => selefile.current.click()} />
        {/* <Avatar alt="Remy Sharp" src={`http://localhost:4000/api/auth/${user?.profile_image}`} /> */}
        <input
          type="file"
          ref={selefile}
          style={{ display: "none" }}
          onChange={(e) => {
            console.log(e.target.files[0]);
            setImg(e.target.files[0]);
            setuserinfo({ ...userinfo, imgpath: e.target.files[0] });

            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
              // setImgpath(reader.result);
              setuserinfo({ ...userinfo, imgpath: reader.result });
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
