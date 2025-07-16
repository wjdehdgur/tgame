const express = require("express");
const app = express();
const connectDB = require("./config/db");
const resourceRouter = require("./routes/resource"); // 경로 수정: resource -> routes/resource

// MongoDB 연결
connectDB();

// JSON 바디 파싱 미들웨어
app.use(express.json());

// API 라우터 연결
app.use("/api/resources", resourceRouter);

// 테스트 라우트 (서버 작동 확인용)
app.get("/test", (req, res) => {
  res.send("Test route is working");
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
