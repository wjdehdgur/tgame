// 📄 backend-node/services/resource.service.js

const repo = require("../repositories/resource.repo");
const { throwIf } = require("../utils/logicUtils");
const messages = require("../constants/messages");

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
