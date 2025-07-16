const mongoose = require("mongoose");
const Resource = require("./models/resource"); // 경로 맞는지 확인

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/tgame-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB 연결 실패:", err);
  }
}

async function createResource() {
  await connectDB();

  const newResource = new Resource({
    type: "MR",
    name: "광물",
    amount: 500,
    maxStorage: 1000,
  });

  await newResource.save();
  console.log("자원 생성 완료:", newResource);

  mongoose.connection.close(); // DB 연결 종료
}

createResource();
