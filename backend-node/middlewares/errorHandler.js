// 📄 위치: backend-node/middlewares/errorHandler.js

// 전역 에러 처리 미들웨어
module.exports = (err, req, res, next) => {
  console.error(err.stack); // 터미널에 에러 로그 출력

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "서버 오류가 발생했습니다.",
  });
};
