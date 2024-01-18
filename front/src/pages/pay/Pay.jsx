import React, { useState } from "react";
import "../pay/paypage.scss";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const PaymentPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const ariaLabel = { "aria-label": "description" };

  const handlePayment = () => {
    // 실제 결제 처리 로직을 추가해야 합니다.
    console.log("Payment processed!");
  };

  return (
    <div className="payment-container">
      <h2>결제</h2>
      <form className="payment-form">
        <div className="payinfo">
          <h2>신청자 정보</h2>

          <Input className="info" placeholder="이름" type="tel" inputProps={ariaLabel} />

          <Input className="info" type="email" defaultValue="이메일" inputProps={ariaLabel} />
        </div>
        <div className="payinfo2">
          <h2>추가 정보</h2>

          {/* <input type="tel" value={phoneNumber} onChange={(e) => setName(e.target.value)} /> */}
          <Input className="info" type="tel" defaultValue="휴대폰번호" inputProps={ariaLabel} />

          <Input className="info" type="text" defaultValue="무통장 입금 예금주" inputProps={ariaLabel} />
        </div>
      </form>
      <div className="item-details">
        <h2>신청 강좌</h2>
        <div>
          <img src="상품-사진-경로.jpg" alt="상품" />
          <div>
            <h3>강좌 이름</h3>
            <p>가격</p>
          </div>
        </div>
        <div className="paymethod">
          <h2>결제수단</h2>
          <FormControl className="payradio">
            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <FormControlLabel value="카드" control={<Radio />} label="카드" />
              <FormControlLabel value="male" control={<Radio />} label="무통장" />
              <FormControlLabel value="other" control={<Radio />} label="가상계좌" />
            </RadioGroup>
          </FormControl>
          <button type="button" onClick={handlePayment}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
