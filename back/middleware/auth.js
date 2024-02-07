const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt-key.json");

exports.auth = (req, res, next) => {
  const token = req.cookies.x_auth;
  console.log("요청!!!", token);
  // 인증 완료

  try {
    // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환

    if (!token)
      return res.json({
        message: "노인증.",
        isAuth: false,
      });

    req.decoded = jwt.verify(token, secretObj["secret-key"]);
    return next();
  } catch (error) {
    // 인증 실패
    // 유효시간이 초과된 경우
    if (error.name === "TokenExpiredError") {
      return res.json({
        code: 419,
        message: "토큰이 만료되었습니다.",
        isAuth: false,
      });
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        code: 401,
        message: "유효하지 않은 토큰입니다.",
        isAuth: false,
      });
    }
  }
};
