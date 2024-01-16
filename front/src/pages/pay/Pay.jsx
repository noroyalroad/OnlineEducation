import React, { useState } from "react";
import "../pay/paypage.scss";

const PaymentPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = () => {
    // 실제 결제 처리 로직을 추가해야 합니다.
    console.log("Payment processed!");
  };

  return (
    <div className="payment-container">
      <div className="item-details">
        <h2>신청 강좌</h2>
        <div>
          <img src="상품-사진-경로.jpg" alt="상품" />
          <div>
            <h3>강좌 이름</h3>
            <p>가격</p>
          </div>
        </div>
      </div>
      <form className="payment-form">
        <h2>결제 정보 입력</h2>

        <label htmlFor="name">이름:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="email">이메일:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="phoneNumber">휴대폰 번호:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

        <div className="paymethod">
          <h2>결제수단</h2>
          <label>
            <input type="radio" name="paymentMethod" value="무통장입금" checked={paymentMethod === "무통장입금"} onChange={() => setPaymentMethod("무통장입금")} />
            무통장입금
          </label>

          <label>
            <input type="radio" name="paymentMethod" value="카드결제" checked={paymentMethod === "카드결제"} onChange={() => setPaymentMethod("카드결제")} />
            카드결제
          </label>

          <label>
            <input type="radio" name="paymentMethod" value="실시간 계좌 이체" checked={paymentMethod === "실시간 계좌 이체"} onChange={() => setPaymentMethod("실시간 계좌 이체")} />
            실시간 계좌 이체
          </label>
        </div>

        <button type="button" onClick={handlePayment}>
          결제하기
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
