const mongoose = require("mongoose");

// 자원(Resource) 스키마 정의
const resourceSchema = new mongoose.Schema(
  {
    type: { type: String, required: true }, // 자원 종류 (MR, AR, PR, ER, SR 등)
    name: { type: String, required: true, unique: true }, // 자원 이름
    amount: { type: Number, required: true, default: 0, min: 0 }, // 현재 보유 수량
    maxStorage: { type: Number, required: true, default: 1000, min: 0 }, // 최대 저장량
  },
  { timestamps: true }
); // 생성, 수정 시간 자동 기록

module.exports = mongoose.model("Resource", resourceSchema);
