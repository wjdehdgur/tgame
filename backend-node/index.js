// 📄 backend-node/index.js

const express = require("express");
const app = express();
const connectDB = require("./config/db"); // ✅ MongoDB 연결 함수 불러오기

const resourceRoutes = require("./routes/resource.route");

// ✅ MongoDB 연결 실행 (서버 실행 전에 DB 연결 시도)
connectDB();

app.use(express.json());
app.use("/api/resources", resourceRoutes);

// 에러 핸들러
app.use(require("./middlewares/errorHandler.js"));

app.listen(3000, () => console.log("✅ Server running on port 3000"));
