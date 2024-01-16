import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../pages/auth/Modal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const nav = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // 드랍다운 메뉴 표시 여부 변경
  };
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo" onClick={() => nav("/")}>
          MOBLE (주)모블
        </div>
        <div className="links">
          <h6 className="link" onClick={openModal}>
            로그인
          </h6>
          <Modal isOpen={isModalOpen} onClose={closeModal} />

          {/* 유저 이미지 또는 아이콘이 표시되어야 합니다. */}
          <div className="link">
            <img src="user-image.jpg" alt="User" onClick={toggleDropdown} />
            {showDropdown && (
              <div className="dropdown-menu">
                <ul>
                  <li>마이 페이지</li>
                  <li>설정</li>
                  <li>로그아웃</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
