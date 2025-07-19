// 📄 backend-node/index.js

const express = require("express");
const app = express();
const connectDB = require("./config/db"); // ✅ MongoDB 연결 함수 불러오기
const resourceService = require("./services/resource.service");

const resourceRoutes = require("./routes/resource.route");

// ✅ MongoDB 연결 실행 (서버 실행 전에 DB 연결 시도)
connectDB();

app.use(express.json());
app.use("/api/resources", resourceRoutes);

// 정적 파일 제공 (CSS, JS 등)
app.use(express.static("public"));

// 기본 페이지 라우트
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// 에러 핸들러
app.use(require("./middlewares/errorHandler.js"));

// 서버 시작 후 자원 초기화
const startServer = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // DB 연결 대기
    await resourceService.initializeResources();
    
    app.listen(3000, () => {
      console.log("✅ Server running on port 3000");
      console.log("🌐 웹 브라우저에서 http://localhost:3000 접속하세요");
    });
  } catch (error) {
    console.error("❌ 서버 시작 실패:", error);
  }
};

startServer();
