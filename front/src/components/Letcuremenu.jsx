import React, { useState } from "react";

const Letcuremenu = () => {
  const [activeMenu, setActiveMenu] = useState("info");

  // 예시로 첫 번째 강의를 사용

  const showInfo = () => {
    setActiveMenu("info");
  };

  const showOutline = () => {
    setActiveMenu("outline");
  };

  const showQuestion = () => {
    setActiveMenu("question");
  };

  return (
    <div className="course-detail">
      <div className="menu">
        <button onClick={showInfo} className={activeMenu === "info" ? "active" : ""}>
          정보
        </button>
        <button onClick={showOutline} className={activeMenu === "outline" ? "active" : ""}>
          목차
        </button>
        <button onClick={showQuestion} className={activeMenu === "question" ? "active" : ""}>
          질문
        </button>
      </div>

      {activeMenu === "info" && (
        <div className="info-section">
          <h2 className="section-title">강의 정보</h2>
          <p>ㄹㄹㄹㄹㄹ</p>
        </div>
      )}

      {activeMenu === "outline" && (
        <div className="outline-section">
          <h2 className="section-title">강의 목차</h2>
          <ol>
            <li>세션 1: 시작하기</li>
            <li>세션 2: 중간 단계</li>
            <li>세션 3: 고급 주제</li>
          </ol>
        </div>
      )}

      {activeMenu === "question" && (
        <div className="question-section">
          <h2 className="section-title">질문</h2>
          <p>질문이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default Letcuremenu;
