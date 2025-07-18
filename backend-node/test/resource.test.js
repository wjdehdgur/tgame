const mongoose = require("mongoose");
const Resource = require("../models/resource.model");

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/tgame-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");

    // 기존 데이터 삭제 (선택 사항)
    await Resource.deleteMany({});

    // 샘플 자원 데이터 배열
    const sampleResources = [
      { type: "MR", name: "광물", amount: 500, maxStorage: 1000 },
      { type: "ER", name: "에너지", amount: 300, maxStorage: 800 },
      { type: "SR", name: "창의성", amount: 50, maxStorage: 200 },
      { type: "AR", name: "합성물", amount: 100, maxStorage: 500 },
      { type: "PR", name: "고급자원", amount: 10, maxStorage: 50 },
    ];

    // 데이터 삽입
    await Resource.insertMany(sampleResources);
    console.log("샘플 자원 데이터 삽입 완료");

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

seed();
