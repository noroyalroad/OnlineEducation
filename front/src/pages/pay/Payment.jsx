import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { payment, paymentbefore, paymentcomplete } from "../../_actions/lecture_action";
import axios from "axios";
const paykey = process.env.REACT_APP_PAYKEY;

const Payment = ({ item, payinfo }) => {
  console.log(item);

  console.log(payinfo);
  const uid = useLocation().state?.lectureinfo;

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  let Pg = "";

  item.paymentMethod === "1" ? (Pg = "html5_inicis") : (Pg = "kakaopay");

  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();

  // 월을 가져옵니다. (월은 0부터 시작하므로 1을 더합니다.)
  const currentMonth = currentDate.getMonth() + 1;

  // 일을 가져옵니다.
  const currentDay = currentDate.getDate();
  const formattedDate = `${currentYear}${currentMonth < 10 ? "0" : ""}${currentMonth}${currentDay < 10 ? "0" : ""}${currentDay}${currentDate.getTime()}`;
  console.log(formattedDate);
  const onClickPayment = () => {
    const IMP = window.IMP; // 생략가능
    IMP.init(paykey); // 예: imp00000000
    const data = {
      pg: Pg,
      pay_method: "card",
      merchant_uid: `ORD-${formattedDate}-${currentDate.getTime()}`,
      name: item.title,
      amount: 100,
      buyer_email: item.email,
      buyer_name: item.name,
      buyer_tel: item.phoneNumber,
      LectureId: uid.LectureID,
    };

    const bfpay = payinfo;
    bfpay.merchant_uid = data.merchant_uid;

    paymentbefore(bfpay)
      .then((res) => {
        if (res.success) {
          IMP.request_pay(data, callback);
        } else {
          alert("이미 결제한 강의입니다.");
          return;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const callback = (response) => {
    console.log(response);
    const { success, error_msg } = response;
    if (success) {
      let body = {
        imp_uid: response.imp_uid,
        merchant_uid: response.merchant_uid,
        LectureID: payinfo.lectureID,
        payinfo: payinfo,
      };

      paymentcomplete(body).then((res) => {
        console.log(res);
      });
      alert("결제 성공");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

  return (
    <div>
      <button onClick={onClickPayment}>결제하기</button>
    </div>
  );
};

export default Payment;
