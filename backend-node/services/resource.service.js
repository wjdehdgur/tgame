// 📄 backend-node/services/resource.service.js

const repo = require("../repositories/resource.repo");
const { throwIf } = require("../utils/logicUtils");
const messages = require("../constants/messages");

/**
 * 자원 초기화 - 서버 시작 시 기본 자원 데이터 삽입
 */
exports.initializeResources = async () => {
  try {
    const count = await repo.count();
    if (count === 0) {
      const initialResources = [
        { type: "MR", name: "광물", amount: 500, maxStorage: 1000 },
        { type: "ER", name: "에너지", amount: 300, maxStorage: 800 },
        { type: "SR", name: "창의성", amount: 50, maxStorage: 200 },
        { type: "AR", name: "합성물", amount: 100, maxStorage: 500 },
        { type: "PR", name: "고급자원", amount: 10, maxStorage: 50 },
        { type: "FR", name: "식량", amount: 200, maxStorage: 600 }, // 체크리스트 요구사항 추가
      ];
      
      await repo.insertMany(initialResources);
      console.log("✅ 초기 자원 데이터 삽입 완료");
    } else {
      console.log("ℹ️ 자원 데이터가 이미 존재합니다.");
    }
  } catch (error) {
    console.error("❌ 자원 초기화 실패:", error);
  }
};

/**
 * 자원의 저장 용량 조정 (증가/감소 공통 처리)
 */
exports.adjustCapacity = async (name, amount) => {
  throwIf(amount === 0, "조정 값은 0일 수 없습니다.");

  const resource = await repo.findByName(name);
  throwIf(!resource, messages.RESOURCE_NOT_FOUND);

  const newCapacity = resource.maxStorage + amount;
  throwIf(newCapacity < 0, "저장량은 0보다 작을 수 없습니다.");

  resource.maxStorage = newCapacity;
  return await repo.save(resource);
};

// 모든 자원 조회
exports.getAllResources = async () => {
  return await repo.findAll();
};

// 자원 생산 (amount만큼 증가)
exports.produceResource = async (name, amount) => {
  const resource = await repo.findByName(name);
  throwIf(!resource, messages.RESOURCE_NOT_FOUND);
  resource.amount = resource.amount + amount;
  if (resource.amount > resource.maxStorage) {
    resource.amount = resource.maxStorage;
  }
  return await repo.save(resource);
};

// 자원 소비 (amount만큼 감소)
exports.useResource = async (name, amount) => {
  const resource = await repo.findByName(name);
  throwIf(!resource, messages.RESOURCE_NOT_FOUND);
  throwIf(resource.amount < amount, messages.INSUFFICIENT_RESOURCE);
  resource.amount = resource.amount - amount;
  return await repo.save(resource);
};
