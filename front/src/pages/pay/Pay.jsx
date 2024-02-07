import React, { useState } from "react";
import "../pay/paypage.scss";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { payment } from "../../_actions/lecture_action";
import Payment from "./Payment";

const PaymentPage = () => {
  const user = useSelector((state) => state.user.userData);
  const uid = useLocation().state?.lectureinfo;

  const [payinfo, setpayinfo] = useState({
    name: user?.name,
    email: user?.email,
    price: uid?.Price,
    title: uid?.title,
    img: "https ://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202302/061341-973/%EC%B4%88%EA%B2%A9%EC%B0%A8---%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C.png",
    phoneNumber: "",
    paymentMethod: "",
    paymentMethod: "",
    accountname: "",
  });

  const ariaLabel = { "aria-label": "description" };

  let body = {
    userID: user?.userId,
    lectureID: uid?.LectureID,
    paymentMethod: payinfo.paymentMethod,
    email: payinfo.email,
    name: payinfo.name,
    phoneNumber: payinfo.phoneNumber,
    accountname: payinfo.accountname,
    price: payinfo.price,
  };

  const handlePayment = () => {
    // 실제 결제 처리 로직을 추가해야 합니다.
    console.log("Payment processed!");

    // payment(body)
    //   .then((res) => {
    //     if (res.success) {
    //       alert("결제가 완료되었습니다.");
    //     } else {
    //       alert("결제에 실패하였습니다.");
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    console.log(body);
  };

  return (
    <div className="payment-container">
      <h2>결제</h2>
      <form className="payment-form">
        <div className="payinfo">
          <h2>신청자 정보</h2>

          <Input className="info" placeholder="이름" type="tel" defaultValue={payinfo.name} inputProps={ariaLabel} />

          <Input className="info" type="email" defaultValue={payinfo.email} inputProps={ariaLabel} />
        </div>
        <div className="payinfo2">
          <h2>추가 정보</h2>

          {/* <input type="tel" value={phoneNumber} onChange={(e) => setName(e.target.value)} /> */}
          <Input
            className="info"
            type="tel"
            placeholder="휴대폰 번호"
            inputProps={ariaLabel}
            onChange={(e) => {
              setpayinfo({ ...payinfo, phoneNumber: e.target.value });
            }}
          />

          <Input
            className="info"
            type="text"
            placeholder="무통장 입금 예금주"
            inputProps={ariaLabel}
            onChange={(e) => {
              setpayinfo({ ...payinfo, accountname: e.target.value });
            }}
          />
        </div>
      </form>
      <div className="item-details">
        <h2>신청 강좌</h2>
        <div>
          <img
            src="https://storage.googleapis.com/static.fastcampus.co.kr/prod/uploads/202302/061341-973/%EC%B4%88%EA%B2%A9%EC%B0%A8---%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C.png"
            alt="상품"
            style={{ width: "50px" }}
          />
          <div>
            <h3>{payinfo.title}</h3>
            <p>{payinfo.price}₩</p>
          </div>
        </div>
        <div className="paymethod">
          <h2>결제수단</h2>
          <FormControl className="payradio">
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => {
                setpayinfo({ ...payinfo, paymentMethod: e.target.value });
              }}
            >
              <FormControlLabel value={1} control={<Radio />} label="카드" />
              <FormControlLabel value={2} control={<Radio />} label="카카오페이" />
              <FormControlLabel value={3} control={<Radio />} label="가상계좌" />
            </RadioGroup>
          </FormControl>
          {/* <button type="button" onClick={handlePayment}>
            결제하기
          </button> */}
          <Payment item={payinfo} payinfo={body} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
