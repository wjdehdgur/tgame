// 📄 위치: backend-node/models/resource.js

const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // 자원 이름 (예: MR01, 식량)
  type: { type: String, required: true }, // 자원 종류 (MR, AR, PR, ER, SR)
  amount: { type: Number, default: 0 }, // 현재 자원 수량
  maxStorage: { type: Number, default: 100 }, // 최대 저장량
});

resourceSchema.methods.increase = function (amount) {
  this.amount = Math.min(this.amount + amount, this.maxStorage);
};

resourceSchema.methods.decrease = function (amount) {
  this.amount = Math.max(this.amount - amount, 0);
};

module.exports = mongoose.model("Resource", resourceSchema);
