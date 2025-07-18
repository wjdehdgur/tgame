// 📁 backend-node/config/db.js

const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/tgame-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB 연결 성공");
  } catch (err) {
    console.error("❌ MongoDB 연결 실패:", err);
  }
}

module.exports = connectDB;
